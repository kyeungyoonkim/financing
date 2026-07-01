import type { CardPerk } from '../types/perks'

export const DEFAULT_CARD_PERKS: CardPerk[] = [
  {
    id: 'marriott-airline-credit',
    cardId: 'marriott-boundless',
    title: '항공권 $50 캐시백',
    description: '6개월마다 항공사 직접 결제 $250+ 시 $50 statement credit (오퍼 ~2027/06/30)',
    spendCategory: 'airlines',
    periods: [
      {
        id: '2026-h1',
        label: '2026 상반기',
        periodEnd: '2026-06-30',
        minSpend: 250,
        currentSpend: 250,
        rewardAmount: 50,
        status: 'completed',
        creditedDate: '2026-06',
      },
      {
        id: '2026-h2',
        label: '2026 하반기',
        periodEnd: '2026-12-31',
        minSpend: 250,
        currentSpend: 0,
        rewardAmount: 50,
        status: 'in_progress',
      },
    ],
  },
]

export function migrateCardPerks(perks: CardPerk[]): CardPerk[] {
  if (perks.some((p) => p.id === 'marriott-airline-credit')) return perks
  return [...perks, ...DEFAULT_CARD_PERKS]
}
