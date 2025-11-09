import { clone } from 'remeda'
import { create } from 'zustand'

import type { Competitor } from '@tt/shared'

import { mockMatch } from './mock'
import type { Match } from './models'
import { decreaseCompetitorScore, increaseCompetitorScore } from './utils'

type MatchStore = {
  match: Match
  activeSetIndex: number

  actions: {
    setMatch: (match: Match) => void
    increaseCompetitorScore: (competitor: Competitor) => void
    decreaseCompetitorScore: (competitor: Competitor) => void
  }
}

export const useMatchStore = create<MatchStore>((set, get) => ({
  match: mockMatch,
  activeSetIndex: 2,

  actions: {
    // ----- setters -----
    setMatch: (match) => {
      set({ match, activeSetIndex: 1 })
    },

    // ----- entity actions -----
    increaseCompetitorScore: (competitor) => {
      const { match, activeSetIndex } = get()
      const newMatch = clone(match)

      newMatch.sets[activeSetIndex] = increaseCompetitorScore(
        newMatch.sets[activeSetIndex],
        competitor,
      )

      set({ match: newMatch })
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
  },
}))
