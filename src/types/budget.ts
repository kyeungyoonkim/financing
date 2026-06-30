export type BudgetCategory =
  | 'rent'
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'household'
  | 'clothing'
  | 'edu'
  | 'travel'
  | 'gifts'
  | 'health'
  | 'utilities'
  | 'phone'
  | 'beauty'
  | 'other'
  | 'card_fee'

export const BUDGET_CATEGORY_LABELS: Record<BudgetCategory, string> = {
  rent: 'Rent / 월세',
  food: 'Food / 식비',
  transport: 'Transport / 교통',
  entertainment: 'Entertain / 여가',
  household: 'Household / 생활용품',
  clothing: 'Clothing / 의류',
  edu: 'Edu / 교육',
  travel: 'Travel / 여행',
  gifts: 'Gifts / 선물',
  health: 'Health / 건강',
  utilities: 'Utilities / 공과금',
  phone: 'Phone / 통신',
  beauty: 'Beauty / 뷰티',
  other: 'Other / 기타',
  card_fee: 'Card fee / 연회비',
}

export const ALL_BUDGET_CATEGORIES = Object.keys(
  BUDGET_CATEGORY_LABELS,
) as BudgetCategory[]

export interface MonthlyBudget {
  month: string
  amounts: Partial<Record<BudgetCategory, number>>
  income?: number
  remark?: string
}

export type BonusType = 'credit_card' | 'checking' | 'tax_refund' | 'other'
export type BonusStatus = 'completed' | 'in_progress' | 'planned'

export interface BonusRecord {
  id: string
  type: BonusType
  name: string
  amount: number
  appliedDate?: string
  creditedDate?: string
  requirement?: string
  status: BonusStatus
  notes?: string
}

export const BONUS_TYPE_LABELS: Record<BonusType, string> = {
  credit_card: '신용카드',
  checking: '체킹 계좌',
  tax_refund: '세금 환급',
  other: '기타',
}
