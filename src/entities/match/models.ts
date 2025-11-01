export type Match = {
  id: number
  first: string
  second: string
  score: [number, number]
  sets: Array<SetInfo>
}

export type SetInfo = {
  id: number
  winner: 'first' | 'second' | 'none'
  firstServer: 'first' | 'second'
  server: 'first' | 'second' | 'none'
  score: { first: number; second: number }
  setStat: Array<SetStat>
}

export type SetStat = { ballWinner: 'first' | 'second' }
