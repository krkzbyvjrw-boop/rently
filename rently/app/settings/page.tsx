'use client'
import Link from 'next/link'
import { useTheme } from '../ThemeProvider'
import { useLocale } from '../LocaleProvider'
import { SettingsToggle } from '@/components/SettingsToggle'
import { localeNames, locales, type Locale } from '@/lib/i18n'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const { locale, setLocale, notifications, setNotifications, t } = useLocale()
  const darkMode = theme === 'dark'

  return (
    <div className="app-shell">
      <nav className="app-nav flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-fg">Renly</Link>
        <Link href="/account" className="text-sm px-4 py-2 rounded-full text-muted" style={{ border: '1px solid var(--border)' }}>
          {t('common.account')}
        </Link>
      </nav>

      <div className="max-w-lg mx-auto px-5 py-8">
        <h1 className="text-2xl font-semibold mb-8 text-fg">{t('settings.title')}</h1>

        <div className="flex flex-col gap-0 app-card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <div>
              <p className="text-sm font-medium text-fg">{t('settings.darkMode')}</p>
              <p className="text-xs text-muted">{t('settings.darkModeHint')}</p>
            </div>
            <SettingsToggle
              on={darkMode}
              onChange={() => toggleTheme()}
              ariaLabel={t('settings.darkMode')}
            />
          </div>

          <div className="px-4 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="mb-3">
              <p className="text-sm font-medium text-fg">{t('settings.language')}</p>
              <p className="text-xs text-muted">{localeNames[locale]}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {locales.map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code as Locale)}
                  className="px-4 py-1.5 rounded-full text-sm transition-opacity hover:opacity-90"
                  style={
                    locale === code
                      ? { background: 'var(--accent)', color: 'var(--bg)', border: '1px solid var(--accent)' }
                      : { border: '1px solid var(--border)', color: 'var(--fg-muted)' }
                  }
                  aria-pressed={locale === code}
                >
                  {localeNames[code]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-4">
            <div>
              <p className="text-sm font-medium text-fg">{t('settings.notifications')}</p>
              <p className="text-xs text-muted">{t('settings.notificationsHint')}</p>
              <p className="text-xs text-muted mt-0.5 opacity-80">
                {notifications ? t('settings.notificationsOn') : t('settings.notificationsOff')}
              </p>
            </div>
            <SettingsToggle
              on={notifications}
              onChange={setNotifications}
              ariaLabel={t('settings.notifications')}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-0 app-card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Link href="/account" className="flex items-center justify-between px-4 py-4 text-fg" style={{ borderBottom: '1px solid var(--border)' }}>
            <p className="text-sm font-medium">{t('common.myAccount')}</p>
            <span className="text-sm text-muted">›</span>
          </Link>
          <Link href="/auth" className="flex items-center justify-between px-4 py-4" style={{ color: '#ef4444' }}>
            <p className="text-sm font-medium">{t('common.signOut')}</p>
            <span className="text-sm">›</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
