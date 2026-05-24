'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <Link href="/" className="text-xl font-semibold tracking-tight">Rently</Link>
      </nav>

      <div className="max-w-sm mx-auto px-8 py-16">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {tab === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          {tab === 'login' ? 'Log in to manage your rentals.' : 'Join Rently and start renting today.'}
        </p>

        {/* TOGGLE */}
        <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-8">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2.5 text-sm font-medium ${tab === 'login' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Log in
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-2.5 text-sm font-medium ${tab === 'signup' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Sign up
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Full name</label>
              <input
                className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
                placeholder="Jonas Daukšas"
                value={form.name}
                onChange={e => update('name', e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Email</label>
            <input
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wide mb-2">Password</label>
            <input
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-800 outline-none focus:border-gray-500 bg-transparent"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => update('password', e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="block w-full text-center py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700"
            >
              {tab === 'login' ? 'Log in' : 'Create account'}
            </Link>
          </div>

          {tab === 'login' && (
            <p className="text-center text-xs text-gray-400 cursor-pointer hover:text-gray-600">Forgot password?</p>
          )}
        </div>
      </div>
    </div>
  )
}