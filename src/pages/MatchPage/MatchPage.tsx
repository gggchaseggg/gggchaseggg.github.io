import { type FC, Fragment } from 'react'

import { CompetitorCard, SetsScores } from '@tt/components'
import { useMatchStore } from '@tt/entities'

export const MatchPage: FC = () => {
  const match = useMatchStore((s) => s.match)

  return (
    <Fragment>
      <h1>Match Page</h1>
      <div
        style={{
          display: 'flex',
          columnGap: 16,
          justifyContent: 'center',
        }}
      >
        <CompetitorCard
          name={match.first}
          competitor={'first'}
          set={match.sets[match.sets.length - 1]}
        />
        <SetsScores sets={match.sets} score={match.score} />
        <CompetitorCard
          name={match.second}
          competitor={'second'}
          set={match.sets[match.sets.length - 1]}
        />
      </div>
    </Fragment>
  )
}
