import type { CreditCard } from '../types'
import { recommendCard } from '../utils/recommendation'
import { formatCurrency } from '../utils/format'
import { GUIDE_CATEGORIES, CATEGORY_LABELS } from '../data/categories'

interface Props {
  cards: CreditCard[]
  amount?: number
}

export function CategoryGuide({ cards, amount = 100 }: Props) {
  return (
    <div className="card-surface overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800">카테고리별 추천 카드</h3>
        <p className="text-xs text-slate-500 mt-0.5">${amount} 결제 기준 · 적립 가치 순</p>
      </div>
      <div className="divide-y divide-slate-100">
        {GUIDE_CATEGORIES.map((cat) => {
          const best = recommendCard(cards, cat, amount)[0]
          if (!best) return null
          return (
            <div key={cat} className="px-4 py-2.5 flex items-center gap-3 text-sm">
              <span className="w-28 shrink-0 text-slate-500 text-xs">{CATEGORY_LABELS[cat]}</span>
              <div
                className="w-1 h-6 rounded-full shrink-0"
                style={{ backgroundColor: best.card.color }}
              />
              <span className="flex-1 font-medium text-slate-800 truncate">{best.card.name}</span>
              <span className="text-xs text-slate-500 shrink-0">
                {best.effectiveRate}x · {formatCurrency(best.estimatedValue)}
              </span>
            </div>
          )
        })}
      </div>
      <p className="px-4 py-2 text-xs text-slate-400 border-t border-slate-100">
        Amazon·Chase Travel·Apple 등은 해당 카테고리 선택 시에만 보너스 적용
      </p>
    </div>
  )
}

export function CategoryGuideCompact({ cards, amount = 100 }: Props) {
  const picks = GUIDE_CATEGORIES.slice(0, 6).map((cat) => ({
    cat,
    best: recommendCard(cards, cat, amount)[0],
  }))

  return (
    <div className="grid grid-cols-2 gap-2">
      {picks.map(({ cat, best }) =>
        best ? (
          <div key={cat} className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
            <p className="text-xs text-slate-500">{CATEGORY_LABELS[cat]}</p>
            <p className="text-sm font-medium text-slate-800 truncate mt-0.5">{best.card.name}</p>
            <p className="text-xs text-indigo-600 mt-0.5">
              {best.effectiveRate}x · {formatCurrency(best.estimatedValue)}
            </p>
          </div>
        ) : null,
      )}
    </div>
  )
}
