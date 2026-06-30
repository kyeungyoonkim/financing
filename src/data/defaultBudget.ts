import type { MonthlyBudget, BonusRecord } from '../types/budget'

/** 2026년 상반기 실제 지출 (스프레드시트 기준) */
export const DEFAULT_MONTHLY_BUDGETS: MonthlyBudget[] = [
  {
    month: '2026-01',
    amounts: {
      rent: 457.3,
      food: 155.18,
      transport: 258.28,
      entertainment: 3.84,
      household: 0,
      clothing: 42.1,
      edu: 0,
      travel: 98.5,
      gifts: 0,
      health: 25.05,
      utilities: 68.5,
      phone: 54.12,
      beauty: 0,
      other: 0,
      card_fee: 0,
    },
  },
  {
    month: '2026-02',
    amounts: {
      rent: 497.0,
      food: 151.92,
      transport: 184.37,
      entertainment: 0,
      household: 12.96,
      clothing: 68.51,
      edu: 0,
      travel: 139.0,
      gifts: 0,
      health: 63.05,
      utilities: 85.0,
      phone: 110.76,
      beauty: 63.28,
      other: 0,
      card_fee: 0,
    },
  },
  {
    month: '2026-03',
    amounts: {
      rent: 506.65,
      food: 140.35,
      transport: 195.7,
      entertainment: 0,
      household: 1.37,
      clothing: 487.91,
      edu: 10.86,
      travel: 250.72,
      gifts: 0,
      health: 1604.82,
      utilities: 153.5,
      phone: 60.95,
      beauty: 185.29,
      other: 0,
      card_fee: 0,
    },
  },
  {
    month: '2026-04',
    amounts: {
      rent: 905.95,
      food: 347.52,
      transport: 158.83,
      entertainment: 2.99,
      household: 11.77,
      clothing: 28.72,
      edu: 643.33,
      travel: 0,
      gifts: 0,
      health: 0,
      utilities: 102.9,
      phone: 54.12,
      beauty: 15.6,
      other: 49.95,
      card_fee: 0,
    },
  },
  {
    month: '2026-05',
    amounts: {
      rent: 908.0,
      food: 184.02,
      transport: 180.37,
      entertainment: 28.89,
      household: 175.8,
      clothing: 40.69,
      edu: 500.0,
      travel: 49.83,
      gifts: 40.3,
      health: 0,
      utilities: 71.28,
      phone: 54.12,
      beauty: 15.6,
      other: 0,
      card_fee: 95.0,
    },
  },
  {
    month: '2026-06',
    amounts: {},
  },
]

export const DEFAULT_BONUS_RECORDS: BonusRecord[] = [
  {
    id: 'bonus-amex-bce',
    type: 'credit_card',
    name: 'Amex Blue Cash Everyday',
    amount: 250,
    appliedDate: '2025-03',
    creditedDate: '2025-05',
    status: 'completed',
  },
  {
    id: 'bonus-chase-sp',
    type: 'credit_card',
    name: 'Chase Sapphire Preferred',
    amount: 1000,
    appliedDate: '2025-04',
    creditedDate: '2025-06',
    status: 'completed',
  },
  {
    id: 'bonus-capital-one',
    type: 'checking',
    name: 'Capital One Checking',
    amount: 250,
    appliedDate: '2025-06-05',
    requirement: 'Direct deposit $500 × 2회 / 75일',
    status: 'completed',
    notes: '월fee $0',
  },
  {
    id: 'bonus-boa',
    type: 'checking',
    name: 'BoA Advantage Plus Banking',
    amount: 300,
    appliedDate: '2025-06-23',
    requirement: '$2,000 입금 / 90일',
    status: 'completed',
  },
  {
    id: 'bonus-truist',
    type: 'checking',
    name: 'Truist Checking',
    amount: 400,
    requirement: '$1,000 / 120일',
    status: 'completed',
  },
  {
    id: 'bonus-amex-checking',
    type: 'checking',
    name: 'Amex Checking',
    amount: 250,
    appliedDate: '2026-01-18',
    requirement: '$5,000 / 90일',
    status: 'completed',
    notes: '월fee $0',
  },
  {
    id: 'bonus-wells-fargo',
    type: 'checking',
    name: 'Wells Fargo Everyday Checking',
    amount: 400,
    appliedDate: '2026-02-23',
    requirement: '$1,000 / 90일',
    status: 'completed',
    notes: '월 $500 이상 입금 조건',
  },
  {
    id: 'bonus-huntington',
    type: 'checking',
    name: 'Huntington Bank',
    amount: 0,
    requirement: '월 $500 이상 Qualifying',
    status: 'planned',
  },
  {
    id: 'bonus-marriott-airline-h1',
    type: 'credit_card',
    name: 'Marriott Boundless 항공 캐시백',
    amount: 50,
    creditedDate: '2026-06',
    requirement: '2026 상반기 · 항공권 $250+ / 6개월',
    status: 'completed',
  },
  {
    id: 'bonus-tax-refund',
    type: 'tax_refund',
    name: 'Tax Refund',
    amount: 232,
    status: 'completed',
  },
]

export function sumMonth(b: MonthlyBudget): number {
  return Object.values(b.amounts).reduce((s, v) => s + (v ?? 0), 0)
}

export function formatMonthLabel(month: string): string {
  const [y, m] = month.split('-')
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${names[Number(m) - 1]} ${y.slice(2)}`
}

export function migrateBudgets(budgets: MonthlyBudget[]): MonthlyBudget[] {
  return budgets.map((b) =>
    b.month === '2026-06' && b.remark === '다이슨' ? { ...b, remark: undefined } : b,
  )
}

export function migrateBonuses(records: BonusRecord[]): BonusRecord[] {
  let next = records.map((r) =>
    r.id === 'bonus-amex-checking' && r.status === 'in_progress'
      ? { ...r, status: 'completed' as const }
      : r,
  )
  if (!next.some((r) => r.id === 'bonus-marriott-airline-h1')) {
    const marriott = DEFAULT_BONUS_RECORDS.find((r) => r.id === 'bonus-marriott-airline-h1')
    if (marriott) next = [...next, marriott]
  }
  return next
}
