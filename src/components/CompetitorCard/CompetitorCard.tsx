import type { FC } from 'react'

import { useMatchStore } from '@tt/entities'

import styles from './CompetitorCard.module.scss'
import type { CompetitorCardProps } from './CompetitorCard.types'
import { getStyles } from './CompetitorCard.utils'

export const CompetitorCard: FC<CompetitorCardProps> = ({
  name,
  competitor,
  set,
}) => {
  const increaseCompetitorScore = useMatchStore(
    (s) => s.actions.increaseCompetitorScore,
  )

  const stls = getStyles(set, competitor)

  return (
    <div>
      <h3>{name}</h3>
      <div>{set.server}</div>
      <div
        className={[styles.competitorCard, ...stls].join(' ')}
        onClick={() => increaseCompetitorScore(set.id, competitor)}
      >
        {set.score[competitor]}
      </div>
    </div>
  )
}
