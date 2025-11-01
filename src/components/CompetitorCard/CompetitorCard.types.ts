import type { SetInfo } from '@tt/entities'

export type CompetitorCardProps = {
  name: string
  competitor: 'first' | 'second'
  set: SetInfo
}
