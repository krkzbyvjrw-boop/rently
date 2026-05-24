'use client'
import Link from 'next/link'
import { useState } from 'react'

const myBookings = [
  { id: 1, bike: 'Trek FX3 City Cruiser', owner: 'Tomas K.', dates: 'Jun 3–5', total: 24, status: 'confirmed', type: 'City' },
  { id: 3, bike: 'Cube Kathmandu E-bike', owner: 'Jonas D.', dates: 'Jun 10–11', total: 18, status: 'pending', type: 'Electric' },
]

const myListings = [
  { id: 2, bike: 'Giant Talon Mountain', location: 'Žirmūnai', price: 12, rentals: 3, type: 'Mountain' },
]

const emoji: Record<string, string> = {
  City: '🚲', Mountain: '🚵', Electric: '⚡', Kids: '🛵', Cargo: '📦'
}

export default function AccountPage() {
  const [tab, setTab] = useState<'bookings' | 'listings' | 'profile'>('bookings')
  const [profile, setProfile] = useState({ name: 'Jonas Daukšas', email: 'jonas@email.com', phone: '' })
  const [saved, setSaved] = useState(false)

  const update = (field: string, value: string) => {
    setSaved(false)
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <Link href="/" className="text-xl font-semibold tracking-tight">Rently</Link>
        <div className="flex gap-3">
          <Link href="/list" className="text-sm px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:border-gray-400">List a bike</Link>
          <Link href="/auth" className="text-sm px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700">Sign out</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-10">
        {/* PROFILE HEADER */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium text-gray-600">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">{profile.name}</p>
            <p className="text-sm text-gray-400">{profile.email} · Member since 2025</p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-0 border-b border-gray-100 mb-6">
          {(['bookings', 'listings', 'profile'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm px-4 py-3 border-b-2 capitalize ${tab === t ? 'border-gray-900 text-gray-900 font-medium' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              {t === 'profile' ? 'Edit profile' : t === 'bookings' ? 'My bookings' : 'My listings'}
            </button>
          ))}
        </div>

        {/* BOOKINGS */}
        {tab === 'bookings' && (
          <div className="flex flex-col gap-0">
            {myBookings.map(b => (
              <div key={b.id} className="flex items-center gap-4 py-4 border-b border-gray-50">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  {emoji[b.type]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{b.bike}</p>
                  <p className="text-xs text-gray-400">{b.dates} · {b.owner} · €{b.total} total</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${b.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  {b.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </span>
              </div>
            ))}
            {myBookings.length === 0 && <p className="text-sm text-gray-400">No bookings yet.</p>}
          </div>
        )}

        {/* LISTINGS */}
        {tab === 'listings' && (
          <div>
            <div className="flex flex-col gap-0 mb-6">
              {myListings.map(l => (
                <div key={l.id} className="flex items-center gap-4 py-4 border-b border-gray-50">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {emoji[l.type]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{l.bike}</p>
                    <p className="text-xs text-gray-400">{l.location} · €{l.price} / day · {l.rentals} rentals</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:border-gray-400">Edit</button>
                    <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:border-gray-400">Pause</button>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/list" className="inline-block text-sm px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700">
              + Add a new listing
            </Link>
          </div>
        )}

        {/* EDIT PROFILE */}
        {tab === 'profile' && (
          <div className="max-w-sm flex flex-col gap-6">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Full name</label>
              <input
                className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
                value={profile.name}
                onChange={e => update('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Email</label>
              <input
                className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
                type="email"
                value={profile.email}
                onChange={e => update('email', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Phone (optional)</label>
              <input
                className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
                placeholder="+370 600 00000"
                value={profile.phone}
                onChange={e => update('phone', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setSaved(true)}
                className="px-6 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700"
              >
                Save changes
              </button>
              {saved && <span className="text-sm text-green-600">✓ Saved</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}