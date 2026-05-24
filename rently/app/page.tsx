'use client'
import { useState } from 'react'
import Link from 'next/link'

const bikes = [
  { id: 1, name: 'Trek FX3 City Cruiser', owner: 'Tomas K.', location: 'Vilnius centre', price: 8, type: 'City' },
  { id: 2, name: 'Giant Talon Mountain', owner: 'Rasa M.', location: 'Žirmūnai', price: 12, type: 'Mountain' },
  { id: 3, name: 'Cube Kathmandu E-bike', owner: 'Jonas D.', location: 'Panevėžys', price: 18, type: 'Electric' },
  { id: 4, name: 'Puky Kids Bike', owner: 'Aistė V.', location: 'Antakalnis', price: 5, type: 'Kids' },
  { id: 5, name: 'Specialized Sirrus City', owner: 'Mantas P.', location: 'Kaunas', price: 10, type: 'City' },
  { id: 6, name: 'Scott Aspect Mountain', owner: 'Eglė S.', location: 'Šiauliai', price: 14, type: 'Mountain' },
]

const categories = ['All', 'City', 'Mountain', 'Electric', 'Kids', 'Cargo']

const emoji: Record<string, string> = {
  City: '🚲', Mountain: '🚵', Electric: '⚡', Kids: '🛵', Cargo: '📦'
}

export default function Home() {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = bikes.filter(b => {
    const matchCat = active === 'All' || b.type === active
    const matchSearch = b.location.toLowerCase().includes(search.toLowerCase()) || b.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <span className="text-xl font-semibold tracking-tight">Rently</span>
        <div className="flex gap-3">
          <Link href="/account" className="text-sm px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:border-gray-400">My account</Link>
          <Link href="/list" className="text-sm px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:border-gray-400">List a bike</Link>
          <Link href="/auth" className="text-sm px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700">Sign up</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="bg-gray-50 px-8 py-14 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-3">Rent a bike from a neighbour</h1>
        <p className="text-gray-500 mb-6 text-sm">Find bikes near you, by the day. No shops, no queues.</p>
        <div className="flex max-w-md mx-auto border border-gray-200 rounded-lg overflow-hidden bg-white">
          <input
            className="flex-1 px-4 py-3 text-sm outline-none"
            placeholder="Search by location or bike..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="px-5 py-3 bg-gray-900 text-white text-sm font-medium">Search</button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="px-8 py-4 flex gap-2 border-b border-gray-100 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm border whitespace-nowrap ${active === cat ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="px-8 py-8">
        <p className="text-sm text-gray-400 mb-5">{filtered.length} bikes available</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(bike => (
            <Link key={bike.id} href={`/listing/${bike.id}`} className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
              <div className="h-44 bg-gray-50 flex items-center justify-center text-5xl">
                {emoji[bike.type] || '🚲'}
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{bike.owner}</p>
                <p className="font-medium text-gray-900 mb-2">{bike.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{bike.location}</span>
                  <span className="text-sm font-medium text-gray-900">€{bike.price} <span className="font-normal text-gray-400">/ day</span></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}