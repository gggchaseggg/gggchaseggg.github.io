import { clone } from 'remeda'

import { APP_CONFIG } from '@tt/config'
import type { Competitor } from '@tt/shared'

import type { SetInfo } from './models'

export const increaseCompetitorScore = (
  prevSet: SetInfo,
  competitor: Competitor,
) => {
  const set = clone(prevSet)

  // Не обновляем счет, если сет уже завершен
  if (set.winner !== 'none') return set

  // Обновление счета
  const newCompetitorScore = ++set.score[competitor]

  const scoreDifference = Math.abs(set.score.first - set.score.second)
  const isSomeoneWin =
    newCompetitorScore >= APP_CONFIG.SET_MAX_SCORE &&
    scoreDifference >= APP_CONFIG.DRAW_SCORE_DIFFERENSE
  // Завершение сета, если разрыв больше 2 после ничьей
  if (isSomeoneWin) {
    set.winner = competitor
    set.status = 'completed'
  }

  const isDraw = Object.values(set.score).every(
    (score) => score >= APP_CONFIG.DRAW_MIN_SCORE,
  )
  //Смена подающего
  if (isDraw) {
    // После ничьей смена на каждой подаче
    set.server = set.server === 'first' ? 'second' : 'first'
  } else {
    const totalScore = set.score.first + set.score.second
    // До ничьей смена каждые 2 подачи
    if (totalScore % 2 === 0) {
      set.server = set.server === 'first' ? 'second' : 'first'
    }
  }

  // Обновление истории сета
  set.setStat.push({ ballWinner: competitor })

  return set
}

/**
 * Что нужно сделать?
 * - вычесть очко +
 * - пересчитать подающего +
 * - пересчитать победителя(убрать, если он был) +
 * - убрать очко из истории
 */
export const decreaseCompetitorScore = (
  prevSet: SetInfo,
  competitor: Competitor,
) => {
  const set = clone(prevSet)

  // Не вычитаем, если уже 0 очков
  if (set.score[competitor] === 0) return set

  // Обновление счета
  set.score[competitor] -= 1

  const isDraw = Object.values(set.score).every(
    (score) => score >= APP_CONFIG.DRAW_MIN_SCORE,
  )
  //Смена подающего
  if (isDraw) {
    // После ничьей смена на каждой подаче
    set.server = set.server === 'first' ? 'second' : 'first'
  } else {
    const totalScore = set.score.first + set.score.second

    // До ничьей смена каждые 2 подачи
    if (totalScore % 2 === 1) {
      set.server = set.server === 'first' ? 'second' : 'first'
    }
  }

  // Отмена победителя если он был
  if (set.status === 'completed') {
    set.winner = 'none'
    set.status = 'active'
  }

  // Удаление последнего очка из истории
  const lastBallIndex = set.setStat.findLastIndex(
    ({ ballWinner }) => ballWinner === competitor,
  )
  if (lastBallIndex !== -1) {
    set.setStat.splice(lastBallIndex, 1)
  }

  return set
}
