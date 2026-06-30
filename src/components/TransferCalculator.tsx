import { useState } from 'react'
import type { CreditCard } from '../types'
import { compareAllTransfers, rankTransfers } from '../utils/transfer'
import { formatCurrency, formatPoints } from '../utils/format'

interface Props {
  cards: CreditCard[]
}

export function TransferCalculator({ cards }: Props) {
  const [points, setPoints] = useState(50000)
  const [selectedCardId, setSelectedCardId] = useState(
    cards.find((c) => c.transferPartners.length > 0)?.id ?? '',
  )

  const transferableCards = cards.filter((c) => c.transferPartners.length > 0)
  const selectedCard = cards.find((c) => c.id === selectedCardId)
  const cardTransfers = selectedCard ? rankTransfers(selectedCard, points) : []
  const allTransfers = compareAllTransfers(transferableCards, points)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">포인트 전환</h2>
        <p className="text-sm text-slate-500 mt-1">
          쌓인 포인트를 마일리지로 바꿀 때, 어디로 보내는 게 가치가 높은지 비교합니다.
        </p>
      </div>

      <div className="card-surface p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-500 mb-1.5">전환할 포인트</label>
          <input
            type="number"
            min={1000}
            step={1000}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-500 mb-1.5">포인트 프로그램</label>
          <select
            value={selectedCardId}
            onChange={(e) => setSelectedCardId(e.target.value)}
            className="input"
          >
            {transferableCards.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.currency})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCard && (
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-3">
            {selectedCard.name} 전환 옵션
          </h3>
          <div className="space-y-2">
            {cardTransfers.map((t, i) => (
              <div
                key={t.partner.id}
                className={`card-surface p-4 flex items-center gap-4 ${
                  i === 0 ? 'border-emerald-300' : ''
                }`}
              >
                {i === 0 && (
                  <span className="text-xs text-emerald-700 font-medium shrink-0">BEST</span>
                )}
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{t.partner.name}</p>
                  <p className="text-xs text-slate-500">
                    비율 {t.partner.ratio}:1
                    {t.partner.transferBonus
                      ? ` · +${t.partner.transferBonus}% 보너스`
                      : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800">{formatPoints(t.milesReceived)} miles</p>
                  <p className="text-xs text-slate-500">
                    ≈ {formatCurrency(t.estimatedValue)} · {t.effectiveCpp.toFixed(2)}¢/pt
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-slate-500 mb-3">전체 카드 최고 전환 비교</h3>
        <div className="overflow-x-auto card-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200 bg-slate-50">
                <th className="text-left py-2.5 px-4">카드</th>
                <th className="text-left py-2.5 pr-4">파트너</th>
                <th className="text-right py-2.5 pr-4">마일리지</th>
                <th className="text-right py-2.5 pr-4">예상 가치</th>
                <th className="text-right py-2.5 pr-4">¢/pt</th>
              </tr>
            </thead>
            <tbody>
              {allTransfers.slice(0, 10).map((t, i) => (
                <tr
                  key={`${t.cardId}-${t.partner.id}`}
                  className={`border-b border-slate-100 ${
                    i === 0 ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                  }`}
                >
                  <td className="py-2.5 px-4">{t.cardName}</td>
                  <td className="py-2.5 pr-4">{t.partner.name}</td>
                  <td className="py-2.5 pr-4 text-right">{formatPoints(t.milesReceived)}</td>
                  <td className="py-2.5 pr-4 text-right">{formatCurrency(t.estimatedValue)}</td>
                  <td className="py-2.5 pr-4 text-right">{t.effectiveCpp.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
