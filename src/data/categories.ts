import type { SpendingCategory } from '../types'

export const CATEGORY_LABELS: Record<SpendingCategory, string> = {
  dining: '식당 / Dining',
  groceries: '마트 / Groceries',
  travel: '여행 / Travel',
  airlines: '항공권 / Airlines',
  hotels: '호텔 / Hotels',
  gas: '주유 / Gas',
  online_shopping: '온라인 쇼핑 (일반)',
  amazon: 'Amazon / 아마존',
  apple_store: 'Apple / 제휴사',
  chase_travel: 'Chase Travel 포털',
  entertainment: '스트리밍 / Entertainment',
  drugstore: '약국 / Drugstore',
  other: '기타 / Other',
}

export const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as SpendingCategory[]

/** 결제 가이드에 표시할 주요 카테고리 */
export const GUIDE_CATEGORIES: SpendingCategory[] = [
  'dining',
  'groceries',
  'gas',
  'amazon',
  'online_shopping',
  'hotels',
  'airlines',
  'travel',
  'entertainment',
  'drugstore',
  'chase_travel',
  'apple_store',
]
