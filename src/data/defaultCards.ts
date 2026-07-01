import type { CreditCard } from '../types'

export const CARDS_DATA_VERSION = 5

export const DEFAULT_CARDS: CreditCard[] = [
  {
    id: 'aa-citi-platinum',
    name: 'Citi / AAdvantage Platinum Select',
    issuer: 'Citi',
    currency: 'AAdvantage Miles',
    defaultRate: 1,
    annualFee: 99,
    color: '#b91c1c',
    pointValue: 1.4,
    issueDate: '26/06',
    creditLimit: 6000,
    notes: '첫해 연회비 면제. AA·식당·주유 2x. MSR $3,666.96 남음 · 10/14 마감.',
    earningRates: [
      { category: 'airlines', rate: 2 },
      { category: 'dining', rate: 2 },
      { category: 'gas', rate: 2 },
    ],
    signUpBonus: {
      bonusPoints: 85000,
      minSpend: 4000,
      currentSpend: 333.04,
      deadline: '2026-10-14',
      excludeFromRecommend: true,
    },
    transferPartners: [],
  },
  {
    id: 'amex-hilton-honors',
    name: 'Amex Hilton Honors',
    issuer: 'Amex',
    currency: 'Hilton Honors',
    defaultRate: 3,
    annualFee: 0,
    color: '#1d4ed8',
    pointValue: 0.5,
    issueDate: '25/11',
    creditLimit: 3000,
    notes: 'Hilton 숙박 7x. 식당·마트·주유 5x.',
    earningRates: [
      { category: 'hotels', rate: 7 },
      { category: 'dining', rate: 5 },
      { category: 'groceries', rate: 5 },
      { category: 'gas', rate: 5 },
    ],
    transferPartners: [],
  },
  {
    id: 'apple-card',
    name: 'Apple Card',
    issuer: 'Other',
    currency: 'Daily Cash',
    defaultRate: 2,
    annualFee: 0,
    color: '#94a3b8',
    pointValue: 1.0,
    issueDate: '25/10',
    creditLimit: 3000,
    notes: 'Apple Pay 2%. Apple·제휴사 3%. 실물 카드 긁으면 1%.',
    earningRates: [{ category: 'apple_store', rate: 3 }],
    transferPartners: [],
  },
  {
    id: 'ihg-premier',
    name: 'IHG One Rewards Premier',
    issuer: 'Chase',
    currency: 'IHG Points',
    defaultRate: 3,
    annualFee: 99,
    color: '#15803d',
    pointValue: 0.5,
    issueDate: '25/09',
    creditLimit: 10000,
    notes: 'IHG 10x. 매년 갱신 시 Free Night 1박 (최대 40,000P). United TravelBank $50/년. GE $120/4년.',
    earningRates: [
      { category: 'hotels', rate: 10 },
      { category: 'travel', rate: 5 },
      { category: 'dining', rate: 5 },
      { category: 'gas', rate: 5 },
    ],
    transferPartners: [],
  },
  {
    id: 'marriott-boundless',
    name: 'Marriott Bonvoy Boundless',
    issuer: 'Chase',
    currency: 'Marriott Bonvoy',
    defaultRate: 2,
    annualFee: 95,
    color: '#9f1239',
    pointValue: 0.7,
    issueDate: '25/07',
    creditLimit: 9500,
    notes: 'Marriott 6x. Free Night 35KP/년 (갱신 시). Elite Night은 등급용(15박/년+$5K당 1박). 항공 $50/6개월.',
    earningRates: [{ category: 'hotels', rate: 6 }],
    transferPartners: [],
  },
  {
    id: 'chase-sapphire-preferred',
    name: 'Chase Sapphire Preferred',
    issuer: 'Chase',
    currency: 'Ultimate Rewards',
    defaultRate: 1,
    annualFee: 95,
    color: '#1e3a8a',
    pointValue: 1.25,
    issueDate: '25/04',
    creditLimit: 9900,
    notes: 'Chase Travel 5x. 식당·스트리밍·온라인마트 3x. 주유·EV 3x. 기타 여행 2x. UR 전환. 6/15/26 혜택 대폭 업데이트.',
    earningRates: [
      { category: 'chase_travel', rate: 5 },
      { category: 'dining', rate: 3 },
      { category: 'entertainment', rate: 3 },
      { category: 'groceries', rate: 3 },
      { category: 'gas', rate: 3 },
      { category: 'travel', rate: 2 },
      { category: 'airlines', rate: 2 },
      { category: 'hotels', rate: 2 },
    ],
    transferPartners: [
      { id: 'ua', name: 'United MileagePlus', ratio: 1, cppValue: 1.4 },
      { id: 'hyatt', name: 'World of Hyatt', ratio: 1, cppValue: 1.8 },
      { id: 'ba', name: 'British Airways', ratio: 1, cppValue: 1.3 },
      { id: 'sq', name: 'Singapore KrisFlyer', ratio: 1, cppValue: 1.5 },
    ],
  },
  {
    id: 'amex-blue-cash-everyday',
    name: 'Amex Blue Cash Everyday',
    issuer: 'Amex',
    currency: 'Cash Back',
    defaultRate: 1,
    annualFee: 0,
    color: '#0284c7',
    pointValue: 1.0,
    issueDate: '25/03',
    creditLimit: 8400,
    notes: '온라인·마트·주유 각 3% (연 $6,000 한도). Hulu Student $1.99 → 스트리밍 $7/월 크레딧.',
    earningRates: [
      { category: 'online_shopping', rate: 3 },
      { category: 'groceries', rate: 3 },
      { category: 'gas', rate: 3 },
    ],
    transferPartners: [],
  },
  {
    id: 'amazon-store',
    name: 'Amazon Store Card',
    issuer: 'Other',
    currency: 'Cash Back',
    defaultRate: 1,
    annualFee: 0,
    color: '#ea580c',
    pointValue: 1.0,
    issueDate: '24/06',
    creditLimit: 2500,
    notes: 'Amazon.com 5% (Prime 필요). 그 외 온라인 1%.',
    earningRates: [
      { category: 'amazon', rate: 5 },
      { category: 'dining', rate: 2 },
      { category: 'gas', rate: 2 },
      { category: 'drugstore', rate: 2 },
    ],
    transferPartners: [],
  },
  {
    id: 'chase-freedom-unlimited',
    name: 'Chase Freedom Unlimited',
    issuer: 'Chase',
    currency: 'Ultimate Rewards',
    defaultRate: 1.5,
    annualFee: 0,
    color: '#2563eb',
    pointValue: 1.25,
    issueDate: '22/03',
    creditLimit: 3000,
    notes: '기본 1.5x. 식당·약국 3x. Chase Travel 5x. DashPass 6개월. Lyft 2%.',
    earningRates: [
      { category: 'dining', rate: 3 },
      { category: 'drugstore', rate: 3 },
      { category: 'chase_travel', rate: 5 },
    ],
    transferPartners: [],
  },
]

/** 저장된 카드 — 기본값과 병합 (지출 진행률은 유지) */
export function migrateCards(cards: CreditCard[]): CreditCard[] {
  const refById = new Map(DEFAULT_CARDS.map((c) => [c.id, c]))

  return cards.map((stored) => {
    const ref = refById.get(stored.id)
    if (!ref) return stored

    const merged: CreditCard = {
      ...stored,
      earningRates: ref.earningRates,
      notes: ref.notes,
      defaultRate: ref.defaultRate,
      pointValue: ref.pointValue,
    }

    if (ref.signUpBonus) {
      merged.signUpBonus = {
        ...ref.signUpBonus,
        currentSpend: stored.signUpBonus?.currentSpend ?? ref.signUpBonus.currentSpend,
      }
    }

    return merged
  })
}
