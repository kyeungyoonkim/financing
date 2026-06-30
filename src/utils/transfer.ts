import type { CreditCard, TransferPartner, TransferResult } from '../types'

export function calculateTransfer(
  _card: CreditCard,
  partner: TransferPartner,
  points: number,
): TransferResult {
  const bonusMultiplier = 1 + (partner.transferBonus ?? 0) / 100
  const milesReceived = Math.floor(points * partner.ratio * bonusMultiplier)
  const estimatedValue = (milesReceived * partner.cppValue) / 100
  const effectiveCpp = points > 0 ? (estimatedValue / points) * 100 : 0

  return { partner, pointsInput: points, milesReceived, estimatedValue, effectiveCpp }
}

export function rankTransfers(
  card: CreditCard,
  points: number,
): TransferResult[] {
  return card.transferPartners
    .map((p) => calculateTransfer(card, p, points))
    .sort((a, b) => b.estimatedValue - a.estimatedValue)
}

export function compareAllTransfers(
  cards: CreditCard[],
  points: number,
): (TransferResult & { cardName: string; cardId: string })[] {
  return cards
    .flatMap((card) =>
      rankTransfers(card, points).map((r) => ({
        ...r,
        cardName: card.name,
        cardId: card.id,
      })),
    )
    .sort((a, b) => b.estimatedValue - a.estimatedValue)
}
