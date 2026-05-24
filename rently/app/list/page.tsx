'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function ListPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', type: 'City', description: '', location: '', price: ''
  })

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  if (submitted) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Listing published!</h2>
        <p className="text-gray-400 text-sm mb-6">Your bike is now live and renters can find it.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="inline-block px-5 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700">Browse bikes</Link>
          <Link href="/account" className="inline-block px-5 py-2.5 border border-gray-200 text-gray-600 text-sm rounded-lg hover:border-gray-400">My account</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <Link href="/" className="text-xl font-semibold tracking-tight">Rently</Link>
        <div className="flex gap-3">
          <Link href="/account" className="text-sm px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:border-gray-400">My account</Link>
          <Link href="/auth" className="text-sm px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700">Sign up</Link>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-8 py-10">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">For owners</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">List your bike</h1>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Bike model / name</label>
            <input
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
              placeholder="e.g. Trek FX3 City"
              value={form.name}
              onChange={e => update('name', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Type</label>
            <select
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none bg-transparent"
              value={form.type}
              onChange={e => update('type', e.target.value)}
            >
              <option>City</option>
              <option>Mountain</option>
              <option>Electric</option>
              <option>Kids</option>
              <option>Cargo</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Description</label>
            <textarea
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none resize-none focus:border-gray-500 bg-transparent"
              rows={3}
              placeholder="Frame size, gears, condition, what's included..."
              value={form.description}
              onChange={e => update('description', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Location</label>
            <input
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
              placeholder="e.g. Vilnius, Žirmūnai"
              value={form.location}
              onChange={e => update('location', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Price per day (€)</label>
            <input
              className="w-32 border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
              type="number"
              placeholder="0"
              value={form.price}
              onChange={e => update('price', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Photos</label>
            <div className="border border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors">
              <p className="text-sm text-gray-400">+ Upload photos</p>
              <p className="text-xs text-gray-300 mt-1">Up to 4 photos</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setSubmitted(true)}
              className="px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700"
            >
              Publish listing →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}