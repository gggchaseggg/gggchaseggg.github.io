import { clone } from 'remeda'

import { APP_CONFIG } from '@tt/config'
import type { Competitor } from '@tt/shared'

import type { SetInfo } from './models'

export const updateSet = (prevSet: SetInfo, competitor: Competitor) => {
  const set = clone(prevSet)

  // Не обновляем счет, если сет уже завершен
  if (set.winner !== 'none') return set

  const competitorScore = set.score[competitor]
  const opponent = competitor === 'first' ? 'second' : 'first'
  const opponentScore = set.score[opponent]

  // Обновление счета
  const newCompetitorScore = ++set.score[competitor]

  const scoreDifference = newCompetitorScore - opponentScore
  const isDrawEnd =
    newCompetitorScore >= APP_CONFIG.SET_MAX_SCORE &&
    scoreDifference >= APP_CONFIG.DRAW_SCORE_DIFFERENSE
  // Завершение сета, если разрыв больше 2 после ничьей
  if (isDrawEnd) {
    set.winner = competitor
    set.status = 'completed'
  }

  const isDraw =
    competitorScore >= APP_CONFIG.DRAW_MIN_SCORE &&
    opponentScore >= APP_CONFIG.DRAW_MIN_SCORE
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
