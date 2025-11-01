import { create } from 'zustand'

import { APP_CONFIG } from '@tt/config'

import { mockMatch } from './mock'
import type { Match } from './models'
import { updateSet } from './utils'

type MatchStore = {
  match: Match

  actions: {
    increaseCompetitorScore: (
      setId: number,
      competitor: 'first' | 'second',
    ) => void
  }
}

export const useMatchStore = create<MatchStore>((set, get) => ({
  match: mockMatch,

  actions: {
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
