'use client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const defaultBikes = [
  { id: 1, name: 'Trek FX3 City Cruiser', owner: 'Tomas K.', initials: 'TK', location: 'Vilnius centre, ~500m from Cathedral', price: 8, type: 'City bike', desc: 'Lightweight aluminium frame, 7-speed Shimano gears. Helmet and lock included. Pick up in person.', tags: ['Helmet', 'Lock', '7-speed', 'City riding'] },
  { id: 2, name: 'Giant Talon Mountain', owner: 'Rasa M.', initials: 'RM', location: 'Žirmūnai, Vilnius', price: 12, type: 'Mountain bike', desc: 'Full suspension mountain bike, great for trails and forest paths. Gloves included.', tags: ['Gloves', 'Full suspension', 'Trails'] },
  { id: 3, name: 'Cube Kathmandu E-bike', owner: 'Jonas D.', initials: 'JD', location: 'Panevėžys centre', price: 18, type: 'Electric', desc: 'Electric bike with 70km range per charge. Perfect for longer rides around the city.', tags: ['Charger', 'Electric assist', 'City riding'] },
  { id: 4, name: 'Puky Kids Bike', owner: 'Aistė V.', initials: 'AV', location: 'Antakalnis, Vilnius', price: 5, type: 'Kids', desc: 'Perfect kids bike for ages 4-7. Very safe, with stabilisers available on request.', tags: ['Helmet', 'Kids'] },
  { id: 5, name: 'Specialized Sirrus', owner: 'Mantas P.', initials: 'MP', location: 'Kaunas centre', price: 10, type: 'City bike', desc: 'Fast and light city bike. Great for commuting or exploring the city.', tags: ['Lock', 'Commuting', 'City riding'] },
  { id: 6, name: 'Scott Aspect Mountain', owner: 'Eglė S.', initials: 'ES', location: 'Šiauliai', price: 14, type: 'Mountain bike', desc: 'Sturdy mountain bike for off-road adventures. Front suspension, disc brakes.', tags: ['Disc brakes', 'Front suspension', 'Trails'] },
  { id: 7, name: 'Cannondale Quick City', owner: 'Lukas B.', initials: 'LB', location: 'Aleksotas, Kaunas', price: 9, type: 'City bike', desc: 'Lightweight city bike, perfect for daily commuting.', tags: ['Lock', 'Commuting'] },
  { id: 8, name: 'Bosch E-bike Pro', owner: 'Indrė T.', initials: 'IT', location: 'Lazdynai, Vilnius', price: 20, type: 'Electric', desc: 'Premium e-bike with Bosch motor. Range up to 100km. Very comfortable.', tags: ['Charger', 'Electric assist', 'Long distance'] },
  { id: 9, name: 'Trek Marlin Mountain', owner: 'Artūras K.', initials: 'AK', location: 'Klaipėda centre', price: 13, type: 'Mountain bike', desc: 'Great entry level mountain bike. Good for forest trails and gravel paths.', tags: ['Front suspension', 'Trails'] },
  { id: 10, name: 'Cargo Family Bike', owner: 'Simona R.', initials: 'SR', location: 'Naujamiestis, Vilnius', price: 15, type: 'Cargo', desc: 'Large cargo bike perfect for carrying kids or shopping. Very stable.', tags: ['Cargo', 'Cargo rack'] },
  { id: 11, name: 'Kids Balance Bike', owner: 'Paulius M.', initials: 'PM', location: 'Šilainiai, Kaunas', price: 4, type: 'Kids', desc: 'Balance bike for toddlers age 2-4. Lightweight and easy to handle.', tags: ['Kids', 'Helmet'] },
  { id: 12, name: 'Giant Escape City', owner: 'Viktorija L.', initials: 'VL', location: 'Smiltynė, Klaipėda', price: 11, type: 'City bike', desc: 'Perfect city bike for coastal rides. Comfortable and fast.', tags: ['Lock', 'City riding'] },
  { id: 13, name: 'Specialized Turbo E-bike', owner: 'Darius N.', initials: 'DN', location: 'Senvagė, Panevėžys', price: 22, type: 'Electric', desc: 'High-end e-bike with turbo mode. Great for longer commutes.', tags: ['Charger', 'Electric assist', 'Long distance'] },
  { id: 14, name: 'Scott Scale Mountain', owner: 'Gabija P.', initials: 'GP', location: 'Gubernija, Šiauliai', price: 16, type: 'Mountain bike', desc: 'Lightweight mountain bike for serious trail riding.', tags: ['Disc brakes', 'Trails'] },
  { id: 15, name: 'Urban Arrow Cargo', owner: 'Tadas V.', initials: 'TV', location: 'Užupis, Vilnius', price: 17, type: 'Cargo', desc: 'Electric cargo bike. Carries up to 100kg. Great for deliveries or family trips.', tags: ['Electric assist', 'Cargo', 'Charger'] },
]

const emoji: Record<string, string> = {
  'City bike': '🚲', 'Mountain bike': '🚵', Electric: '⚡', Kids: '🛵', Cargo: '📦'
}

export default function ListingPage() {
  const { id } = useParams()
  const router = useRouter()
  const [bike, setBike] = useState<any>(null)
  const [isOwn, setIsOwn] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState<any>({})

  useEffect(() => {
    const numId = Number(id)
    const found = defaultBikes.find(b => b.id === numId)
    if (found) {
      setBike(found)
      setIsOwn(false)
    } else {
      const userListings = JSON.parse(localStorage.getItem('Renly_listings') || '[]')
      const userBike = userListings.find((b: any) => b.id === numId)
      if (userBike) {
        setBike({ ...userBike, initials: 'ME', desc: userBike.description || 'No description.', tags: userBike.tags || [] })
        setEditForm(userBike)
        setIsOwn(true)
      }
    }
  }, [id])

  const handleSave = () => {
    const userListings = JSON.parse(localStorage.getItem('Renly_listings') || '[]')
    const updated = userListings.map((b: any) => b.id === editForm.id ? { ...editForm } : b)
    localStorage.setItem('Renly_listings', JSON.stringify(updated))
    setBike({ ...editForm, initials: 'ME', desc: editForm.description || 'No description.', tags: editForm.tags || [] })
    setEditing(false)
  }

  const handleDelete = () => {
    if (!confirm('Delete this listing?')) return
    const userListings = JSON.parse(localStorage.getItem('Renly_listings') || '[]')
    const updated = userListings.filter((b: any) => b.id !== bike.id)
    localStorage.setItem('Renly_listings', JSON.stringify(updated))
    router.push('/')
  }

  if (!bike) {
    return (
      <div className="app-shell flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <nav className="app-nav flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-fg">Renly</Link>
        <div className="flex gap-3">
          <Link href="/account" className="text-sm px-4 py-2 rounded-full text-muted" style={{ border: '1px solid var(--border)' }}>Account</Link>
          <Link href="/auth" className="text-sm px-4 py-2 rounded-full font-medium" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>Sign up</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-5 py-8">
        <Link href="/" className="text-sm text-muted mb-6 inline-block">← Back to browse</Link>

        {isOwn && !editing && (
          <div className="app-card rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-fg">This is your listing</p>
              <p className="text-xs text-muted">This is how renters see it</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(true)} className="text-sm px-4 py-2 rounded-lg text-muted" style={{ border: '1px solid var(--border)' }}>Edit</button>
              <button onClick={handleDelete} className="text-sm px-4 py-2 rounded-lg" style={{ border: '1px solid #fca5a5', color: '#ef4444' }}>Delete</button>
            </div>
          </div>
        )}

        {isOwn && editing && (
          <div className="app-card rounded-xl p-5 mb-6">
            <p className="text-sm font-medium text-fg mb-4">Edit listing</p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-muted uppercase tracking-wide mb-1">Name</label>
                <input className="w-full py-2 text-sm text-fg outline-none bg-transparent" style={{ borderBottom: '1px solid var(--border)' }} value={editForm.name || ''} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-muted uppercase tracking-wide mb-1">Location</label>
                <input className="w-full py-2 text-sm text-fg outline-none bg-transparent" style={{ borderBottom: '1px solid var(--border)' }} value={editForm.location || ''} onChange={e => setEditForm({ ...editForm, location: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-muted uppercase tracking-wide mb-1">Price per day (€)</label>
                <input type="number" className="w-32 py-2 text-sm text-fg outline-none bg-transparent" style={{ borderBottom: '1px solid var(--border)' }} value={editForm.price || ''} onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-xs text-muted uppercase tracking-wide mb-1">Description</label>
                <textarea className="w-full py-2 text-sm text-fg outline-none bg-transparent resize-none" style={{ borderBottom: '1px solid var(--border)' }} rows={3} value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="px-5 py-2 text-sm rounded-lg font-medium" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>Save</button>
                <button onClick={() => setEditing(false)} className="px-5 py-2 text-sm rounded-lg text-muted" style={{ border: '1px solid var(--border)' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="h-64 rounded-2xl flex items-center justify-center text-8xl mb-6 app-surface" style={{ border: '1px solid var(--border)' }}>
          {emoji[bike.type] || '🚲'}
        </div>

        <p className="text-xs text-muted uppercase tracking-wide mb-1">{bike.type} · {bike.location}</p>
        <h1 className="text-2xl font-semibold text-fg mb-2">{bike.name}</h1>
        <p className="text-sm text-muted leading-relaxed mb-4">{bike.desc}</p>

        {bike.tags && bike.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {bike.tags.map((tag: string) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full text-muted" style={{ border: '1px solid var(--border)' }}>{tag}</span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 py-4 mb-6" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="w-10 h-10 rounded-full app-surface flex items-center justify-center text-sm font-medium text-fg">
            {bike.initials || '?'}
          </div>
          <div>
            <p className="text-sm font-medium text-fg">{bike.owner}</p>
            <p className="text-xs text-muted">Usually replies within 1 hour</p>
          </div>
        </div>

        {!isOwn && (
          <div className="app-card rounded-2xl p-5">
            <p className="text-2xl font-semibold text-fg mb-1">
              €{bike.price} <span className="text-sm font-normal text-muted">/ day</span>
            </p>
            <div className="my-4" style={{ borderTop: '1px solid var(--border)' }}></div>
            <p className="text-xs text-muted uppercase tracking-wide mb-2">Select dates</p>
            <div className="grid grid-cols-2 rounded-lg overflow-hidden mb-4" style={{ border: '1px solid var(--border)' }}>
              <div className="p-3" style={{ borderRight: '1px solid var(--border)' }}>
                <p className="text-xs text-muted mb-1">From</p>
                <input type="date" className="text-sm text-fg outline-none w-full bg-transparent" />
              </div>
              <div className="p-3">
                <p className="text-xs text-muted mb-1">Until</p>
                <input type="date" className="text-sm text-fg outline-none w-full bg-transparent" />
              </div>
            </div>
            <Link href={`/checkout/${bike.id}`} className="block w-full text-center py-3 text-sm font-medium rounded-xl mb-2" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
              Request to rent →
            </Link>
            <p className="text-xs text-center text-muted">Cash on pickup · No card needed</p>
          </div>
        )}
      </div>
    </div>
  )
}