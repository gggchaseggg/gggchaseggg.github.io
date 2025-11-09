import { create } from 'zustand'

import type { Competitor } from '@tt/shared'

import { mockMatch } from './mock'
import type { Match } from './models'
import { updateSet } from './utils'

type MatchStore = {
  match: Match
  activeSetIndex: number

  actions: {
    setMatch: (match: Match) => void
    increaseCompetitorScore: (setId: number, competitor: Competitor) => void
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
    increaseCompetitorScore: (setId, competitor) => {
      const match = get().match

      const newSets = match.sets.map((item) => {
        if (item.id !== setId) return item

        return updateSet(item, competitor)
      })

      set({
        match: {
          ...match,
          sets: newSets,
        },
      })
    },
  },
}))
