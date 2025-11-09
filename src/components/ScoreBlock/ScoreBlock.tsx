import type { FC } from 'react'

import styles from './ScoreBlock.module.scss'
import type { ScoreBlockProps } from './ScoreBlock.types'

export const ScoreBlock: FC<ScoreBlockProps> = ({
  variant = 'horizontal',
  set: { winner, score, status },
}) => {
  const hasEnded = status === 'completed'
  const isFirstWinner = winner === 'first'
  const isSecondWinner = winner === 'second'
  const backgroundColor = isFirstWinner
    ? styles.firstWinner
    : isSecondWinner
      ? styles.secondWinner
      : styles.noneWinner
  const rootStyles = [
    styles.scoreBlock,
    variant === 'vertical' ? styles.verticalScoreBlock : '',
    backgroundColor,
  ].join(' ')
  const firstScoreStyles = [isSecondWinner ? styles.loserScore : ''].join(' ')
  const secondScoreStyles = [isFirstWinner ? styles.loserScore : ''].join(' ')
  const firstScore = hasEnded ? score.first : ''
  const secondScore = hasEnded ? score.second : ''

  return (
    <div className={rootStyles}>
      <span className={firstScoreStyles}>{firstScore}</span>
      <i id={styles.divider}></i>
      <span className={secondScoreStyles}>{secondScore}</span>
    </div>
  )
}
