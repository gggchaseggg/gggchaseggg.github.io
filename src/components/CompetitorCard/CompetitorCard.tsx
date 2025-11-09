import type { FC, MouseEvent as ReactMouseEvent } from 'react'

import { useMatchStore } from '@tt/entities'
import { useLongPress } from '@tt/shared'

import styles from './CompetitorCard.module.scss'
import type { CompetitorCardProps } from './CompetitorCard.types'
import { getStyles } from './CompetitorCard.utils'

export const CompetitorCard: FC<CompetitorCardProps> = ({
  name,
  competitor,
  set,
  competitorMatchScore,
}) => {
  const { increaseCompetitorScore, decreaseCompetitorScore, endSet } =
    useMatchStore((s) => s.actions)

  const isSetCompleted = set.status === 'completed'
  const stls = getStyles(set, competitor)

  const longPressEvents = useLongPress({
    onLongPress: () => decreaseCompetitorScore(competitor),
    onClick: () =>
      isSetCompleted ? endSet() : increaseCompetitorScore(competitor),
  })

  return (
    <div>
      <div
        className={[styles.competitorCard, ...stls].join(' ')}
        {...longPressEvents}
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
