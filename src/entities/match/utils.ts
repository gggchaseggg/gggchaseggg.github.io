import { clone } from 'remeda'

import { APP_CONFIG } from '@tt/config'

import type { SetInfo } from './models'

export const updateSet = (prevSet: SetInfo, competitor: 'first' | 'second') => {
  const set = clone(prevSet)
  // Не обновлять счет, если есть уже 11
  if (Object.values(set.score).some((num) => num === APP_CONFIG.SET_MAX_SCORE))
    return set

  // Обновить счет компетитора
  const score = ++set.score[competitor]

  // Если стало 11, то установить победителя
  if (score === APP_CONFIG.SET_MAX_SCORE && set.winner === 'none') {
    set.winner = competitor
  }

  // Если четное количество очков, сменить подающего
  if ((set.score.first + set.score.second) % 2 === 0) {
    set.server = set.server === 'first' ? 'second' : 'first'
  }

  return set
}
