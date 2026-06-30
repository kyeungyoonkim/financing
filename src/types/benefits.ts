export type BenefitKind =
  | 'statement_credit'
  | 'travel_credit'
  | 'status'
  | 'insurance'
  | 'earning'
  | 'fee_waiver'
  | 'bag'
  | 'anniversary'
  | 'milestone'
  | 'other'

export type BenefitFrequency =
  | 'one_time'
  | 'annual'
  | 'semi_annual'
  | 'every_4_years'
  | 'milestone'
  | 'ongoing'

export interface CardBenefit {
  id: string
  cardId: string
  kind: BenefitKind
  name: string
  description: string
  valueUsd?: number
  frequency: BenefitFrequency
  requirement?: string
  /** 사용일 YYYY-MM */
  lastUsedDate?: string
  /** 다음 사용 가능일 */
  nextEligibleDate?: string
  trackable?: boolean
}

export const BENEFIT_KIND_LABELS: Record<BenefitKind, string> = {
  statement_credit: 'Statement Credit',
  travel_credit: '여행 크레딧',
  status: '등급 / Status',
  insurance: '보험',
  earning: '적립',
  fee_waiver: '수수료 면제',
  bag: '수하물 / 탑승',
  anniversary: '연간 혜택',
  milestone: '조건 달성',
  other: '기타',
}

export const FREQUENCY_LABELS: Record<BenefitFrequency, string> = {
  one_time: '1회',
  annual: '매년',
  semi_annual: '6개월마다',
  every_4_years: '4년마다',
  milestone: '조건 달성 시',
  ongoing: '상시',
}
