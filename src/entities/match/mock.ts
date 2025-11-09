import type { Match } from './models'

export const mockMatch: Match = {
  id: 1,
  first: 'Даня',
  second: 'Миша',
  score: { first: 1, second: 1 },
  status: 'active',
  firstServer: 'first',
  sets: [
    {
      id: 1,
      score: { first: 11, second: 2 },
      winner: 'first',
      server: 'none',
      setStat: [],
      status: 'completed',
    },
    {
      id: 2,
      score: { first: 2, second: 11 },
      winner: 'second',
      server: 'none',
      setStat: [],
      status: 'completed',
    },
    {
      id: 3,
      score: { first: 0, second: 0 },
      winner: 'none',
      server: 'first',
      setStat: [],
      status: 'active',
    },
    {
      id: 4,
      score: { first: 0, second: 0 },
      winner: 'none',
      server: 'none',
      setStat: [],
      status: 'not_started',
    },
    {
      id: 5,
      score: { first: 0, second: 0 },
      winner: 'none',
      server: 'none',
      setStat: [],
      status: 'not_started',
    },
  ],
}
