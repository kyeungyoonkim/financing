import { useMemo } from 'react'
import type { BonusRecord, BonusType } from '../types/budget'
import { BONUS_TYPE_LABELS } from '../types/budget'
import { formatCurrency } from '../utils/format'

interface Props {
  records: BonusRecord[]
  onUpdate: (records: BonusRecord[]) => void
}

const STATUS_STYLE: Record<BonusRecord['status'], string> = {
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
  planned: 'bg-slate-50 text-slate-600 border-slate-200',
}

const STATUS_LABEL: Record<BonusRecord['status'], string> = {
  completed: '완료',
  in_progress: '진행 중',
  planned: '예정',
}

export function BonusHistory({ records, onUpdate }: Props) {
  const grouped = useMemo(() => {
    const order: BonusType[] = ['credit_card', 'checking', 'tax_refund', 'other']
    return order.map((type) => ({
      type,
      items: records.filter((r) => r.type === type),
      total: records
        .filter((r) => r.type === type && r.status === 'completed')
        .reduce((s, r) => s + r.amount, 0),
    }))
  }, [records])

  const grandTotal = records
    .filter((r) => r.status === 'completed')
    .reduce((s, r) => s + r.amount, 0)

  const toggleStatus = (id: string) => {
    onUpdate(
      records.map((r) => {
        if (r.id !== id) return r
        const next: BonusRecord['status'] =
          r.status === 'completed' ? 'in_progress' : r.status === 'in_progress' ? 'planned' : 'completed'
        return { ...r, status: next }
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">보너스 · 수입 기록</h2>
        <p className="text-sm text-slate-500 mt-1">
          카드·체킹 계좌 개설 보너스, 세금 환급 등 실제로 받은 금액을 기록합니다.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {grouped.map(({ type, total }) => (
          <div key={type} className="card-surface p-3">
            <p className="text-xs text-slate-500">{BONUS_TYPE_LABELS[type]}</p>
            <p className="text-lg font-bold text-slate-800 mt-1">{formatCurrency(total)}</p>
          </div>
        ))}
        <div className="card-surface p-3 bg-indigo-50 border-indigo-200">
          <p className="text-xs text-indigo-600">완료 합계</p>
          <p className="text-lg font-bold text-indigo-800 mt-1">{formatCurrency(grandTotal)}</p>
        </div>
      </div>

      {grouped.map(({ type, items }) =>
        items.length === 0 ? null : (
          <div key={type}>
            <h3 className="text-sm font-medium text-slate-500 mb-2">{BONUS_TYPE_LABELS[type]}</h3>
            <div className="space-y-2">
              {items.map((r) => (
                <div key={r.id} className="card-surface p-4 flex flex-wrap items-start gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-slate-800">{r.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded border ${STATUS_STYLE[r.status]}`}>
                        {STATUS_LABEL[r.status]}
                      </span>
                    </div>
                    {r.requirement && (
                      <p className="text-xs text-slate-500 mt-1">조건: {r.requirement}</p>
                    )}
                    <div className="flex flex-wrap gap-x-3 text-xs text-slate-400 mt-1">
                      {r.appliedDate && <span>개설 {r.appliedDate}</span>}
                      {r.creditedDate && <span>지급 {r.creditedDate}</span>}
                      {r.notes && <span>{r.notes}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-800">
                      {r.amount > 0 ? formatCurrency(r.amount) : '—'}
                    </p>
                    <button
                      onClick={() => toggleStatus(r.id)}
                      className="text-xs text-indigo-600 mt-1 hover:text-indigo-700"
                    >
                      상태 변경
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  )
}
