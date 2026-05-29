'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from './LocaleProvider'

const cities = ['Vilnius', 'Kaunas', 'Panevėžys', 'Klaipėda', 'Šiauliai']

const cityCoords: Record<string, { lat: number; lng: number }> = {
  Vilnius: { lat: 54.6872, lng: 25.2797 },
  Kaunas: { lat: 54.8985, lng: 23.9036 },
  Panevėžys: { lat: 55.7348, lng: 24.3571 },
  Klaipėda: { lat: 55.7033, lng: 21.1443 },
  Šiauliai: { lat: 55.9349, lng: 23.3137 },
}

const categories = ['All', 'City bike', 'Mountain bike', 'Electric', 'Kids', 'Cargo'] as const

const defaultBikes = [
  { id: 1, name: 'Trek FX3 City Cruiser', owner: 'Tomas K.', city: 'Vilnius', location: 'Old Town', price: 8, type: 'City bike' },
  { id: 2, name: 'Giant Talon Mountain', owner: 'Rasa M.', city: 'Vilnius', location: 'Žirmūnai', price: 12, type: 'Mountain bike' },
  { id: 3, name: 'Cube Kathmandu E-bike', owner: 'Jonas D.', city: 'Panevėžys', location: 'Centre', price: 18, type: 'Electric' },
  { id: 4, name: 'Puky Kids Bike', owner: 'Aistė V.', city: 'Vilnius', location: 'Antakalnis', price: 5, type: 'Kids' },
  { id: 5, name: 'Specialized Sirrus', owner: 'Mantas P.', city: 'Kaunas', location: 'Centre', price: 10, type: 'City bike' },
  { id: 6, name: 'Scott Aspect Mountain', owner: 'Eglė S.', city: 'Šiauliai', location: 'Centre', price: 14, type: 'Mountain bike' },
  { id: 7, name: 'Cannondale Quick City', owner: 'Lukas B.', city: 'Kaunas', location: 'Aleksotas', price: 9, type: 'City bike' },
  { id: 8, name: 'Bosch E-bike Pro', owner: 'Indrė T.', city: 'Vilnius', location: 'Lazdynai', price: 20, type: 'Electric' },
  { id: 9, name: 'Trek Marlin Mountain', owner: 'Artūras K.', city: 'Klaipėda', location: 'Centre', price: 13, type: 'Mountain bike' },
  { id: 10, name: 'Cargo Family Bike', owner: 'Simona R.', city: 'Vilnius', location: 'Naujamiestis', price: 15, type: 'Cargo' },
  { id: 11, name: 'Kids Balance Bike', owner: 'Paulius M.', city: 'Kaunas', location: 'Šilainiai', price: 4, type: 'Kids' },
  { id: 12, name: 'Giant Escape City', owner: 'Viktorija L.', city: 'Klaipėda', location: 'Smiltynė', price: 11, type: 'City bike' },
  { id: 13, name: 'Specialized Turbo E-bike', owner: 'Darius N.', city: 'Panevėžys', location: 'Senvagė', price: 22, type: 'Electric' },
  { id: 14, name: 'Scott Scale Mountain', owner: 'Gabija P.', city: 'Šiauliai', location: 'Gubernija', price: 16, type: 'Mountain bike' },
  { id: 15, name: 'Urban Arrow Cargo', owner: 'Tadas V.', city: 'Vilnius', location: 'Užupis', price: 17, type: 'Cargo' },
]

const emoji: Record<string, string> = {
  'City bike': '🚲', 'Mountain bike': '🚵', Electric: '⚡', Kids: '🛵', Cargo: '📦'
}

function getNearestCity(lat: number, lng: number): string {
  let nearest = 'Vilnius'
  let minDist = Infinity
  for (const [city, coords] of Object.entries(cityCoords)) {
    const dist = Math.sqrt(Math.pow(lat - coords.lat, 2) + Math.pow(lng - coords.lng, 2))
    if (dist < minDist) { minDist = dist; nearest = city }
  }
  return nearest
}

export default function Home() {
  const { t } = useLocale()
  const [city, setCity] = useState<string | null>(null)
  const [locationStatus, setLocationStatus] = useState<'detecting' | 'found' | 'manual'>('detecting')
  const [type, setType] = useState('All')
  const [search, setSearch] = useState('')
  const [showCityPicker, setShowCityPicker] = useState(false)
  const [userListings, setUserListings] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('renly_listings') || '[]')
    setUserListings(stored)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => { setCity(getNearestCity(pos.coords.latitude, pos.coords.longitude)); setLocationStatus('found') },
        () => { setCity('Vilnius'); setLocationStatus('manual') },
        { timeout: 5000 }
      )
    } else { setCity('Vilnius'); setLocationStatus('manual') }
  }, [])

  const allBikes = [...defaultBikes, ...userListings.filter((l: any) => !l.paused)]
  const filtered = allBikes.filter(b => {
    const matchCity = b.city === city
    const matchType = type === 'All' || b.type === type
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.location.toLowerCase().includes(search.toLowerCase())
    return matchCity && matchType && matchSearch
  })

  const bikeCountLabel =
    filtered.length === 1
      ? t('home.bikesInCityOne', { city: city ?? '' })
      : t('home.bikesInCityMany', { count: filtered.length, city: city ?? '' })

  return (
    <div className="app-shell">

      <nav className="app-nav flex items-center justify-between px-5 py-4">
        <span className="text-2xl font-bold tracking-tight text-fg">Renly</span>
        <div className="flex gap-3">
          <Link href="/account" className="text-sm px-4 py-2 rounded-full text-muted" style={{ border: '1px solid var(--border)' }}>
            {t('common.account')}
          </Link>
          <Link href="/auth" className="text-sm px-4 py-2 rounded-full font-medium text-fg" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
            {t('common.signUp')}
          </Link>
        </div>
      </nav>

      <div className="app-section px-5 py-4 border-b">
        {locationStatus === 'detecting' ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            <div className="w-3 h-3 rounded-full animate-pulse app-surface"></div>
            {t('home.detectingLocation')}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <div>
                <p className="text-xs text-muted leading-none mb-0.5">
                  {locationStatus === 'found' ? t('home.yourLocation') : t('home.defaultCity')}
                </p>
                <button
                  onClick={() => setShowCityPicker(!showCityPicker)}
                  className="text-base font-semibold text-fg flex items-center gap-1"
                >
                  {city} <span className="text-muted text-sm font-normal">▾</span>
                </button>
              </div>
            </div>
            <Link href="/list" className="text-sm text-muted px-3 py-1.5 rounded-full" style={{ border: '1px solid var(--border)' }}>
              {t('home.listABike')}
            </Link>
          </div>
        )}

        {showCityPicker && (
          <div className="mt-3 flex flex-wrap gap-2">
            {cities.map(c => (
              <button
                key={c}
                onClick={() => { setCity(c); setShowCityPicker(false); setLocationStatus('manual') }}
                className="px-4 py-1.5 rounded-full text-sm"
                style={
                  city === c
                    ? { background: 'var(--accent)', color: 'var(--bg)', border: '1px solid var(--accent)' }
                    : { border: '1px solid var(--border)', color: 'var(--fg-muted)' }
                }
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="app-section px-5 py-3 flex gap-3 items-center border-b">
        <div className="flex-1 flex app-input rounded-xl overflow-hidden">
          <input
            className="flex-1 px-4 py-2.5 text-sm outline-none bg-transparent text-fg placeholder:text-muted"
            placeholder={t('home.searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} className="px-3 text-muted hover:opacity-80 text-lg">×</button>
          )}
        </div>
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="app-input rounded-xl px-3 py-2.5 text-sm outline-none text-fg"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{t(`bikeType.${cat}`)}</option>
          ))}
        </select>
      </div>

      <div className="app-section px-5 py-5">
        {locationStatus === 'detecting' ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="app-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-36 app-surface"></div>
                <div className="p-3">
                  <div className="h-3 app-surface rounded mb-2"></div>
                  <div className="h-3 app-surface rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-muted mb-4">
              {bikeCountLabel}
              {search && t('home.matchingSearch', { search })}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {filtered.map(bike => (
                <Link key={bike.id} href={`/listing/${bike.id}`} className="app-card rounded-2xl overflow-hidden hover:opacity-95 transition-opacity">
                  <div className="h-36 app-surface flex items-center justify-center text-4xl">
                    {emoji[bike.type] || '🚲'}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted mb-0.5">{bike.owner}</p>
                    <p className="text-sm font-semibold text-fg leading-tight mb-1">{bike.name}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted">{bike.location}</span>
                      <span className="text-sm font-bold text-fg">€{bike.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-3xl mb-3">🚲</p>
                <p className="text-muted font-medium mb-1">
                  {search ? t('home.noMatch', { search }) : t('home.noBikesCity', { city: city ?? '' })}
                </p>
                <p className="text-muted text-sm mb-4 opacity-80">
                  {search ? t('home.trySearch') : t('home.beFirst')}
                </p>
                {!search && (
                  <Link href="/list" className="inline-block px-5 py-2.5 text-sm font-medium rounded-full" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
                    {t('home.listYourBike')}
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
