import type { Competitor, CompetitorWithNone } from '@tt/shared'

export type Status = 'active' | 'completed' | 'not_started'

export type Match = {
  id: number
  first: string
  second: string
  status: Status
  score: { first: number; second: number }
  sets: Array<SetInfo>
  firstServer: Competitor
}

export type SetInfo = {
  id: number
  winner: CompetitorWithNone
  server: CompetitorWithNone
  status: Status
  score: { first: number; second: number }
  setStat: Array<SetStat>
}

export type SetStat = { ballWinner: Competitor }
