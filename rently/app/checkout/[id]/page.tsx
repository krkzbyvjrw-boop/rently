'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const bikes = [
  { id: 1, name: 'Trek FX3 City Cruiser', owner: 'Tomas K.', price: 8, type: 'City' },
  { id: 2, name: 'Giant Talon Mountain', owner: 'Rasa M.', price: 12, type: 'Mountain' },
  { id: 3, name: 'Cube Kathmandu E-bike', owner: 'Jonas D.', price: 18, type: 'Electric' },
  { id: 4, name: 'Puky Kids Bike', owner: 'Aistė V.', price: 5, type: 'Kids' },
  { id: 5, name: 'Specialized Sirrus City', owner: 'Mantas P.', price: 10, type: 'City' },
  { id: 6, name: 'Scott Aspect Mountain', owner: 'Eglė S.', price: 14, type: 'Mountain' },
]

const emoji: Record<string, string> = {
  City: '🚲', Mountain: '🚵', Electric: '⚡', Kids: '🛵', Cargo: '📦'
}

export default function CheckoutPage() {
  const { id } = useParams()
  const bike = bikes.find(b => b.id === Number(id))
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  if (!bike) return <div className="p-8 text-gray-400">Bike not found.</div>

  const days = 3
  const total = bike.price * days

  if (sent) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Request sent!</h2>
        <p className="text-gray-400 text-sm mb-6">Tomas K. will get back to you within 1 hour to confirm pickup details.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700">Back to browse</Link>
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

      <div className="max-w-4xl mx-auto px-8 py-10">
        <Link href={`/listing/${bike.id}`} className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">← Back to listing</Link>
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Confirm your request</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div>
            {/* Bike summary */}
            <div className="flex gap-4 items-center bg-gray-50 rounded-xl p-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl border border-gray-100">
                {emoji[bike.type] || '🚲'}
              </div>
              <div>
                <p className="font-medium text-gray-900">{bike.name}</p>
                <p className="text-sm text-gray-400">{bike.owner} · €{bike.price} / day</p>
              </div>
            </div>

            {/* Dates */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Your dates</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">From</p>
                  <p className="text-sm text-gray-700">Jun 3, 2025</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Until</p>
                  <p className="text-sm text-gray-700">Jun 5, 2025</p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Message to owner (optional)</p>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 outline-none resize-none focus:border-gray-400"
                rows={3}
                placeholder="Hi, I'd like to rent your bike..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            {/* How it works */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">How pickup works</p>
              <div className="flex flex-col gap-3">
                {[
                  'You send a request — owner gets notified',
                  'Owner confirms and you agree on pickup time',
                  'Pay cash on pickup, enjoy your ride 🚲'
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center flex-shrink-0">{i + 1}</div>
                    <p className="text-sm text-gray-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSent(true)}
              className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700"
            >
              Send request
            </button>
          </div>

          {/* RIGHT — summary */}
          <div>
            <div className="border border-gray-200 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-900 mb-4">Booking summary</p>
              <div className="flex flex-col gap-3 text-sm text-gray-600 mb-4">
                <div className="flex justify-between"><span>€{bike.price} × {days} days</span><span>€{total}</span></div>
                <div className="flex justify-between text-gray-400 text-xs"><span>Service fee</span><span>€0</span></div>
              </div>
              <hr className="border-gray-100 mb-4" />
              <div className="flex justify-between text-sm font-semibold text-gray-900 mb-2">
                <span>Total</span><span>€{total}</span>
              </div>
              <p className="text-xs text-gray-400">Cash on pickup — no card needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}