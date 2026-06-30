import { useMemo } from 'react'
import type { CreditCard, SpendingEntry } from '../types'
import type { MonthlyBudget, BonusRecord } from '../types/budget'
import { formatCurrency, formatPoints, formatPercent, daysUntil } from '../utils/format'
import { sumMonth, formatMonthLabel } from '../data/defaultBudget'
import { CategoryGuideCompact } from './CategoryGuide'

type Tab = 'dashboard' | 'recommend' | 'bonus' | 'transfer' | 'cards' | 'spending' | 'budget' | 'benefits'

interface Props {
  cards: CreditCard[]
  spending: SpendingEntry[]
  budgets: MonthlyBudget[]
  bonusRecords: BonusRecord[]
  onNavigate: (tab: Tab) => void
}

export function Dashboard({ cards, spending, budgets, bonusRecords, onNavigate }: Props) {
  const aaCard = cards.find((c) => c.id === 'aa-citi-platinum')
  const aaBonus = aaCard?.signUpBonus
  const aaRemaining = aaBonus ? Math.max(aaBonus.minSpend - aaBonus.currentSpend, 0) : 0
  const aaProgress = aaBonus ? Math.min(aaBonus.currentSpend / aaBonus.minSpend, 1) : 0
  const aaDays = aaBonus ? daysUntil(aaBonus.deadline) : 0

  const sortedBudgets = useMemo(
    () => [...budgets].sort((a, b) => a.month.localeCompare(b.month)),
    [budgets],
  )
  const latestBudget = sortedBudgets.at(-1)
  const latestMonthTotal = latestBudget ? sumMonth(latestBudget) : 0
  const ytdBudgetTotal = sortedBudgets.reduce((s, b) => s + sumMonth(b), 0)

  const bonusEarned = bonusRecords
    .filter((r) => r.status === 'completed')
    .reduce((s, r) => s + r.amount, 0)

  const totalSpent = spending.reduce((s, e) => s + e.amount, 0)
  const totalLimit = cards.reduce((s, c) => s + (c.creditLimit ?? 0), 0)
  const totalAnnualFee = cards.reduce((s, c) => s + c.annualFee, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={latestBudget ? `${formatMonthLabel(latestBudget.month)} 지출` : '이번 달'}
          value={formatCurrency(latestMonthTotal)}
        />
        <StatCard label="연간 지출 (기록)" value={formatCurrency(ytdBudgetTotal)} />
        <StatCard label="보너스·환급 수령" value={formatCurrency(bonusEarned)} highlight />
        <StatCard label="총 신용 한도" value={formatCurrency(totalLimit)} />
      </div>

      {aaBonus && aaRemaining > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-amber-800 text-sm font-medium">AA 보너스 목표</p>
              <p className="text-slate-800 font-semibold mt-1">{aaCard!.name}</p>
              <p className="text-sm text-slate-500 mt-1">
                {formatPoints(aaBonus.bonusPoints)} miles · 마감 {aaBonus.deadline} ({aaDays}일)
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-slate-800">{formatPercent(aaProgress)}</p>
              <p className="text-xs text-slate-500">
                {formatCurrency(aaBonus.currentSpend)} / {formatCurrency(aaBonus.minSpend)}
              </p>
            </div>
          </div>
          <div className="h-2.5 bg-amber-100 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-amber-400 rounded-full transition-all"
              style={{ width: `${aaProgress * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-600">
            <span>{formatCurrency(aaRemaining)} 더 필요</span>
            {aaDays > 0 && <span>일 {formatCurrency(aaRemaining / aaDays)}</span>}
          </div>
          <button
            onClick={() => onNavigate('bonus')}
            className="mt-3 text-sm text-amber-700 hover:text-amber-800"
          >
            상세 보기 →
          </button>
        </div>
      )}

      <div className="card-surface p-5">
        <h2 className="font-semibold mb-3 text-slate-800">자주 쓰는 카테고리</h2>
        <CategoryGuideCompact cards={cards} />
        <button
          onClick={() => onNavigate('recommend')}
          className="mt-4 text-sm text-indigo-600 hover:text-indigo-700"
        >
          결제 추천 →
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-surface p-5">
          <h2 className="font-semibold mb-4 text-slate-800">월별 지출 추이</h2>
          {sortedBudgets.length === 0 ? (
            <p className="text-slate-500 text-sm">기록이 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {sortedBudgets.slice(-5).map((b) => (
                <li key={b.month} className="flex justify-between text-sm">
                  <span className="text-slate-700">{formatMonthLabel(b.month)}</span>
                  <span className="text-slate-800 font-medium">{formatCurrency(sumMonth(b))}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => onNavigate('budget')}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-700"
          >
            월별 지출표 →
          </button>
        </div>

        <div className="card-surface p-5">
          <h2 className="font-semibold mb-4 text-slate-800">재무 요약</h2>
          <dl className="space-y-2 text-sm">
            <Row label="카드 일별 기록" value={formatCurrency(totalSpent)} />
            <Row label="연간 연회비" value={formatCurrency(totalAnnualFee)} />
            <Row label="보너스 수령 합계" value={formatCurrency(bonusEarned)} />
            <Row
              label="최근 보너스"
              value={
                bonusRecords.find((r) => r.status === 'completed' && r.creditedDate)?.name ?? '—'
              }
            />
          </dl>
          <button
            onClick={() => onNavigate('bonus')}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-700"
          >
            보너스 기록 →
          </button>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl p-4 border shadow-sm ${
        highlight ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'
      }`}
    >
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-bold mt-1 text-slate-800">{value}</p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500 shrink-0">{label}</dt>
      <dd className="font-medium text-slate-800 text-right truncate">{value}</dd>
    </div>
  )
}
