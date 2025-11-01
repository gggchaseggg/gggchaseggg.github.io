import type { Match } from './models'

export const mockMatch: Match = {
  id: 1,
  first: 'Даня',
  second: 'Миша',
  score: [2, 2],
  sets: [
    {
      id: 1,
      score: { first: 11, second: 2 },
      winner: 'first',
      firstServer: 'first',
      server: 'none',
      setStat: [],
    },
    {
      id: 2,
      score: { first: 2, second: 11 },
      winner: 'second',
      firstServer: 'second',
      server: 'none',
      setStat: [],
    },
    {
      id: 3,
      score: { first: 11, second: 7 },
      winner: 'first',
      firstServer: 'first',
      server: 'none',
      setStat: [],
    },
    {
      id: 4,
      score: { first: 4, second: 11 },
      winner: 'second',
      firstServer: 'second',
      server: 'none',
      setStat: [],
    },
    {
      id: 5,
      score: { first: 0, second: 0 },
      winner: 'none',
      firstServer: 'first',
      server: 'first',
      setStat: [],
    },
  ],
}
