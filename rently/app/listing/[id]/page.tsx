'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const bikes = [
  { id: 1, name: 'Trek FX3 City Cruiser', owner: 'Tomas K.', initials: 'TK', location: 'Vilnius centre, ~500m from Cathedral', price: 8, type: 'City', desc: 'Lightweight aluminium frame, 7-speed Shimano gears. Helmet and lock included. Pick up in person.', tags: ['Helmet included', 'Lock included', '7-speed', 'City & trail'] },
  { id: 2, name: 'Giant Talon Mountain', owner: 'Rasa M.', initials: 'RM', location: 'Žirmūnai, Vilnius', price: 12, type: 'Mountain', desc: 'Full suspension mountain bike, great for trails and forest paths. Gloves included.', tags: ['Gloves included', 'Full suspension', '21-speed'] },
  { id: 3, name: 'Cube Kathmandu E-bike', owner: 'Jonas D.', initials: 'JD', location: 'Panevėžys centre', price: 18, type: 'Electric', desc: 'Electric bike with 70km range per charge. Perfect for longer rides around the city.', tags: ['70km range', 'Charger included', 'City & trail'] },
  { id: 4, name: 'Puky Kids Bike', owner: 'Aistė V.', initials: 'AV', location: 'Antakalnis, Vilnius', price: 5, type: 'Kids', desc: 'Perfect kids bike for ages 4-7. Very safe, with stabilisers available on request.', tags: ['Ages 4-7', 'Stabilisers available', 'Helmet included'] },
  { id: 5, name: 'Specialized Sirrus City', owner: 'Mantas P.', initials: 'MP', location: 'Kaunas centre', price: 10, type: 'City', desc: 'Fast and light city bike. Great for commuting or exploring the city.', tags: ['Lightweight', 'Lock included', '8-speed'] },
  { id: 6, name: 'Scott Aspect Mountain', owner: 'Eglė S.', initials: 'ES', location: 'Šiauliai', price: 14, type: 'Mountain', desc: 'Sturdy mountain bike for off-road adventures. Front suspension, disc brakes.', tags: ['Disc brakes', 'Front suspension', '24-speed'] },
]

const emoji: Record<string, string> = {
  City: '🚲', Mountain: '🚵', Electric: '⚡', Kids: '🛵', Cargo: '📦'
}

export default function ListingPage() {
  const { id } = useParams()
  const bike = bikes.find(b => b.id === Number(id))

  if (!bike) return <div className="p-8 text-gray-400">Bike not found.</div>

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

      <div className="max-w-5xl mx-auto px-8 py-10">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">← Back to browse</Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div>
            <div className="h-72 bg-gray-50 rounded-xl flex items-center justify-center text-8xl mb-4 border border-gray-100">
              {emoji[bike.type] || '🚲'}
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{bike.type} bike · {bike.location}</p>
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">{bike.name}</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">{bike.desc}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {bike.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 border border-gray-200 rounded-full text-gray-500">{tag}</span>
              ))}
            </div>

            {/* OWNER */}
            <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                {bike.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{bike.owner}</p>
                <p className="text-xs text-gray-400">Usually replies within 1 hour</p>
              </div>
            </div>
          </div>

          {/* RIGHT — BOOKING BOX */}
          <div>
            <div className="border border-gray-200 rounded-xl p-6 sticky top-8">
              <p className="text-3xl font-semibold text-gray-900 mb-1">€{bike.price} <span className="text-base font-normal text-gray-400">/ day</span></p>
              <hr className="my-4 border-gray-100" />
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Select dates</p>
              <div className="grid grid-cols-2 border border-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="p-3 border-r border-gray-200">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">From</p>
                  <input type="date" className="text-sm text-gray-700 outline-none w-full" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Until</p>
                  <input type="date" className="text-sm text-gray-700 outline-none w-full" />
                </div>
              </div>
              <Link href={`/checkout/${bike.id}`} className="block w-full text-center py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 mb-3">
                Request to rent →
              </Link>
              <p className="text-xs text-center text-gray-400">Cash on pickup · No card needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}