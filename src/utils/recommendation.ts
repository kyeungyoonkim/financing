import type { CreditCard, Recommendation, SpendingCategory } from '../types'
import { formatCurrency } from './format'

function getEarningRate(card: CreditCard, category: SpendingCategory): number {
  const match = card.earningRates.find((r) => r.category === category)
  return match?.rate ?? card.defaultRate
}

function getSignUpUrgency(card: CreditCard, amount: number): { boost: number; note: string } {
  const bonus = card.signUpBonus
  if (!bonus || bonus.excludeFromRecommend || card.id === 'aa-citi-platinum') {
    return { boost: 0, note: '' }
  }

  const remaining = bonus.minSpend - bonus.currentSpend
  if (remaining <= 0) return { boost: 0, note: '' }

  const daysLeft = Math.max(
    1,
    Math.ceil((new Date(bonus.deadline).getTime() - Date.now()) / 86_400_000),
  )
  const dailyNeeded = remaining / daysLeft
  const urgency = Math.min(remaining / bonus.minSpend, 1) * (30 / daysLeft)

  const bonusValue = (bonus.bonusPoints * card.pointValue) / 100
  const marginalBonusValue =
    amount <= remaining ? (amount / remaining) * bonusValue : bonusValue

  let note = ''
  if (daysLeft <= 14) {
    note = `마감 ${daysLeft}일 전 — 일 $${dailyNeeded.toFixed(0)} 필요`
  } else if (remaining <= amount) {
    note = `이 결제로 미니멈 스펜드 달성 가능`
  } else {
    note = `미니멈 스펜드 $${remaining.toLocaleString()} 남음 (${daysLeft}일)`
  }

  return { boost: marginalBonusValue * urgency * 0.5, note }
}

function formatRewardUnit(card: CreditCard): string {
  if (card.currency === 'Cash Back' || card.currency === 'Daily Cash') return 'cash back'
  return card.currency
}

export function recommendCard(
  cards: CreditCard[],
  category: SpendingCategory,
  amount: number,
): Recommendation[] {
  return cards
    .map((card) => {
      const rate = getEarningRate(card, category)
      const pointsEarned = amount * rate
      const baseValue = (pointsEarned * card.pointValue) / 100
      const effectiveReturnPct = rate * card.pointValue
      const { boost, note } = getSignUpUrgency(card, amount)
      const totalScore = baseValue + boost
      const unit = formatRewardUnit(card)

      let reason = `${rate}x → ${pointsEarned.toLocaleString()} ${unit} (약 ${formatCurrency(baseValue)})`
      if (note) reason += ` · ${note}`

      return {
        card,
        pointsEarned,
        estimatedValue: baseValue,
        effectiveRate: rate,
        effectiveReturnPct,
        signUpBoost: boost,
        totalScore,
        reason,
      }
    })
    .sort((a, b) => b.totalScore - a.totalScore)
}

export function getBestTransferPartner(card: CreditCard) {
  if (!card.transferPartners.length) return null
  return [...card.transferPartners].sort((a, b) => b.cppValue - a.cppValue)[0]
}

export function getRewardUnit(card: CreditCard): string {
  return formatRewardUnit(card)
}
