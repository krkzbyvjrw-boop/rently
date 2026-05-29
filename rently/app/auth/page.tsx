'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useLocale } from '../LocaleProvider'

export default function AuthPage() {
  const { t } = useLocale()
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const fieldClass = 'w-full py-2 text-sm text-fg outline-none bg-transparent'
  const fieldStyle = { borderBottom: '1px solid var(--border)' }

  return (
    <div className="app-shell">
      <nav className="app-nav flex items-center justify-between px-8 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-fg">Renly</Link>
      </nav>

      <div className="max-w-sm mx-auto px-8 py-16">
        <h1 className="text-2xl font-semibold text-fg mb-2">
          {tab === 'login' ? t('auth.welcomeBack') : t('auth.createAccount')}
        </h1>
        <p className="text-sm text-muted mb-8">
          {tab === 'login' ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}
        </p>

        <div className="flex app-card rounded-lg overflow-hidden mb-8">
          <button
            onClick={() => setTab('login')}
            className="flex-1 py-2.5 text-sm font-medium"
            style={
              tab === 'login'
                ? { background: 'var(--accent)', color: 'var(--bg)' }
                : { color: 'var(--fg-muted)' }
            }
          >
            {t('common.logIn')}
          </button>
          <button
            onClick={() => setTab('signup')}
            className="flex-1 py-2.5 text-sm font-medium"
            style={
              tab === 'signup'
                ? { background: 'var(--accent)', color: 'var(--bg)' }
                : { color: 'var(--fg-muted)' }
            }
          >
            {t('common.signUp')}
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs text-muted uppercase tracking-wide mb-2">{t('auth.fullName')}</label>
              <input className={fieldClass} style={fieldStyle} placeholder={t('auth.namePlaceholder')} value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
          )}

          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-2">{t('auth.email')}</label>
            <input className={fieldClass} style={fieldStyle} type="email" placeholder={t('auth.emailPlaceholder')} value={form.email} onChange={e => update('email', e.target.value)} />
          </div>

          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-2">{t('auth.password')}</label>
            <input className={fieldClass} style={fieldStyle} type="password" placeholder="••••••••" value={form.password} onChange={e => update('password', e.target.value)} />
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="block w-full text-center py-3 text-sm font-medium rounded-lg"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              {tab === 'login' ? t('common.logIn') : t('auth.createAccountBtn')}
            </Link>
          </div>

          {tab === 'login' && (
            <p className="text-center text-xs text-muted cursor-pointer hover:opacity-80">{t('auth.forgotPassword')}</p>
          )}
        </div>
      </div>
    </div>
  )
}
