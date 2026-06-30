import type { CreditCard } from '../types'
import type { CardPerk, CardPerkPeriod } from '../types/perks'
import { formatCurrency, formatPercent, daysUntil } from '../utils/format'

interface Props {
  cards: CreditCard[]
  perks: CardPerk[]
  onUpdate: (perks: CardPerk[]) => void
}

export function CardPerkTracker({ cards, perks, onUpdate }: Props) {
  if (perks.length === 0) return null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">카드 정기 혜택</h2>
        <p className="text-sm text-slate-500 mt-1">
          6개월 주기 캐시백 등 반복 혜택 진행 상황을 추적합니다.
        </p>
      </div>

      <div className="space-y-4">
        {perks.map((perk) => {
          const card = cards.find((c) => c.id === perk.cardId)
          return (
            <div key={perk.id} className="card-surface p-5 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  {card && (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: card.color }} />
                  )}
                  <h3 className="font-semibold text-slate-800">{card?.name ?? perk.cardId}</h3>
                </div>
                <p className="text-sm font-medium text-slate-700 mt-1">{perk.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{perk.description}</p>
              </div>

              {perk.periods.map((period) => (
                <PeriodRow
                  key={period.id}
                  period={period}
                  onAddSpend={(amt) => {
                    onUpdate(
                      perks.map((p) =>
                        p.id !== perk.id
                          ? p
                          : {
                              ...p,
                              periods: p.periods.map((pr) =>
                                pr.id !== period.id
                                  ? pr
                                  : { ...pr, currentSpend: pr.currentSpend + amt },
                              ),
                            },
                      ),
                    )
                  }}
                  onMarkComplete={() => {
                    onUpdate(
                      perks.map((p) =>
                        p.id !== perk.id
                          ? p
                          : {
                              ...p,
                              periods: p.periods.map((pr) =>
                                pr.id !== period.id
                                  ? pr
                                  : {
                                      ...pr,
                                      status: 'completed' as const,
                                      currentSpend: Math.max(pr.currentSpend, pr.minSpend),
                                    },
                              ),
                            },
                      ),
                    )
                  }}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PeriodRow({
  period,
  onAddSpend,
  onMarkComplete,
}: {
  period: CardPerkPeriod
  onAddSpend: (amount: number) => void
  onMarkComplete: () => void
}) {
  const progress = Math.min(period.currentSpend / period.minSpend, 1)
  const remaining = Math.max(period.minSpend - period.currentSpend, 0)
  const completed = period.status === 'completed'
  const days = daysUntil(period.periodEnd)
  const urgent = !completed && days <= 30

  return (
    <div
      className={`rounded-lg border p-4 ${
        completed
          ? 'bg-emerald-50 border-emerald-200'
          : urgent
            ? 'bg-amber-50 border-amber-200'
            : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-800">{period.label}</span>
            {completed && (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                ${period.rewardAmount} 수령
                {period.creditedDate ? ` · ${period.creditedDate}` : ''}
              </span>
            )}
            {!completed && urgent && (
              <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">마감 임박</span>
            )}
          </div>
          {!completed && (
            <p className="text-xs text-slate-500 mt-1">마감 {period.periodEnd} ({days}일)</p>
          )}
        </div>
        <span className="text-sm font-semibold text-slate-700">{formatPercent(progress)}</span>
      </div>

      <div className="h-2 bg-white/80 rounded-full overflow-hidden mt-2 border border-slate-200/80">
        <div
          className={`h-full rounded-full ${completed ? 'bg-emerald-400' : 'bg-indigo-400'}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <p className="text-xs text-slate-500 mt-2">
        항공 {formatCurrency(period.currentSpend)} / {formatCurrency(period.minSpend)}
        {!completed && remaining > 0 && ` · ${formatCurrency(remaining)} 남음`}
      </p>

      {!completed && (
        <div className="flex gap-2 mt-3">
          {[50, 100, 250].map((amt) => (
            <button
              key={amt}
              onClick={() => onAddSpend(amt)}
              className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
            >
              +${amt}
            </button>
          ))}
          {!completed && period.currentSpend >= period.minSpend && (
            <button
              onClick={onMarkComplete}
              className="text-xs px-2.5 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              $50 수령 완료
            </button>
          )}
        </div>
      )}
    </div>
  )
}
