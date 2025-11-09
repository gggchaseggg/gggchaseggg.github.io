import { type FC, Fragment } from 'react'

import { CompetitorCard, SetsScores } from '@tt/components'
import { useMatchStore } from '@tt/entities'

import styles from './MatchPage.module.scss'

export const MatchPage: FC = () => {
  const match = useMatchStore((s) => s.match)
  const activeSetIndex = useMatchStore((s) => s.activeSetIndex)

  return (
    <Fragment>
      <h1>Match Page</h1>
      <div className={styles.competitorCardsWrapper}>
        <CompetitorCard
          name={match.first}
          competitor={'first'}
          set={match.sets[activeSetIndex]}
          competitorMatchScore={match.score.first}
        />
        <SetsScores sets={match.sets} />
        <CompetitorCard
          name={match.second}
          competitor={'second'}
          set={match.sets[activeSetIndex]}
          competitorMatchScore={match.score.second}
        />
      </div>
    </Fragment>
  )
}
