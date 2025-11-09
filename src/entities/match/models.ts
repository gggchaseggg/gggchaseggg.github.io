import type { Competitor, CompetitorWithNone } from '@tt/shared'

export type Match = {
  id: number
  first: string
  second: string
  score: [number, number]
  sets: Array<SetInfo>
}

export type SetInfo = {
  id: number
  winner: CompetitorWithNone
  firstServer: Competitor
  server: CompetitorWithNone
  score: { first: number; second: number }
  setStat: Array<SetStat>
}

export type SetStat = { ballWinner: Competitor }
