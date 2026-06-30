import { useState } from 'react'
import type { CreditCard, SpendingEntry } from './types'
import type { MonthlyBudget, BonusRecord } from './types/budget'
import { DEFAULT_CARDS, CARDS_DATA_VERSION, migrateCards } from './data/defaultCards'
import { DEFAULT_MONTHLY_BUDGETS, DEFAULT_BONUS_RECORDS, migrateBudgets, migrateBonuses } from './data/defaultBudget'
import { DEFAULT_CARD_PERKS, migrateCardPerks } from './data/defaultPerks'
import { DEFAULT_CARD_BENEFITS, migrateCardBenefits } from './data/defaultBenefits'
import type { CardPerk } from './types/perks'
import type { CardBenefit } from './types/benefits'
import { CardBenefitsView } from './components/CardBenefitsView'
import { useLocalStorage } from './hooks/useLocalStorage'
import { RecommendationPanel } from './components/RecommendationPanel'
import { BonusPanel } from './components/BonusPanel'
import { TransferCalculator } from './components/TransferCalculator'
import { CardManager } from './components/CardManager'
import { SpendingLog } from './components/SpendingLog'
import { MonthlyBudgetView } from './components/MonthlyBudgetView'
import { Dashboard } from './components/Dashboard'

type Tab = 'dashboard' | 'recommend' | 'bonus' | 'transfer' | 'cards' | 'spending' | 'budget' | 'benefits'

const TABS: { id: Tab; label: string }[] = [
  { id: 'dashboard', label: '홈' },
  { id: 'budget', label: '월별 지출' },
  { id: 'spending', label: '카드 기록' },
  { id: 'recommend', label: '결제 추천' },
  { id: 'bonus', label: '보너스' },
  { id: 'benefits', label: '카드 혜택' },
  { id: 'transfer', label: '포인트 전환' },
  { id: 'cards', label: '내 카드' },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [cards, setCards] = useLocalStorage<CreditCard[]>(
    'my-ledger-cards',
    DEFAULT_CARDS,
    CARDS_DATA_VERSION,
    migrateCards,
  )
  const [spending, setSpending] = useLocalStorage<SpendingEntry[]>('my-ledger-spending-v1', [])
  const [budgets, setBudgets] = useLocalStorage<MonthlyBudget[]>(
    'my-ledger-budget-v1',
    DEFAULT_MONTHLY_BUDGETS,
    1,
    migrateBudgets,
  )
  const [bonusRecords, setBonusRecords] = useLocalStorage<BonusRecord[]>(
    'my-ledger-bonuses-v1',
    DEFAULT_BONUS_RECORDS,
    1,
    migrateBonuses,
  )
  const [cardPerks, setCardPerks] = useLocalStorage<CardPerk[]>(
    'my-ledger-card-perks-v1',
    DEFAULT_CARD_PERKS,
    1,
    migrateCardPerks,
  )
  const [cardBenefits, setCardBenefits] = useLocalStorage<CardBenefit[]>(
    'my-ledger-card-benefits-v1',
    DEFAULT_CARD_BENEFITS,
    1,
    migrateCardBenefits,
  )

  const updateCard = (updated: CreditCard) => {
    setCards(cards.map((c) => (c.id === updated.id ? updated : c)))
  }

  const addCard = (card: CreditCard) => setCards([...cards, card])
  const removeCard = (id: string) => setCards(cards.filter((c) => c.id !== id))

  const addSpending = (entry: SpendingEntry) => {
    setSpending([entry, ...spending])
    const card = cards.find((c) => c.id === entry.cardId)
    if (card?.signUpBonus) {
      updateCard({
        ...card,
        signUpBonus: {
          ...card.signUpBonus,
          currentSpend: card.signUpBonus.currentSpend + entry.amount,
        },
      })
    }
  }

  const removeSpending = (id: string) => setSpending(spending.filter((s) => s.id !== id))

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              나만의 가계부
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              개인 재무 관리
            </p>
          </div>
          <span className="text-xs text-slate-400 hidden sm:block">
            나만 보는 기록 · 로컬 저장
          </span>
        </div>
        <nav className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                tab === t.id
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {tab === 'dashboard' && (
          <Dashboard
            cards={cards}
            spending={spending}
            budgets={budgets}
            bonusRecords={bonusRecords}
            onNavigate={setTab}
          />
        )}
        {tab === 'budget' && (
          <MonthlyBudgetView budgets={budgets} onUpdate={setBudgets} />
        )}
        {tab === 'recommend' && <RecommendationPanel cards={cards} />}
        {tab === 'bonus' && (
          <BonusPanel
            cards={cards}
            onUpdateCard={updateCard}
            bonusRecords={bonusRecords}
            onUpdateBonuses={setBonusRecords}
            cardPerks={cardPerks}
            onUpdatePerks={setCardPerks}
          />
        )}
        {tab === 'benefits' && (
          <CardBenefitsView
            cards={cards}
            benefits={cardBenefits}
            onUpdate={setCardBenefits}
          />
        )}
        {tab === 'transfer' && <TransferCalculator cards={cards} />}
        {tab === 'cards' && (
          <CardManager
            cards={cards}
            onAdd={addCard}
            onUpdate={updateCard}
            onRemove={removeCard}
          />
        )}
        {tab === 'spending' && (
          <SpendingLog
            cards={cards}
            spending={spending}
            onAdd={addSpending}
            onRemove={removeSpending}
          />
        )}
      </main>
    </div>
  )
}
