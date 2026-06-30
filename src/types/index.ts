export type Issuer = 'Chase' | 'Amex' | 'Citi' | 'Capital One' | 'Other'

export type SpendingCategory =
  | 'dining'
  | 'groceries'
  | 'travel'
  | 'airlines'
  | 'hotels'
  | 'gas'
  | 'online_shopping'
  | 'amazon'
  | 'apple_store'
  | 'chase_travel'
  | 'entertainment'
  | 'drugstore'
  | 'other'

export interface SignUpBonus {
  bonusPoints: number
  minSpend: number
  currentSpend: number
  deadline: string
  /** true면 결제 추천 순위 계산에서 제외 (보너스 목표 탭에서만 추적) */
  excludeFromRecommend?: boolean
}

export interface EarningRate {
  category: SpendingCategory
  rate: number
}

export interface TransferPartner {
  id: string
  name: string
  ratio: number
  transferBonus?: number
  cppValue: number
}

export interface CreditCard {
  id: string
  name: string
  issuer: Issuer
  currency: string
  earningRates: EarningRate[]
  defaultRate: number
  signUpBonus?: SignUpBonus
  transferPartners: TransferPartner[]
  annualFee: number
  color: string
  pointValue: number
  issueDate?: string
  creditLimit?: number
  notes?: string
}

export interface SpendingEntry {
  id: string
  date: string
  category: SpendingCategory
  amount: number
  cardId: string
  memo: string
}

export interface Recommendation {
  card: CreditCard
  pointsEarned: number
  estimatedValue: number
  effectiveRate: number
  effectiveReturnPct: number
  signUpBoost: number
  totalScore: number
  reason: string
}

export interface TransferResult {
  partner: TransferPartner
  pointsInput: number
  milesReceived: number
  estimatedValue: number
  effectiveCpp: number
}
