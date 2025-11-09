import { clone } from 'remeda'

import { APP_CONFIG } from '@tt/config'
import type { Competitor } from '@tt/shared'

import type { Match, SetInfo } from './models'

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
    set.server = 'none'
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

export const swapPlayers = (match: Match) => {
  const swappedMatch = {
    ...match,
    // Меняем имена игроков местами
    first: match.second,
    second: match.first,
    // Меняем счет местами
    score: {
      first: match.score.second,
      second: match.score.first,
    },
    // Обрабатываем все сеты
    sets: match.sets.map((set) => ({
      ...set,
      // Меняем победителя сета
      winner:
        set.winner === 'first'
          ? 'second'
          : set.winner === 'second'
            ? 'first'
            : 'none',
      // Меняем счет в сете
      score: {
        first: set.score.second,
        second: set.score.first,
      },
    })),
  }

  return swappedMatch as Match
}
