import { useState } from 'react'
import type { CreditCard } from '../types'
import { recommendCard, getRewardUnit } from '../utils/recommendation'
import { formatCurrency, formatPoints } from '../utils/format'
import { ALL_CATEGORIES, CATEGORY_LABELS } from '../data/categories'
import { CategoryGuide } from './CategoryGuide'

interface Props {
  cards: CreditCard[]
}

export function RecommendationPanel({ cards }: Props) {
  const [category, setCategory] = useState(ALL_CATEGORIES[0])
  const [amount, setAmount] = useState(100)

  const recommendations = recommendCard(cards, category, amount)
  const best = recommendations[0]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">결제 추천</h2>
        <p className="text-sm text-slate-500 mt-1">
          카테고리별 적립률과 포인트 가치(마일리지, 호텔 포인트, 캐시백)를 비교해
          이번 결제에 가장 유리한 카드를 골라줍니다.
        </p>
      </div>

      <div className="card-surface p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-500 mb-1.5">결제 카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
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
            <label className="block text-sm text-slate-500 mb-1.5">결제 금액 ($)</label>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="input"
            />
          </div>
        </div>
      </div>

      {best && (
        <div
          className="rounded-xl p-5 border-2 shadow-sm"
          style={{ borderColor: best.card.color, backgroundColor: `${best.card.color}10` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                BEST CHOICE
              </span>
              <h3 className="text-xl font-bold mt-2 text-slate-800">{best.card.name}</h3>
              <p className="text-sm text-slate-500">{best.card.issuer} · {best.card.currency}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-700">
                {formatCurrency(best.totalScore)}
              </p>
              <p className="text-xs text-slate-500">예상 적립 가치</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-3">{best.reason}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm">
            <span className="text-slate-500">
              적립:{' '}
              <strong className="text-slate-800">
                {formatPoints(best.pointsEarned)} {getRewardUnit(best.card)}
              </strong>
            </span>
            <span className="text-slate-500">
              적립률: <strong className="text-slate-800">{best.effectiveRate}x</strong>
            </span>
            <span className="text-slate-500">
              실질 환급: <strong className="text-slate-800">{best.effectiveReturnPct.toFixed(1)}%</strong>
            </span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-500">전체 순위</h3>
        {recommendations.map((rec, i) => (
          <div
            key={rec.card.id}
            className="card-surface p-4 flex items-center gap-4"
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                i === 0
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {i + 1}
            </span>
            <div
              className="w-1 h-10 rounded-full shrink-0"
              style={{ backgroundColor: rec.card.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-slate-800">{rec.card.name}</p>
              <p className="text-xs text-slate-500 truncate">{rec.reason}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold text-slate-800">{formatCurrency(rec.totalScore)}</p>
              <p className="text-xs text-slate-500">
                {formatPoints(rec.pointsEarned)} {getRewardUnit(rec.card)} · {rec.effectiveReturnPct.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <CategoryGuide cards={cards} amount={amount} />
    </div>
  )
}
