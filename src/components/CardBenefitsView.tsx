import { useMemo, useState } from 'react'
import type { CreditCard } from '../types'
import type { CardBenefit, BenefitKind } from '../types/benefits'
import {
  BENEFIT_KIND_LABELS,
  FREQUENCY_LABELS,
} from '../types/benefits'
import { isBenefitAvailable, markBenefitUsed } from '../data/defaultBenefits'
import { formatCurrency } from '../utils/format'

interface Props {
  cards: CreditCard[]
  benefits: CardBenefit[]
  onUpdate: (benefits: CardBenefit[]) => void
}

export function CardBenefitsView({ cards, benefits, onUpdate }: Props) {
  const [filter, setFilter] = useState<'all' | 'trackable' | BenefitKind>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const grouped = useMemo(() => {
    return cards
      .map((card) => ({
        card,
        items: benefits.filter((b) => b.cardId === card.id),
      }))
      .filter((g) => g.items.length > 0)
  }, [cards, benefits])

  const filtered = (items: CardBenefit[]) =>
    items.filter((b) => {
      if (filter === 'all') return true
      if (filter === 'trackable') return b.trackable
      return b.kind === filter
    })

  const markUsed = (id: string) => {
    const month = new Date().toISOString().slice(0, 7)
    onUpdate(
      benefits.map((b) => (b.id === id ? markBenefitUsed(b, month) : b)),
    )
  }

  const trackableCount = benefits.filter((b) => b.trackable && isBenefitAvailable(b)).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">카드 혜택 전체</h2>
        <p className="text-sm text-slate-500 mt-1">
          TSA/Global Entry(4년), 연간 크레딧, 보험, 등급 등 보유 카드 혜택을 한곳에서 확인합니다.
          {trackableCount > 0 && (
            <span className="text-indigo-600"> · 사용 가능 크레딧 {trackableCount}개</span>
          )}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all' as const, label: '전체' },
          { id: 'trackable' as const, label: '크레딧 추적' },
          { id: 'statement_credit' as const, label: 'Statement Credit' },
          { id: 'travel_credit' as const, label: '여행' },
          { id: 'insurance' as const, label: '보험' },
          { id: 'status' as const, label: '등급' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filter === f.id
                ? 'bg-indigo-100 border-indigo-200 text-indigo-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {grouped.map(({ card, items }) => {
          const shown = filtered(items)
          if (shown.length === 0) return null
          const open = expanded === card.id
          return (
            <div key={card.id} className="card-surface overflow-hidden">
              <button
                onClick={() => setExpanded(open ? null : card.id)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 text-left"
              >
                <div className="w-1.5 h-8 rounded-full shrink-0" style={{ backgroundColor: card.color }} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800">{card.name}</p>
                  <p className="text-xs text-slate-500">{shown.length}개 혜택</p>
                </div>
                <span className="text-slate-400 text-sm">{open ? '▲' : '▼'}</span>
              </button>
              {open && (
                <div className="border-t border-slate-100 divide-y divide-slate-50">
                  {shown.map((b) => (
                    <BenefitRow key={b.id} benefit={b} onMarkUsed={() => markUsed(b.id)} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-slate-400">
        CSP에는 TSA/Global Entry 크레딧이 없습니다 (Reserve 전용). IHG Premier에 $100/4년 혜택이 있습니다.
      </p>
    </div>
  )
}

function BenefitRow({
  benefit: b,
  onMarkUsed,
}: {
  benefit: CardBenefit
  onMarkUsed: () => void
}) {
  const available = isBenefitAvailable(b)
  return (
    <div className="px-4 py-3 flex flex-wrap items-start gap-3">
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-slate-800">{b.name}</p>
          {b.valueUsd != null && b.valueUsd > 0 && (
            <span className="text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
              {formatCurrency(b.valueUsd)}
            </span>
          )}
          <span className="text-xs text-slate-400">{FREQUENCY_LABELS[b.frequency]}</span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">{b.description}</p>
        <div className="flex flex-wrap gap-x-3 text-xs text-slate-400 mt-1">
          <span>{BENEFIT_KIND_LABELS[b.kind]}</span>
          {b.requirement && <span>{b.requirement}</span>}
          {b.lastUsedDate && <span>마지막 사용 {b.lastUsedDate}</span>}
          {b.nextEligibleDate && b.trackable && (
            <span className={available ? 'text-indigo-600' : 'text-amber-600'}>
              {available ? '사용 가능' : `다음 ${b.nextEligibleDate}`}
            </span>
          )}
        </div>
      </div>
      {b.trackable && available && (
        <button
          onClick={onMarkUsed}
          className="text-xs px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 shrink-0"
        >
          사용 완료
        </button>
      )}
    </div>
  )
}
