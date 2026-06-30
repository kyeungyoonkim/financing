import type { CreditCard } from '../types'
import { SignUpBonusTracker } from './SignUpBonusTracker'
import { CardPerkTracker } from './CardPerkTracker'
import { BonusHistory } from './BonusHistory'
import type { BonusRecord } from '../types/budget'
import type { CardPerk } from '../types/perks'

interface Props {
  cards: CreditCard[]
  onUpdateCard: (card: CreditCard) => void
  bonusRecords: BonusRecord[]
  onUpdateBonuses: (records: BonusRecord[]) => void
  cardPerks: CardPerk[]
  onUpdatePerks: (perks: CardPerk[]) => void
}

export function BonusPanel({
  cards,
  onUpdateCard,
  bonusRecords,
  onUpdateBonuses,
  cardPerks,
  onUpdatePerks,
}: Props) {
  return (
    <div className="space-y-10">
      <SignUpBonusTracker cards={cards} onUpdateCard={onUpdateCard} />
      <hr className="border-slate-200" />
      <CardPerkTracker cards={cards} perks={cardPerks} onUpdate={onUpdatePerks} />
      <hr className="border-slate-200" />
      <BonusHistory records={bonusRecords} onUpdate={onUpdateBonuses} />
    </div>
  )
}
