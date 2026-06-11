'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, Palette, MessageSquare, Settings,
  LogOut, ChevronLeft, ChevronRight, Menu, X, Globe
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (!auth && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', color: '#6C63FF' },
    { href: '/admin/pages', icon: FileText, label: 'Pages', color: '#00D9FF' },
    { href: '/admin/branding', icon: Palette, label: 'Branding', color: '#FF6B6B' },
    { href: '/admin/contacts', icon: MessageSquare, label: 'Contacts', color: '#3fb950' },
  ]

  return (
    <div className="min-h-screen bg-[#0D1117] flex">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-[#0D1117] border-r border-[#30363D]
        transition-all duration-300 flex flex-col
        ${collapsed ? 'w-20' : 'w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-[#30363D] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#00D9FF] flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-sm">WebDev Pro</h2>
              <p className="text-xs text-[#8B949E]">Admin Panel</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto hidden lg:block text-[#8B949E] hover:text-[#E6EDF3]"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-[#8B949E] ml-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/30' 
                    : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#1C2333]'
                  }
                  ${collapsed ? 'justify-center' : ''}
