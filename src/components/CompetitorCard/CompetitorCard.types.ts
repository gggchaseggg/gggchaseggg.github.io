import type { SetInfo } from '@tt/entities'
import type { Competitor } from '@tt/shared'

export type CompetitorCardProps = {
  name: string
  competitor: Competitor
  set: SetInfo
}
