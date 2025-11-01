import type { SetInfo } from '@tt/entities'

export type ScoreBlockProps = {
  variant?: 'vertical' | 'horizontal'
} & Pick<SetInfo, 'winner' | 'score'>
