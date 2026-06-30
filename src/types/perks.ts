import type { SpendingCategory } from './index'
import type { BonusStatus } from './budget'

export interface CardPerkPeriod {
  id: string
  label: string
  periodEnd: string
  minSpend: number
  currentSpend: number
  rewardAmount: number
  status: BonusStatus
  creditedDate?: string
}

export interface CardPerk {
  id: string
  cardId: string
  title: string
  description: string
  spendCategory: SpendingCategory
  periods: CardPerkPeriod[]
}
