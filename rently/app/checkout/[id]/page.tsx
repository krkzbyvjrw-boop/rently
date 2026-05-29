'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useLocale } from '../../LocaleProvider'

const bikes = [
  { id: 1, name: 'Trek FX3 City Cruiser', owner: 'Tomas K.', price: 8, type: 'City bike' },
  { id: 2, name: 'Giant Talon Mountain', owner: 'Rasa M.', price: 12, type: 'Mountain bike' },
  { id: 3, name: 'Cube Kathmandu E-bike', owner: 'Jonas D.', price: 18, type: 'Electric' },
  { id: 4, name: 'Puky Kids Bike', owner: 'Aistė V.', price: 5, type: 'Kids' },
  { id: 5, name: 'Specialized Sirrus', owner: 'Mantas P.', price: 10, type: 'City bike' },
  { id: 6, name: 'Scott Aspect Mountain', owner: 'Eglė S.', price: 14, type: 'Mountain bike' },
  { id: 7, name: 'Cannondale Quick City', owner: 'Lukas B.', price: 9, type: 'City bike' },
  { id: 8, name: 'Bosch E-bike Pro', owner: 'Indrė T.', price: 20, type: 'Electric' },
  { id: 9, name: 'Trek Marlin Mountain', owner: 'Artūras K.', price: 13, type: 'Mountain bike' },
  { id: 10, name: 'Cargo Family Bike', owner: 'Simona R.', price: 15, type: 'Cargo' },
  { id: 11, name: 'Kids Balance Bike', owner: 'Paulius M.', price: 4, type: 'Kids' },
  { id: 12, name: 'Giant Escape City', owner: 'Viktorija L.', price: 11, type: 'City bike' },
  { id: 13, name: 'Specialized Turbo E-bike', owner: 'Darius N.', price: 22, type: 'Electric' },
  { id: 14, name: 'Scott Scale Mountain', owner: 'Gabija P.', price: 16, type: 'Mountain bike' },
  { id: 15, name: 'Urban Arrow Cargo', owner: 'Tadas V.', price: 17, type: 'Cargo' },
]

const emoji: Record<string, string> = {
  'City bike': '🚲', 'Mountain bike': '🚵', Electric: '⚡', Kids: '🛵', Cargo: '📦'
}

const PROTECT_RATE = 0.20

export default function CheckoutPage() {
  const { t } = useLocale()
  const { id } = useParams()
  const bike = bikes.find(b => b.id === Number(id))
  const [message, setMessage] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [protect, setProtect] = useState(false)
  const [sent, setSent] = useState(false)

  if (!bike) return <div className="app-shell p-8 text-muted">{t('common.bikeNotFound')}</div>

  const days = fromDate && toDate
    ? Math.max(1, Math.ceil((new Date(toDate).getTime() - new Date(fromDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 1
  const rentalTotal = bike.price * days
  const protectTotal = protect ? Math.round(bike.price * PROTECT_RATE * days * 100) / 100 : 0
  const total = rentalTotal + protectTotal
  const protectDayPrice = Math.round(bike.price * PROTECT_RATE * 100) / 100

  const handleSend = () => {
    const existing = JSON.parse(localStorage.getItem('renly_bookings') || '[]')
    const newBooking = {
      id: Date.now(),
      bikeId: bike.id,
      bike: bike.name,
      owner: bike.owner,
      type: bike.type,
      dates: fromDate && toDate ? `${fromDate} – ${toDate}` : 'Dates TBC',
      total,
      protect,
      status: 'pending',
      message,
    }
    localStorage.setItem('renly_bookings', JSON.stringify([...existing, newBooking]))
    setSent(true)
  }

  const steps = [t('checkout.step1'), t('checkout.step2'), t('checkout.step3')]

  if (sent) return (
    <div className="app-shell flex items-center justify-center px-5">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-semibold text-fg mb-2">{t('checkout.requestSent')}</h2>
        <p className="text-muted text-sm mb-6">{t('checkout.requestSentHint', { owner: bike.owner })}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/account" className="inline-block px-5 py-2.5 text-sm rounded-lg" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>{t('checkout.viewBookings')}</Link>
          <Link href="/" className="inline-block px-5 py-2.5 text-sm rounded-lg text-muted" style={{ border: '1px solid var(--border)' }}>{t('checkout.browseMore')}</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="app-shell">
      <nav className="app-nav flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-fg">Renly</Link>
        <Link href="/account" className="text-sm px-4 py-2 rounded-full text-muted" style={{ border: '1px solid var(--border)' }}>{t('common.account')}</Link>
      </nav>

      <div className="max-w-lg mx-auto px-5 py-8">
        <Link href={`/listing/${bike.id}`} className="text-sm text-muted hover:opacity-80 mb-6 inline-block">{t('common.backToListing')}</Link>
        <h1 className="text-2xl font-semibold text-fg mb-6">{t('checkout.title')}</h1>

        <div className="flex gap-4 items-center app-card rounded-xl p-4 mb-6">
          <div className="w-14 h-14 app-surface rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
            {emoji[bike.type] || '🚲'}
          </div>
          <div>
            <p className="font-medium text-fg">{bike.name}</p>
            <p className="text-sm text-muted">{bike.owner} · €{bike.price} {t('common.perDay')}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs text-muted uppercase tracking-wide mb-2">{t('checkout.selectDates')}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="app-card rounded-lg p-3">
              <p className="text-xs text-muted mb-1">{t('checkout.from')}</p>
              <input type="date" className="text-sm text-fg outline-none w-full bg-transparent" value={fromDate} onChange={e => setFromDate(e.target.value)} />
            </div>
            <div className="app-card rounded-lg p-3">
              <p className="text-xs text-muted mb-1">{t('checkout.until')}</p>
              <input type="date" className="text-sm text-fg outline-none w-full bg-transparent" value={toDate} onChange={e => setToDate(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs text-muted uppercase tracking-wide mb-2">{t('checkout.protection')}</p>
          <div
            onClick={() => setProtect(!protect)}
            className="cursor-pointer app-card rounded-xl p-4 transition-opacity hover:opacity-95"
            style={protect ? { borderColor: '#eab308', boxShadow: 'inset 0 0 0 1px #eab308' } : undefined}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={protect ? { background: '#eab308', borderColor: '#eab308' } : { borderColor: 'var(--border)' }}
              >
                {protect && <span className="text-white text-xs font-bold">✓</span>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-sm font-semibold text-fg">{t('checkout.protectName')}</p>
                  <p className="text-sm font-medium text-fg shrink-0">{t('checkout.protectPrice', { price: protectDayPrice })}</p>
                </div>
                <p className="text-xs text-muted mt-1">{t('checkout.protectDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs text-muted uppercase tracking-wide mb-2">{t('checkout.messageLabel')}</p>
          <textarea
            className="w-full app-input rounded-lg p-3 text-sm text-fg outline-none resize-none"
            rows={3}
            placeholder={t('checkout.messagePlaceholder')}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <p className="text-xs text-muted uppercase tracking-wide mb-3">{t('checkout.howPickup')}</p>
          <div className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>{i + 1}</div>
                <p className="text-sm text-muted">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="app-card rounded-xl p-4 mb-6">
          <div className="flex flex-col gap-2 text-sm text-muted mb-3">
            <div className="flex justify-between text-fg">
              <span>{t('checkout.rentalLine', { price: bike.price, days })}</span>
              <span>€{rentalTotal}</span>
            </div>
            {protect && (
              <div className="flex justify-between" style={{ color: '#eab308' }}>
                <span>{t('checkout.protectLine', { days })}</span>
                <span>€{protectTotal}</span>
              </div>
            )}
            <div className="flex justify-between text-xs">
              <span>{t('checkout.serviceFee')}</span>
              <span>€0</span>
            </div>
          </div>
          <hr style={{ borderColor: 'var(--border)', marginBottom: '0.75rem' }} />
          <div className="flex justify-between font-semibold text-fg">
            <span>{t('checkout.total')}</span>
            <span>€{total}</span>
          </div>
        </div>

        <button onClick={handleSend} className="w-full py-3 text-sm font-medium rounded-xl" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
          {t('checkout.sendRequest')}
        </button>
        <p className="text-xs text-center text-muted mt-2">{t('checkout.cashOnPickup')}</p>
      </div>
    </div>
  )
}
