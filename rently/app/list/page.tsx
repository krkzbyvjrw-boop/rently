'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const tagGroups = [
  {
    label: 'Included',
    tags: ['Helmet', 'Lock', 'Gloves', 'Lights', 'Basket', 'Charger', 'Bag']
  },
  {
    label: 'Features',
    tags: ['Electric assist', 'Disc brakes', 'Front suspension', 'Full suspension', 'Mudguards', 'Kickstand', 'Cargo rack']
  },
  {
    label: 'Suitable for',
    tags: ['City riding', 'Trails', 'Long distance', 'Kids', 'Cargo', 'Commuting']
  }
]

const cities = ['Vilnius', 'Kaunas', 'Panevėžys', 'Klaipėda', 'Šiauliai']
const types = ['City bike', 'Mountain bike', 'Electric', 'Kids', 'Cargo']

export default function ListPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', type: 'City bike', description: '', location: '', city: 'Vilnius', price: ''
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handlePublish = () => {
    if (!form.name || !form.price || !form.location) return alert('Please fill in name, location and price.')
    const existing = JSON.parse(localStorage.getItem('renly_listings') || '[]')
    const newListing = {
      id: Date.now(),
      name: form.name,
      type: form.type,
      description: form.description,
      location: form.location,
      city: form.city,
      price: Number(form.price),
      owner: 'You',
      isOwn: true,
      tags: selectedTags,
    }
    localStorage.setItem('renly_listings', JSON.stringify([...existing, newListing]))
    router.push('/')
  }

  return (
    <div className="app-shell">
      <nav className="flex items-center justify-between px-5 py-4 border-b ">
        <Link href="/" className="text-xl font-bold tracking-tight text-fg">Renly</Link>
        <Link href="/account" className="text-sm px-4 py-2 border border-gray-200 rounded-full text-gray-600">Account</Link>
      </nav>

      <div className="max-w-lg mx-auto px-5 py-8">
        <p className="text-xs text-muted uppercase tracking-widest mb-2">For owners</p>
        <h1 className="text-2xl font-semibold text-fg mb-8">List your bike</h1>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-2">Bike model / name</label>
            <input
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
              placeholder="e.g. Trek FX3 City"
              value={form.name}
              onChange={e => update('name', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-2">Type</label>
            <select
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none bg-transparent"
              value={form.type}
              onChange={e => update('type', e.target.value)}
            >
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-2">City</label>
            <select
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none bg-transparent"
              value={form.city}
              onChange={e => update('city', e.target.value)}
            >
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-2">Neighbourhood / area</label>
            <input
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
              placeholder="e.g. Old Town, Žirmūnai"
              value={form.location}
              onChange={e => update('location', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-2">Description</label>
            <textarea
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none resize-none focus:border-gray-500 bg-transparent"
              rows={3}
              placeholder="Frame size, condition, anything renters should know..."
              value={form.description}
              onChange={e => update('description', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-2">Price per day (€)</label>
            <input
              className="w-32 border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
              type="number"
              placeholder="0"
              value={form.price}
              onChange={e => update('price', e.target.value)}
            />
          </div>

          {/* TAGS */}
          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-4">Details & features</label>
            <div className="flex flex-col gap-5">
              {tagGroups.map(group => (
                <div key={group.label}>
                  <p className="text-xs font-medium text-muted mb-2">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'border-gray-200 text-muted hover:border-gray-400'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <p className="text-xs text-muted mt-3">{selectedTags.length} tag{selectedTags.length > 1 ? 's' : ''} selected</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-muted uppercase tracking-wide mb-2">Photos</label>
            <div className="border border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors">
              <p className="text-sm text-muted">+ Upload photos</p>
              <p className="text-xs text-gray-300 mt-1">Up to 4 photos</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handlePublish}
              className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700"
            >
              Publish listing →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}