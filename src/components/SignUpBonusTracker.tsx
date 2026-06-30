import type { CreditCard } from '../types'
import { formatCurrency, formatPoints, daysUntil, formatPercent } from '../utils/format'

interface Props {
  cards: CreditCard[]
  onUpdateCard: (card: CreditCard) => void
}

export function SignUpBonusTracker({ cards, onUpdateCard }: Props) {
  const withBonus = cards.filter((c) => c.signUpBonus)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">보너스 목표</h2>
        <p className="text-sm text-slate-500 mt-1">
          새 카드 발급 시 필요한 최소 결제 금액(미니멈 스펜드) 달성률을 확인하세요.
        </p>
      </div>

      {withBonus.length === 0 ? (
        <p className="text-slate-500 text-sm">보너스 목표가 설정된 카드가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {withBonus.map((card) => (
            <BonusCard key={card.id} card={card} onUpdate={onUpdateCard} />
          ))}
        </div>
      )}
    </div>
  )
}

function BonusCard({
  card,
  onUpdate,
}: {
  card: CreditCard
  onUpdate: (c: CreditCard) => void
}) {
  const bonus = card.signUpBonus!
  const progress = Math.min(bonus.currentSpend / bonus.minSpend, 1)
  const remaining = Math.max(bonus.minSpend - bonus.currentSpend, 0)
  const days = daysUntil(bonus.deadline)
  const dailyNeeded = days > 0 ? remaining / days : remaining
  const completed = remaining === 0
  const urgent = !completed && days <= 14

  const addSpend = (amount: number) => {
    onUpdate({
      ...card,
      signUpBonus: { ...bonus, currentSpend: bonus.currentSpend + amount },
    })
  }

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${
        completed
          ? 'bg-emerald-50 border-emerald-200'
          : urgent
            ? 'bg-amber-50 border-amber-200'
            : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.color }} />
            <h3 className="font-semibold text-slate-800">{card.name}</h3>
            {completed && (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                달성 완료
              </span>
            )}
            {urgent && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                마감 임박
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            보너스: <strong className="text-slate-800">{formatPoints(bonus.bonusPoints)} {card.currency.includes('Mile') ? 'miles' : 'pts'}</strong>
            {' · '}
            예상 가치 {formatCurrency((bonus.bonusPoints * card.pointValue) / 100)}
          </p>
        </div>
        <div className="text-right text-sm">
          <p className="text-slate-500">마감일</p>
          <p className={urgent ? 'text-amber-700 font-medium' : 'text-slate-700'}>
            {bonus.deadline} ({days}일)
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-slate-500">
            {formatCurrency(bonus.currentSpend)} / {formatCurrency(bonus.minSpend)}
          </span>
          <span className="font-medium text-slate-700">{formatPercent(progress)}</span>
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              completed ? 'bg-emerald-400' : urgent ? 'bg-amber-400' : 'bg-indigo-400'
            }`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {!completed && (
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
          <span>
            남은 금액: <strong className="text-slate-800">{formatCurrency(remaining)}</strong>
          </span>
          {days > 0 && (
            <span>
              일일 필요: <strong className="text-slate-800">{formatCurrency(dailyNeeded)}</strong>
            </span>
          )}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {[50, 100, 500].map((amt) => (
          <button
            key={amt}
            onClick={() => addSpend(amt)}
            className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-200"
          >
            +${amt} 기록
          </button>
        ))}
        <input
          type="number"
          placeholder="직접 입력"
          className="text-xs w-24 input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const val = Number((e.target as HTMLInputElement).value)
              if (val > 0) {
                addSpend(val)
                ;(e.target as HTMLInputElement).value = ''
              }
            }
          }}
        />
      </div>
    </div>
  )
}
