import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initial: T,
  dataVersion?: number,
  migrate?: (value: T) => T,
) {
  const versionKey = dataVersion != null ? `${key}@version` : null

  const [value, setValue] = useState<T>(() => {
    try {
      if (versionKey != null && dataVersion != null) {
        const storedVersion = localStorage.getItem(versionKey)
        if (storedVersion !== String(dataVersion)) {
          localStorage.setItem(versionKey, String(dataVersion))
          localStorage.removeItem(key)
          localStorage.removeItem('cc-optimizer-cards')
          localStorage.removeItem('my-ledger-cards-v2')
          return migrate ? migrate(initial) : initial
        }
      }

      const stored = localStorage.getItem(key)
      const loaded = stored ? (JSON.parse(stored) as T) : initial
      return migrate ? migrate(loaded) : loaded
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
