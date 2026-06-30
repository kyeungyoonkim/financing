import type { CardBenefit } from '../types/benefits'

/** 2026년 상반기 기준 카드 혜택 전체 목록 */
export const DEFAULT_CARD_BENEFITS: CardBenefit[] = [
  // ── AA Citi Platinum Select ──
  {
    id: 'aa-first-bag',
    cardId: 'aa-citi-platinum',
    kind: 'bag',
    name: '첫 수하물 무료',
    description: '국내선 AA 항공 본인+동반 4명',
    frequency: 'ongoing',
  },
  {
    id: 'aa-priority-boarding',
    cardId: 'aa-citi-platinum',
    kind: 'bag',
    name: 'Priority Boarding',
    description: 'AA 항공 우선 탑승 (Group 5)',
    frequency: 'ongoing',
  },
  {
    id: 'aa-inflight-discount',
    cardId: 'aa-citi-platinum',
    kind: 'other',
    name: '기내 할인 25%',
    description: 'AA 항공 기내 식음료',
    frequency: 'ongoing',
  },
  {
    id: 'aa-125-discount',
    cardId: 'aa-citi-platinum',
    kind: 'milestone',
    name: 'AA $125 할인',
    description: '연 $20,000 이상 사용 + 카드 갱신 시',
    valueUsd: 125,
    frequency: 'annual',
    requirement: '연 $20,000 spend',
  },
  {
    id: 'aa-first-year-fee',
    cardId: 'aa-citi-platinum',
    kind: 'fee_waiver',
    name: '첫해 연회비 면제',
    description: '첫 12개월 $99 면제',
    valueUsd: 99,
    frequency: 'one_time',
  },
  {
    id: 'aa-no-ftf',
    cardId: 'aa-citi-platinum',
    kind: 'fee_waiver',
    name: '해외 수수료 없음',
    description: 'No foreign transaction fee',
    frequency: 'ongoing',
  },

  // ── Amex Hilton Honors ──
  {
    id: 'hilton-silver',
    cardId: 'amex-hilton-honors',
    kind: 'status',
    name: 'Hilton Silver Elite',
    description: '카드 보유만으로 실버 등급',
    frequency: 'ongoing',
  },
  {
    id: 'hilton-no-fee',
    cardId: 'amex-hilton-honors',
    kind: 'fee_waiver',
    name: '무연회비',
    description: '연회비 없음',
    frequency: 'ongoing',
  },

  // ── Apple Card ──
  {
    id: 'apple-no-fee',
    cardId: 'apple-card',
    kind: 'fee_waiver',
    name: '연회비·해외수수료·연체수수료 없음',
    description: 'Annual fee, FTF, late fee 모두 없음',
    frequency: 'ongoing',
  },
  {
    id: 'apple-installments',
    cardId: 'apple-card',
    kind: 'other',
    name: 'Apple 할부 0%',
    description: 'Apple 제품 무이자 할부',
    frequency: 'ongoing',
  },

  // ── IHG Premier ──
  {
    id: 'ihg-tsa-global',
    cardId: 'ihg-premier',
    kind: 'statement_credit',
    name: 'TSA PreCheck / Global Entry',
    description: 'Global Entry·TSA PreCheck·NEXUS 신청비 상환',
    valueUsd: 100,
    frequency: 'every_4_years',
    trackable: true,
    lastUsedDate: '2025-09',
    nextEligibleDate: '2029-09-01',
    requirement: '4년에 1회 · 카드로 결제',
  },
  {
    id: 'ihg-anniversary-night',
    cardId: 'ihg-premier',
    kind: 'anniversary',
    name: '연간 무료 숙박 1박',
    description: '40,000 IHG 포인트 이하 호텔 (카드 갱신 시)',
    frequency: 'annual',
    requirement: '연회비 $99 납부 후',
  },
  {
    id: 'ihg-platinum-status',
    cardId: 'ihg-premier',
    kind: 'status',
    name: 'IHG Platinum Elite',
    description: '카드 회원 연간 플래티넘 등급',
    frequency: 'annual',
  },
  {
    id: 'ihg-fourth-night',
    cardId: 'ihg-premier',
    kind: 'other',
    name: '4번째 밤 무료',
    description: '포인트 숙박 4박째 1박 무료 (연 1회)',
    frequency: 'annual',
  },
  {
    id: 'ihg-no-expiration',
    cardId: 'ihg-premier',
    kind: 'other',
    name: '포인트 만료 없음',
    description: 'IHG 포인트 유효기간 없음',
    frequency: 'ongoing',
  },

  // ── Marriott Boundless ──
  {
    id: 'marriott-airline-50',
    cardId: 'marriott-boundless',
    kind: 'statement_credit',
    name: '항공 $50 캐시백',
    description: '6개월마다 항공 $250+ 결제 시 $50',
    valueUsd: 50,
    frequency: 'semi_annual',
    requirement: '항공 $250+ / 6개월',
    trackable: true,
  },
  {
    id: 'marriott-anniversary-night',
    cardId: 'marriott-boundless',
    kind: 'anniversary',
    name: '연간 무료 숙박 1박',
    description: '35,000 포인트 이하 Marriott (갱신 시)',
    frequency: 'annual',
    requirement: '연회비 $95 · 발급 25/07 기준 매년 7월',
  },
  {
    id: 'marriott-elite-nights',
    cardId: 'marriott-boundless',
    kind: 'status',
    name: 'Elite Night Credits 15박',
    description: '매년 15 elite night credits 자동 적립',
    frequency: 'annual',
  },
  {
    id: 'marriott-silver',
    cardId: 'marriott-boundless',
    kind: 'status',
    name: 'Marriott Silver Elite',
    description: '카드 보유만으로 실버 등급',
    frequency: 'ongoing',
  },

  // ── Chase Sapphire Preferred ──
  {
    id: 'csp-hotel-credit',
    cardId: 'chase-sapphire-preferred',
    kind: 'travel_credit',
    name: 'Chase Travel 호텔 $50',
    description: 'Chase Travel 포털 호텔 예약 시',
    valueUsd: 50,
    frequency: 'annual',
    trackable: true,
    nextEligibleDate: '2026-04-01',
    requirement: 'Chase Travel 호텔만 · 발급 25/04 기준 매년 4월',
  },
  {
    id: 'csp-anniversary-boost',
    cardId: 'chase-sapphire-preferred',
    kind: 'anniversary',
    name: 'Chase Travel 10% 포인트 부스트',
    description: '갱신 후 Chase Travel 적립 +10%',
    frequency: 'annual',
  },
  {
    id: 'csp-trip-cancel',
    cardId: 'chase-sapphire-preferred',
    kind: 'insurance',
    name: 'Trip Cancellation/Interruption',
    description: '최대 $10,000/여행, $20,000/12개월',
    frequency: 'ongoing',
  },
  {
    id: 'csp-baggage-delay',
    cardId: 'chase-sapphire-preferred',
    kind: 'insurance',
    name: 'Baggage Delay Insurance',
    description: '6시간+ 지연 시 $100/일, 최대 5일',
    frequency: 'ongoing',
  },
  {
    id: 'csp-auto-rental',
    cardId: 'chase-sapphire-preferred',
    kind: 'insurance',
    name: 'Auto Rental CDW',
    description: '렌터카 충돌손해 면책 (primary)',
    frequency: 'ongoing',
  },
  {
    id: 'csp-no-ftf',
    cardId: 'chase-sapphire-preferred',
    kind: 'fee_waiver',
    name: '해외 수수료 없음',
    description: 'No foreign transaction fee',
    frequency: 'ongoing',
  },
  {
    id: 'csp-ur-boost',
    cardId: 'chase-sapphire-preferred',
    kind: 'earning',
    name: 'Chase Travel 1.25x 가치',
    description: 'UR 포인트 Chase Travel에서 25% 추가 가치',
    frequency: 'ongoing',
  },
  {
    id: 'csp-dashpass',
    cardId: 'chase-sapphire-preferred',
    kind: 'other',
    name: 'DashPass',
    description: 'DoorDash DashPass (프로모션 기간 확인 필요)',
    frequency: 'annual',
  },

  // ── Amex BCE ──
  {
    id: 'bce-category-cap',
    cardId: 'amex-blue-cash-everyday',
    kind: 'earning',
    name: '3% 카테고리 (연 $6,000 한도)',
    description: '온라인·마트·주유 각각 연 $6,000까지 3%',
    frequency: 'annual',
  },
  {
    id: 'bce-amex-offers',
    cardId: 'amex-blue-cash-everyday',
    kind: 'other',
    name: 'Amex Offers',
    description: '타겟 statement credit 오퍼',
    frequency: 'ongoing',
  },
  {
    id: 'bce-return-protection',
    cardId: 'amex-blue-cash-everyday',
    kind: 'insurance',
    name: 'Return Protection',
    description: '판매처 반품 거절 시 Amex 보상 (한도 있음)',
    frequency: 'ongoing',
  },

  // ── Amazon Store Card ──
  {
    id: 'amazon-5pct',
    cardId: 'amazon-store',
    kind: 'earning',
    name: 'Amazon 5% (Prime)',
    description: 'Amazon.com·Whole Foods · Prime 회원',
    frequency: 'ongoing',
    requirement: 'Prime membership',
  },
  {
    id: 'amazon-financing',
    cardId: 'amazon-store',
    kind: 'other',
    name: 'Equal Pay / Special Financing',
    description: 'Amazon 특정 구매 무이자 할부',
    frequency: 'ongoing',
  },

  // ── Chase Freedom Unlimited ──
  {
    id: 'cfu-csp-combo',
    cardId: 'chase-freedom-unlimited',
    kind: 'earning',
    name: 'CSP 연동 UR 1.25x',
    description: 'Sapphire Preferred 있으면 포인트 전환·Chase Travel 1.25x',
    frequency: 'ongoing',
    requirement: 'Chase Sapphire Preferred 보유',
  },
]

export function migrateCardBenefits(stored: CardBenefit[]): CardBenefit[] {
  const byId = new Map(stored.map((b) => [b.id, b]))
  return DEFAULT_CARD_BENEFITS.map((def) => {
    const prev = byId.get(def.id)
    if (!prev) return def
    const lastUsedDate = prev.lastUsedDate ?? def.lastUsedDate
    const nextEligibleDate = prev.lastUsedDate
      ? (prev.nextEligibleDate ?? def.nextEligibleDate)
      : lastUsedDate
        ? def.nextEligibleDate
        : (prev.nextEligibleDate ?? def.nextEligibleDate)
    return { ...def, lastUsedDate, nextEligibleDate }
  })
}

export function markBenefitUsed(benefit: CardBenefit, usedDate: string): CardBenefit {
  let next = benefit.nextEligibleDate
  if (benefit.frequency === 'every_4_years') {
    const d = new Date(usedDate + '-01')
    d.setFullYear(d.getFullYear() + 4)
    next = d.toISOString().slice(0, 10)
  } else if (benefit.frequency === 'annual') {
    const [y] = usedDate.split('-')
    next = `${Number(y) + 1}${benefit.nextEligibleDate?.slice(4) ?? '-01-01'}`
  } else if (benefit.frequency === 'semi_annual') {
    const d = new Date(usedDate + '-01')
    d.setMonth(d.getMonth() + 6)
    next = d.toISOString().slice(0, 10)
  }
  return { ...benefit, lastUsedDate: usedDate, nextEligibleDate: next }
}

export function isBenefitAvailable(b: CardBenefit): boolean {
  if (!b.trackable || !b.nextEligibleDate) return true
  return new Date(b.nextEligibleDate) <= new Date()
}
