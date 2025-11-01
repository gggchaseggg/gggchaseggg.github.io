import type { FC } from 'react'

import { APP_CONFIG } from '@tt/config'

import styles from './ScoreBlock.module.scss'
import type { ScoreBlockProps } from './ScoreBlock.types'

export const ScoreBlock: FC<ScoreBlockProps> = ({
  variant = 'horizontal',
  winner,
  score,
}) => {
  const hasEnd = Object.values(score).some(
    (num) => num === APP_CONFIG.SET_MAX_SCORE,
  )
  const isFirstWinner = winner === 'first'
  const isSecondWinner = winner === 'second'
  const backgroundColor =
    winner === 'first'
      ? styles.firstWinner
      : winner === 'second'
        ? styles.secondWinner
        : styles.noneWinner
  const rootStyles = [
    styles.scoreBlock,
    variant === 'vertical' ? styles.verticalScoreBlock : '',
    backgroundColor,
  ].join(' ')
  const firstScoreStyles = [isSecondWinner ? styles.loserScore : ''].join(' ')
  const secondScoreStyles = [isFirstWinner ? styles.loserScore : ''].join(' ')
  const firstScore = hasEnd ? score.first : ''
  const secondScore = hasEnd ? score.second : ''

  return (
    <div className={rootStyles}>
      <span className={firstScoreStyles}>{firstScore}</span>
      <i id={styles.divider}></i>
      <span className={secondScoreStyles}>{secondScore}</span>
    </div>
  )
}
