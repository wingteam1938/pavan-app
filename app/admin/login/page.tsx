'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Code2, Eye, EyeOff, LogIn } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple auth check (in production use next-auth)
    if (form.username === 'admin' && form.password === 'Admin@123') {
      localStorage.setItem('admin_auth', 'true')
      router.push('/admin')
    } else {
      setError('Invalid credentials')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#00D9FF] flex items-center justify-center mx-auto mb-4">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
          <p className="text-[#8B949E] mt-2">Sign in to manage your website</p>
        </div>

        {/* Login Form */}
        <div className="admin-card">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-[#8B949E]">Username</label>
              <input
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm({...form, username: e.target.value})}
                className="admin-input"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#8B949E]">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  className="admin-input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-[#E6EDF3]"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="spinner" />
              ) : (
                <>Sign In <LogIn className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
