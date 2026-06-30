export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPoints(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value))
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export function daysUntil(dateStr: string): number {
  return Math.max(
    0,
    Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86_400_000),
  )
}
