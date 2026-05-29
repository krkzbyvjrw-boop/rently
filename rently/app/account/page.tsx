'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { bikeEmoji, normalizeTags } from '@/lib/bikes'
import { IdentityVerification } from '@/components/IdentityVerification'
import { useLocale } from '../LocaleProvider'

export default function AccountPage() {
  const { t } = useLocale()
  const [tab, setTab] = useState<'bookings' | 'listings' | 'profile'>('bookings')
  const [bookings, setBookings] = useState<any[]>([])
  const [myListings, setMyListings] = useState<any[]>([])
  const [profile, setProfile] = useState({ name: 'Jonas Daukšas', email: 'jonas@email.com', phone: '' })
  const [saved, setSaved] = useState(false)
  const [editingListing, setEditingListing] = useState<any>(null)

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('Renly_bookings') || '[]')
    setBookings(storedBookings)
    const storedListings = JSON.parse(localStorage.getItem('Renly_listings') || '[]')
    setMyListings(storedListings)
  }, [])

  const cancelBooking = (id: number) => {
    if (!confirm(t('account.cancelConfirm'))) return
    const updated = bookings.filter(b => b.id !== id)
    localStorage.setItem('Renly_bookings', JSON.stringify(updated))
    setBookings(updated)
  }

  const togglePause = (id: number) => {
    const updated = myListings.map(l => l.id === id ? { ...l, paused: !l.paused } : l)
    localStorage.setItem('Renly_listings', JSON.stringify(updated))
    setMyListings(updated)
  }

  const deleteListing = (id: number) => {
    if (!confirm(t('account.deleteConfirm'))) return
    const updated = myListings.filter(l => l.id !== id)
    localStorage.setItem('Renly_listings', JSON.stringify(updated))
    setMyListings(updated)
  }

  const saveListing = (updated: any) => {
    const updatedList = myListings.map(l => l.id === updated.id ? updated : l)
    localStorage.setItem('Renly_listings', JSON.stringify(updatedList))
    setMyListings(updatedList)
    setEditingListing(null)
  }

  const update = (field: string, value: string) => {
    setSaved(false)
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="app-shell">
      <nav className="app-nav flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-fg">Renly</Link>
       <div className="flex gap-3">
          <Link href="/settings" className="text-sm px-4 py-2 border style={{ border: '1px solid var(--border)' }} rounded-md text-gray-600">Settings</Link>
          <Link href="/auth" className="text-sm px-4 py-2 bg-gray-900 text-white rounded-md">Sign out</Link>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-5 py-8">
        <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-lg font-semibold text-fg">{profile.name}</p>
            <p className="text-sm text-muted">{profile.email}</p>
          </div>
        </div>

        <IdentityVerification />

        <div className="flex gap-0 mb-6" style={{ borderBottom: '1px solid var(--border)' }}>
          {[
            { key: 'bookings' as const, label: t('account.bookings') },
            { key: 'listings' as const, label: t('account.myListings') },
            { key: 'profile' as const, label: t('account.profile') },
          ].map(tabItem => (
            <button key={tabItem.key} onClick={() => setTab(tabItem.key)}
              className={`text-sm px-4 py-3 border-b-2 ${tab === tabItem.key ? 'font-medium text-fg' : 'border-transparent text-muted'}`}
              style={tab === tabItem.key ? { borderBottomColor: 'var(--accent)' } : undefined}>
              {tabItem.label}
            </button>
          ))}
        </div>

        {/* BOOKINGS */}
        {tab === 'bookings' && (
          <div className="flex flex-col gap-0">
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-3xl mb-3">🚲</p>
                <p className="text-muted font-medium mb-1">{t('account.noBookings')}</p>
                <Link href="/" className="inline-block mt-3 text-sm px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>{t('account.browseBikes')}</Link>
              </div>
            ) : (
              bookings.map((b: any) => (
                <div key={b.id} className="py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 app-surface rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {bikeEmoji(normalizeTags(b))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-fg truncate">{b.bike}</p>
                      <p className="text-xs text-muted">{b.dates} · {b.owner} · €{b.total}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full font-medium flex-shrink-0" style={{ background: 'rgba(234,179,8,0.15)', color: '#ca8a04' }}>
                      {t('account.pending')}
                    </span>
                  </div>
                  <div className="mt-2 ml-16">
                    <button onClick={() => cancelBooking(b.id)} className="text-xs text-red-400 hover:text-red-600">
                      {t('account.cancelBooking')}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* LISTINGS */}
        {tab === 'listings' && (
          <div>
            {myListings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-3xl mb-3">🚲</p>
                <p className="text-muted font-medium mb-1">{t('account.noListings')}</p>
                <Link href="/list" className="inline-block mt-3 text-sm px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>{t('home.listYourBike')}</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-0 mb-6">
                {myListings.map(l => (
                  <div key={l.id} className="py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                    {editingListing?.id === l.id ? (
                      <div className="flex flex-col gap-3">
                        <div>
                          <label className="text-xs text-muted uppercase tracking-wide">{t('account.editName')}</label>
                          <input className="w-full py-1.5 text-sm text-fg outline-none bg-transparent" style={{ borderBottom: '1px solid var(--border)' }} value={editingListing.name} onChange={e => setEditingListing({ ...editingListing, name: e.target.value })} />
                        </div>
                        <div>
                          <label className="text-xs text-muted uppercase tracking-wide">{t('account.editLocation')}</label>
                          <input className="w-full py-1.5 text-sm text-fg outline-none bg-transparent" style={{ borderBottom: '1px solid var(--border)' }} value={editingListing.location} onChange={e => setEditingListing({ ...editingListing, location: e.target.value })} />
                        </div>
                        <div>
                          <label className="text-xs text-muted uppercase tracking-wide">{t('account.editPrice')}</label>
                          <input type="number" className="w-24 py-1.5 text-sm text-fg outline-none bg-transparent" style={{ borderBottom: '1px solid var(--border)' }} value={editingListing.price} onChange={e => setEditingListing({ ...editingListing, price: Number(e.target.value) })} />
                        </div>
                        <div>
                          <label className="text-xs text-muted uppercase tracking-wide">{t('account.editDescription')}</label>
                          <textarea className="w-full py-1.5 text-sm text-fg outline-none bg-transparent resize-none" style={{ borderBottom: '1px solid var(--border)' }} rows={2} value={editingListing.description || ''} onChange={e => setEditingListing({ ...editingListing, description: e.target.value })} />
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => saveListing(editingListing)} className="text-sm px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>{t('common.save')}</button>
                          <button onClick={() => setEditingListing(null)} className="text-sm px-4 py-2 rounded-lg text-muted" style={{ border: '1px solid var(--border)' }}>{t('common.cancel')}</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 app-surface rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                            {bikeEmoji(normalizeTags(l))}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-fg truncate">{l.name}</p>
                              {l.paused && <span className="text-xs px-2 py-0.5 rounded-full text-muted app-surface">{t('account.paused')}</span>}
                            </div>
                            <p className="text-xs text-muted">{l.location} · €{l.price} {t('common.perDay')}</p>
                          </div>
                        </div>
                        <div className="mt-2 ml-16 flex gap-4">
                          <button onClick={() => setEditingListing(l)} className="text-xs text-muted hover:opacity-80">{t('account.edit')}</button>
                          <button onClick={() => togglePause(l.id)} className="text-xs text-muted hover:opacity-80">{l.paused ? t('account.unpause') : t('account.pause')}</button>
                          <button onClick={() => deleteListing(l.id)} className="text-xs text-red-400 hover:text-red-600">{t('account.delete')}</button>
                          <Link href={`/listing/${l.id}`} className="text-xs text-muted hover:opacity-80">{t('account.preview')}</Link>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <div className="mt-4">
                  <Link href="/list" className="inline-block text-sm px-4 py-2.5 rounded-lg" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>{t('account.addListing')}</Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROFILE */}
        {tab === 'profile' && (
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-xs text-muted uppercase tracking-wide mb-2">{t('account.fullName')}</label>
              <input className="w-full py-2 text-sm text-fg outline-none bg-transparent" style={{ borderBottom: '1px solid var(--border)' }} value={profile.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-muted uppercase tracking-wide mb-2">{t('account.email')}</label>
              <input className="w-full py-2 text-sm text-fg outline-none bg-transparent" style={{ borderBottom: '1px solid var(--border)' }} type="email" value={profile.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-muted uppercase tracking-wide mb-2">{t('account.phone')}</label>
              <input className="w-full py-2 text-sm text-fg outline-none bg-transparent" style={{ borderBottom: '1px solid var(--border)' }} placeholder="+370 600 00000" value={profile.phone} onChange={e => update('phone', e.target.value)} />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <button onClick={() => setSaved(true)} className="px-6 py-2.5 text-sm rounded-lg" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>{t('account.saveChanges')}</button>
              {saved && <span className="text-sm text-green-600">{t('account.saved')}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}