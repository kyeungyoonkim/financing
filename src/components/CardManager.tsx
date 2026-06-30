import { useState } from 'react'
import type { CreditCard, SpendingCategory } from '../types'
import { ALL_CATEGORIES, CATEGORY_LABELS } from '../data/categories'

interface Props {
  cards: CreditCard[]
  onAdd: (card: CreditCard) => void
  onUpdate: (card: CreditCard) => void
  onRemove: (id: string) => void
}

const ISSUERS = ['Chase', 'Amex', 'Citi', 'Capital One', 'Other'] as const

export function CardManager({ cards, onAdd, onUpdate, onRemove }: Props) {
  const [editing, setEditing] = useState<CreditCard | null>(null)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">내 카드</h2>
          <p className="text-sm text-slate-500 mt-1">
            보유 카드의 적립률과 보너스 목표를 등록·관리하세요.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null)
            setShowForm(true)
          }}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          + 카드 추가
        </button>
      </div>

      <div className="grid gap-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card-surface p-4 flex items-center gap-4"
          >
            <div
              className="w-2 h-12 rounded-full shrink-0"
              style={{ backgroundColor: card.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800">{card.name}</p>
              <p className="text-sm text-slate-500">
                {card.issueDate && `발급 ${card.issueDate}`}
                {card.creditLimit != null && ` · 한도 ${formatLimit(card.creditLimit)}`}
                {card.issueDate || card.creditLimit != null ? ' · ' : ''}
                {card.issuer} · {card.currency} · 기본 {card.defaultRate}x
                {card.annualFee > 0 ? ` · 연회비 $${card.annualFee}` : ' · 무연회비'}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {card.earningRates.map((r) => (
                  <span
                    key={r.category}
                    className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200"
                  >
                    {CATEGORY_LABELS[r.category]} {r.rate}x
                  </span>
                ))}
              </div>
              {card.notes && (
                <p className="text-xs text-slate-400 mt-2">{card.notes}</p>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => {
                  setEditing(card)
                  setShowForm(true)
                }}
                className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200"
              >
                수정
              </button>
              <button
                onClick={() => onRemove(card.id)}
                className="text-xs px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <CardForm
          initial={editing}
          onSave={(card) => {
            if (editing) onUpdate(card)
            else onAdd(card)
            setShowForm(false)
            setEditing(null)
          }}
          onCancel={() => {
            setShowForm(false)
            setEditing(null)
          }}
        />
      )}
    </div>
  )
}

function formatLimit(n: number) {
  return `$${n.toLocaleString()}`
}

function CardForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: CreditCard | null
  onSave: (card: CreditCard) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initial?.name ?? '')
  const [issuer, setIssuer] = useState<CreditCard['issuer']>(initial?.issuer ?? 'Chase')
  const [currency, setCurrency] = useState(initial?.currency ?? 'Points')
  const [defaultRate, setDefaultRate] = useState(initial?.defaultRate ?? 1)
  const [annualFee, setAnnualFee] = useState(initial?.annualFee ?? 0)
  const [pointValue, setPointValue] = useState(initial?.pointValue ?? 1)
  const [color, setColor] = useState(initial?.color ?? '#6366f1')
  const [issueDate, setIssueDate] = useState(initial?.issueDate ?? '')
  const [creditLimit, setCreditLimit] = useState(initial?.creditLimit ?? 0)
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [rates, setRates] = useState(
    initial?.earningRates ?? [{ category: 'dining' as SpendingCategory, rate: 3 }],
  )
  const [hasBonus, setHasBonus] = useState(!!initial?.signUpBonus)
  const [bonusPoints, setBonusPoints] = useState(initial?.signUpBonus?.bonusPoints ?? 50000)
  const [minSpend, setMinSpend] = useState(initial?.signUpBonus?.minSpend ?? 3000)
  const [currentSpend, setCurrentSpend] = useState(initial?.signUpBonus?.currentSpend ?? 0)
  const [deadline, setDeadline] = useState(
    initial?.signUpBonus?.deadline ?? new Date(Date.now() + 90 * 86_400_000).toISOString().slice(0, 10),
  )

  const handleSave = () => {
    if (!name.trim()) return
    onSave({
      id: initial?.id ?? `card-${Date.now()}`,
      name: name.trim(),
      issuer,
      currency,
      defaultRate,
      annualFee,
      pointValue,
      color,
      issueDate: issueDate || undefined,
      creditLimit: creditLimit > 0 ? creditLimit : undefined,
      notes: notes.trim() || undefined,
      earningRates: rates,
      transferPartners: initial?.transferPartners ?? [],
      signUpBonus: hasBonus
        ? {
            bonusPoints,
            minSpend,
            currentSpend,
            deadline,
            excludeFromRecommend: initial?.signUpBonus?.excludeFromRecommend,
          }
        : undefined,
    })
  }

  const addRate = () =>
    setRates([...rates, { category: 'other' as SpendingCategory, rate: 1 }])

  const updateRate = (idx: number, field: 'category' | 'rate', val: string | number) => {
    const next = [...rates]
    if (field === 'category') next[idx] = { ...next[idx], category: val as SpendingCategory }
    else next[idx] = { ...next[idx], rate: Number(val) }
    setRates(next)
  }

  return (
    <div className="fixed inset-0 bg-slate-900/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-xl">
        <h3 className="font-semibold text-lg text-slate-800">{initial ? '카드 수정' : '새 카드 추가'}</h3>

        <Field label="카드 이름">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Chase Sapphire Preferred"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="발급사">
            <select value={issuer} onChange={(e) => setIssuer(e.target.value as CreditCard['issuer'])} className="input">
              {ISSUERS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </Field>
          <Field label="포인트 종류">
            <input value={currency} onChange={(e) => setCurrency(e.target.value)} className="input" />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Field label="기본 적립률">
            <input type="number" step="0.5" value={defaultRate} onChange={(e) => setDefaultRate(Number(e.target.value))} className="input" />
          </Field>
          <Field label="포인트 가치 (¢)">
            <input type="number" step="0.05" value={pointValue} onChange={(e) => setPointValue(Number(e.target.value))} className="input" />
          </Field>
          <Field label="연회비 ($)">
            <input type="number" value={annualFee} onChange={(e) => setAnnualFee(Number(e.target.value))} className="input" />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="발급일 (YY/MM)">
            <input value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="input" placeholder="26/06" />
          </Field>
          <Field label="신용 한도 ($)">
            <input type="number" value={creditLimit || ''} onChange={(e) => setCreditLimit(Number(e.target.value))} className="input" placeholder="6000" />
          </Field>
        </div>

        <Field label="카드 색상">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-9 rounded cursor-pointer" />
        </Field>

        <Field label="메모 (적립 조건 등)">
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input"
            placeholder="Amazon Prime 필요, 연 $6k 한도 등"
          />
        </Field>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-slate-500">카테고리별 적립률</label>
            <button onClick={addRate} className="text-xs text-indigo-600">+ 추가</button>
          </div>
          {rates.map((r, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <select
                value={r.category}
                onChange={(e) => updateRate(i, 'category', e.target.value)}
                className="input flex-1"
              >
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
              <input
                type="number"
                step="0.5"
                value={r.rate}
                onChange={(e) => updateRate(i, 'rate', e.target.value)}
                className="input w-20"
              />
              <span className="text-slate-500 self-center text-sm">x</span>
            </div>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={hasBonus} onChange={(e) => setHasBonus(e.target.checked)} />
          사인업 보너스 목표 설정
        </label>

        {hasBonus && (
          <div className="grid grid-cols-2 gap-3 pl-4 border-l-2 border-indigo-200">
            <Field label="보너스 포인트">
              <input type="number" value={bonusPoints} onChange={(e) => setBonusPoints(Number(e.target.value))} className="input" />
            </Field>
            <Field label="미니멈 스펜드 ($)">
              <input type="number" value={minSpend} onChange={(e) => setMinSpend(Number(e.target.value))} className="input" />
            </Field>
            <Field label="현재 지출 ($)">
              <input type="number" value={currentSpend} onChange={(e) => setCurrentSpend(Number(e.target.value))} className="input" />
            </Field>
            <Field label="마감일">
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="input" />
            </Field>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button onClick={handleSave} className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium">
            저장
          </button>
          <button onClick={onCancel} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm border border-slate-200">
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  )
}
