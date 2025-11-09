import type { SetInfo } from '@tt/entities'
import type { Competitor } from '@tt/shared'

import styles from './CompetitorCard.module.scss'

export const getStyles = (set: SetInfo, competitor: Competitor) => {
  const isThisServer = set.server === competitor

  const serverDefenderStyle = isThisServer ? styles.server : styles.defender

  const cardStyle = isThisServer
    ? set.server === 'first'
      ? styles.firstServer
      : styles.secondServer
    : set.server === 'first'
      ? styles.secondDefender
      : styles.firstDefender

  return [serverDefenderStyle, cardStyle]
}
