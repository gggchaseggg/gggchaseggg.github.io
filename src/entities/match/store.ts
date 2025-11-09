import { clone } from 'remeda'
import { create } from 'zustand'

import type { Competitor } from '@tt/shared'

import { mockMatch } from './mock'
import type { Match } from './models'
import {
  decreaseCompetitorScore,
  increaseCompetitorScore,
  swapPlayers,
} from './utils'

type MatchStore = {
  match: Match
  activeSetIndex: number

  actions: {
    setMatch: (match: Match) => void
    increaseCompetitorScore: (competitor: Competitor) => void
    decreaseCompetitorScore: (competitor: Competitor) => void
    endSet: () => void
  }
}

export const useMatchStore = create<MatchStore>((set, get) => ({
  match: mockMatch,
  activeSetIndex: 2,

  actions: {
    // ----- setters -----
    setMatch: (match) => {
      set({ match, activeSetIndex: 0 })
    },

    // ----- entity actions -----
    increaseCompetitorScore: (competitor) => {
      const { match, activeSetIndex } = get()
      const newMatch = clone(match)

      newMatch.sets[activeSetIndex] = increaseCompetitorScore(
        newMatch.sets[activeSetIndex],
        competitor,
      )

      const isSetCompleted =
        newMatch.sets[activeSetIndex].status === 'completed'

      if (isSetCompleted) {
        const isAllSetsCompleted = newMatch.sets.every(
          ({ status }) => status === 'completed',
        )

        if (newMatch.status === 'active' && !isAllSetsCompleted) {
          newMatch.score[competitor] = newMatch.sets.reduce(
            (acc, { winner }) => {
              if (winner === competitor) {
                return acc + 1
              }
              return acc
            },
            0,
          )
        }

        if (isAllSetsCompleted) newMatch.status = 'completed'

        set({
          match: newMatch,
        })
      } else {
        set({ match: newMatch })
      }
    },

    decreaseCompetitorScore: (competitor) => {
      const { match, activeSetIndex } = get()
      const newMatch = clone(match)

      newMatch.sets[activeSetIndex] = decreaseCompetitorScore(
        newMatch.sets[activeSetIndex],
        competitor,
      )

      set({ match: newMatch })
    },

    endSet: () => {
      const { activeSetIndex, match } = get()
      const newMatch = clone(swapPlayers(match))
      const nextSetIndex = activeSetIndex + 1
      const isNextSetExist = newMatch.sets[nextSetIndex] !== undefined

      if (!isNextSetExist) return

      newMatch.sets[nextSetIndex].server = newMatch.firstServer

      set({ activeSetIndex: nextSetIndex, match: newMatch })
    },
  },
}))
