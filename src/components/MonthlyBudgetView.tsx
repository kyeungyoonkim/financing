import { useMemo, useState } from 'react'
import type { MonthlyBudget, BudgetCategory } from '../types/budget'
import { ALL_BUDGET_CATEGORIES, BUDGET_CATEGORY_LABELS } from '../types/budget'
import { sumMonth, formatMonthLabel } from '../data/defaultBudget'
import { formatCurrency } from '../utils/format'

interface Props {
  budgets: MonthlyBudget[]
  onUpdate: (budgets: MonthlyBudget[]) => void
}

export function MonthlyBudgetView({ budgets, onUpdate }: Props) {
  const sorted = useMemo(
    () => [...budgets].sort((a, b) => a.month.localeCompare(b.month)),
    [budgets],
  )
  const [selectedMonth, setSelectedMonth] = useState(sorted.at(-1)?.month ?? '')

  const selected = sorted.find((b) => b.month === selectedMonth)

  const updateAmount = (cat: BudgetCategory, val: number) => {
    if (!selected) return
    onUpdate(
      budgets.map((b) =>
        b.month === selectedMonth
          ? { ...b, amounts: { ...b.amounts, [cat]: val || undefined } }
          : b,
      ),
    )
  }

  const updateField = (field: 'income' | 'remark', val: string | number) => {
    if (!selected) return
    onUpdate(
      budgets.map((b) =>
        b.month === selectedMonth
          ? { ...b, [field]: field === 'income' ? Number(val) || undefined : val || undefined }
          : b,
      ),
    )
  }

  const addMonth = () => {
    const last = sorted.at(-1)?.month ?? '2026-01'
    const [y, m] = last.split('-').map(Number)
    const next = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`
    if (budgets.some((b) => b.month === next)) return
    onUpdate([...budgets, { month: next, amounts: {} }])
    setSelectedMonth(next)
  }

  const monthTotals = sorted.map((b) => ({ month: b.month, total: sumMonth(b) }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">월별 지출</h2>
        <p className="text-sm text-slate-500 mt-1">
          스프레드시트처럼 카테고리별 월 지출을 기록합니다.
        </p>
      </div>

      <div className="card-surface p-4 overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="text-left py-2 pr-3 sticky left-0 bg-white">카테고리</th>
              {sorted.map((b) => (
                <th key={b.month} className="text-right py-2 px-2 whitespace-nowrap">
                  {formatMonthLabel(b.month)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_BUDGET_CATEGORIES.map((cat) => (
              <tr key={cat} className="border-b border-slate-50">
                <td className="py-1.5 pr-3 text-slate-700 sticky left-0 bg-white text-xs">
                  {BUDGET_CATEGORY_LABELS[cat]}
                </td>
                {sorted.map((b) => {
                  const val = b.amounts[cat] ?? 0
                  const total = sumMonth(b)
                  const pct = total > 0 && val > 0 ? ((val / total) * 100).toFixed(0) : ''
                  return (
                    <td key={b.month} className="text-right py-1.5 px-2 tabular-nums">
                      {val > 0 ? (
                        <span className="text-slate-800">
                          {val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                          {pct && <span className="text-slate-400 text-xs ml-0.5">{pct}%</span>}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr className="border-t-2 border-slate-200 font-semibold">
              <td className="py-2 pr-3 sticky left-0 bg-white">합계</td>
              {monthTotals.map(({ month, total }) => (
                <td key={month} className="text-right py-2 px-2 text-indigo-700">
                  {formatCurrency(total)}
                </td>
              ))}
            </tr>
            <tr className="text-slate-500">
              <td className="py-1.5 pr-3 sticky left-0 bg-white text-xs">Income</td>
              {sorted.map((b) => (
                <td key={b.month} className="text-right py-1.5 px-2 text-xs">
                  {b.income ? formatCurrency(b.income) : '—'}
                </td>
              ))}
            </tr>
            <tr className="text-slate-500">
              <td className="py-1.5 pr-3 sticky left-0 bg-white text-xs">Remark</td>
              {sorted.map((b) => (
                <td key={b.month} className="text-right py-1.5 px-2 text-xs text-slate-600">
                  {b.remark || '—'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card-surface p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <label className="text-sm text-slate-500">월 선택 (수정)</label>
          <div className="flex gap-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="input w-auto"
            >
              {sorted.map((b) => (
                <option key={b.month} value={b.month}>{formatMonthLabel(b.month)}</option>
              ))}
            </select>
            <button
              onClick={addMonth}
              className="text-sm px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200"
            >
              + 월 추가
            </button>
          </div>
        </div>

        {selected && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ALL_BUDGET_CATEGORIES.map((cat) => (
              <div key={cat}>
                <label className="text-xs text-slate-500">{BUDGET_CATEGORY_LABELS[cat]}</label>
                <input
                  type="number"
                  step="0.01"
                  value={selected.amounts[cat] ?? ''}
                  onChange={(e) => updateAmount(cat, Number(e.target.value))}
                  className="input mt-0.5"
                  placeholder="0"
                />
              </div>
            ))}
            <div>
              <label className="text-xs text-slate-500">Income</label>
              <input
                type="number"
                value={selected.income ?? ''}
                onChange={(e) => updateField('income', e.target.value)}
                className="input mt-0.5"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-slate-500">Remark</label>
              <input
                value={selected.remark ?? ''}
                onChange={(e) => updateField('remark', e.target.value)}
                className="input mt-0.5"
                placeholder="메모"
              />
            </div>
          </div>
        )}
        {selected && (
          <p className="text-sm text-slate-600">
            {formatMonthLabel(selected.month)} 합계:{' '}
            <strong>{formatCurrency(sumMonth(selected))}</strong>
          </p>
        )}
      </div>
    </div>
  )
}
