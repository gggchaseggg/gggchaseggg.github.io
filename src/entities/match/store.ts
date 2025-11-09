import { create } from 'zustand'

import type { Competitor } from '@tt/shared'

import { mockMatch } from './mock'
import type { Match } from './models'
import { updateSet } from './utils'

type MatchStore = {
  match: Match

  actions: {
    setMatch: (match: Match) => void
    increaseCompetitorScore: (setId: number, competitor: Competitor) => void
  }
}

export const useMatchStore = create<MatchStore>((set, get) => ({
  match: mockMatch,

  actions: {
    // ----- setters -----
    setMatch: (match) => {
      set({ match })
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
