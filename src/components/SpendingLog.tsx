import { useState } from 'react'
import type { CreditCard, SpendingEntry, SpendingCategory } from '../types'
import { ALL_CATEGORIES, CATEGORY_LABELS } from '../data/categories'
import { formatCurrency } from '../utils/format'

interface Props {
  cards: CreditCard[]
  spending: SpendingEntry[]
  onAdd: (entry: SpendingEntry) => void
  onRemove: (id: string) => void
}

export function SpendingLog({ cards, spending, onAdd, onRemove }: Props) {
  const [category, setCategory] = useState<SpendingCategory>('dining')
  const [amount, setAmount] = useState('')
  const [cardId, setCardId] = useState(cards[0]?.id ?? '')
  const [memo, setMemo] = useState('')

  const handleAdd = () => {
    const amt = Number(amount)
    if (!amt || !cardId) return
    onAdd({
      id: `spend-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      category,
      amount: amt,
      cardId,
      memo,
    })
    setAmount('')
    setMemo('')
  }

  const byCategory = ALL_CATEGORIES.map((cat) => ({
    category: cat,
    total: spending.filter((s) => s.category === cat).reduce((sum, s) => sum + s.amount, 0),
  })).filter((c) => c.total > 0)

  const byCard = cards
    .map((card) => ({
      card,
      total: spending.filter((s) => s.cardId === card.id).reduce((sum, s) => sum + s.amount, 0),
    }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">카드별 지출 기록</h2>
        <p className="text-sm text-slate-500 mt-1">
          어떤 카드로 얼마 썼는지 기록합니다. AA 보너스 MSR도 자동 반영됩니다.
        </p>
      </div>

      <div className="card-surface p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-500 mb-1.5">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SpendingCategory)}
              className="input"
            >
              {ALL_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1.5">금액 ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1.5">사용 카드</label>
            <select
              value={cardId}
              onChange={(e) => setCardId(e.target.value)}
              className="input"
            >
              {cards.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1.5">메모</label>
            <input
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="input"
              placeholder="선택사항"
            />
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          기록 추가
        </button>
      </div>

      {byCard.length > 0 && (
        <div className="card-surface p-5">
          <h3 className="text-sm font-medium text-slate-500 mb-3">카드별 지출</h3>
          <div className="space-y-2">
            {byCard.map(({ card, total }) => {
              const max = byCard[0].total
              return (
                <div key={card.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700">{card.name}</span>
                    <span className="text-slate-500">{formatCurrency(total)}</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(total / max) * 100}%`,
                        backgroundColor: card.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {byCategory.length > 0 && (
        <div className="card-surface p-5">
          <h3 className="text-sm font-medium text-slate-500 mb-3">카테고리별 지출</h3>
          <div className="space-y-2">
            {byCategory
              .sort((a, b) => b.total - a.total)
              .map(({ category: cat, total }) => {
                const max = byCategory[0].total
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">{CATEGORY_LABELS[cat]}</span>
                      <span className="text-slate-500">{formatCurrency(total)}</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-300 rounded-full"
                        style={{ width: `${(total / max) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-500">전체 기록</h3>
        {spending.length === 0 ? (
          <p className="text-slate-500 text-sm">기록이 없습니다.</p>
        ) : (
          spending.map((entry) => {
            const card = cards.find((c) => c.id === entry.cardId)
            return (
              <div
                key={entry.id}
                className="card-surface p-3 flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">
                    {CATEGORY_LABELS[entry.category]} · {formatCurrency(entry.amount)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {entry.date} · {card?.name ?? '?'}
                    {entry.memo ? ` · ${entry.memo}` : ''}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(entry.id)}
                  className="text-xs text-red-500 hover:text-red-600 shrink-0"
                >
                  삭제
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
