import type { FC } from 'react'

import styles from './SetsScores.module.scss'
import type { SetsScoresProps } from './SetsScores.types'

import { ScoreBlock } from '../ScoreBlock'

export const SetsScores: FC<SetsScoresProps> = ({ sets, score }) => {
  return (
    <div className={styles.setsScores}>
      <div className={styles.matchScore}>{`${score[0]} : ${score[1]}`}</div>
      {sets.map(({ id, score: setScore, winner }) => (
        <ScoreBlock key={id} score={setScore} winner={winner} />
      ))}
    </div>
  )
}
