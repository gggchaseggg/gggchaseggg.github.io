import type { FC } from 'react'

import { useMatchStore } from '@tt/entities'

import styles from './CompetitorCard.module.scss'
import type { CompetitorCardProps } from './CompetitorCard.types'
import { getStyles } from './CompetitorCard.utils'

export const CompetitorCard: FC<CompetitorCardProps> = ({
  name,
  competitor,
  set,
  competitorMatchScore,
}) => {
  const { increaseCompetitorScore } = useMatchStore((s) => s.actions)

  const stls = getStyles(set, competitor)

  return (
    <div>
      <div
        className={[styles.competitorCard, ...stls].join(' ')}
        onClick={() => increaseCompetitorScore(set.id, competitor)}
      >
        <div className={styles.competitorHeader}>
          <h3 className={styles.competitorName}>{name}</h3>
        </div>
        {set.score[competitor]}
        <div className={styles.competitorFooter}>
          <div className={styles.competitorMatchScore}>
            {competitorMatchScore}
          </div>
        </div>
      </div>
    </div>
  )
}
