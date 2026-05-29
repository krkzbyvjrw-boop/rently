'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import {
  getMessage,
  interpolate,
  isLocale,
  LOCALE_KEY,
  NOTIFICATIONS_KEY,
  type Locale,
} from '@/lib/i18n'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  notifications: boolean
  setNotifications: (enabled: boolean) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [notifications, setNotificationsState] = useState(true)

  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_KEY)
    if (isLocale(savedLocale)) {
      setLocaleState(savedLocale)
      document.documentElement.lang = savedLocale
    }
    const savedNotif = localStorage.getItem(NOTIFICATIONS_KEY)
    if (savedNotif !== null) setNotificationsState(savedNotif === 'true')
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(LOCALE_KEY, next)
    document.documentElement.lang = next
  }, [])

  const setNotifications = useCallback((enabled: boolean) => {
    setNotificationsState(enabled)
    localStorage.setItem(NOTIFICATIONS_KEY, String(enabled))
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const text = getMessage(locale, key)
      return vars ? interpolate(text, vars) : text
    },
    [locale]
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, notifications, setNotifications, t }}>
      {children}
    </LocaleContext.Provider>
  )
}
