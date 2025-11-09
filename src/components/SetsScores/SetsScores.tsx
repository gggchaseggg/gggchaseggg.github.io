import type { FC } from 'react'

import styles from './SetsScores.module.scss'
import type { SetsScoresProps } from './SetsScores.types'

import { ScoreBlock } from '../ScoreBlock'

export const SetsScores: FC<SetsScoresProps> = ({ sets }) => {
  return (
    <div className={styles.setsScores}>
      {sets.map((set) => (
        <ScoreBlock key={set.id} set={set} />
      ))}
    </div>
  )
}
