'use client'

import { useEffect, useState } from 'react'
import { Users, FileText, MessageSquare, Eye, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'
import StatsCard from '@/app/components/StatsCard'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    newContacts: 0,
    totalPages: 0,
    activePages: 0,
  })

  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          totalContacts: data.length,
          newContacts: data.filter((c: any) => c.status === 'new').length,
        }))
      })
      .catch(() => {})
  }, [])

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      icon: MessageSquare,
      color: '#6C63FF',
      bgColor: 'bg-[#6C63FF]/10',
      change: { value: '+12%', type: 'up' as const },
    },
    {
      title: 'New Messages',
      value: stats.newContacts,
      icon: Users,
      color: '#00D9FF',
      bgColor: 'bg-[#00D9FF]/10',
      change: { value: '+5%', type: 'up' as const },
    },
    {
      title: 'Total Pages',
      value: 6,
      icon: FileText,
      color: '#FF6B6B',
      bgColor: 'bg-[#FF6B6B]/10',
      change: { value: 'Active', type: 'neutral' as const },
    },
    {
      title: 'Website Views',
      value: '2.4k',
      icon: Eye,
      color: '#3fb950',
      bgColor: 'bg-[#3fb950]/10',
      change: { value: '+18%', type: 'up' as const },
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-[#8B949E]">Welcome back! Here&apos;s your website overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, i) => (
          <StatsCard key={i} {...card} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="font-semibold mb-4">Recent Contacts</h3>
          <div className="space-y-3">
            {[1,2,3,4].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#1C2333]">
                <div className="w-8 h-8 rounded-full bg-[#6C63FF]/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#6C63FF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-[#8B949E] truncate">Interested in web development services</p>
                </div>
                <span className="badge-success text-xs">New</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="/admin/pages" className="p-4 rounded-lg bg-[#1C2333] border border-[#30363D] hover:border-[#6C63FF] transition-all text-center">
              <FileText className="w-6 h-6 text-[#6C63FF] mx-auto mb-2" />
              <span className="text-sm font-medium">Edit Pages</span>
            </a>
            <a href="/admin/branding" className="p-4 rounded-lg bg-[#1C2333] border border-[#30363D] hover:border-[#6C63FF] transition-all text-center">
              <Palette className="w-6 h-6 text-[#00D9FF] mx-auto mb-2" />
              <span className="text-sm font-medium">Branding</span>
            </a>
            <a href="/admin/contacts" className="p-4 rounded-lg bg-[#1C2333] border border-[#30363D] hover:border-[#6C63FF] transition-all text-center">
              <MessageSquare className="w-6 h-6 text-[#FF6B6B] mx-auto mb-2" />
              <span className="text-sm font-medium">Contacts</span>
            </a>
            <a href="/" target="_blank" className="p-4 rounded-lg bg-[#1C2333] border border-[#30363D] hover:border-[#6C63FF] transition-all text-center">
              <Eye className="w-6 h-6 text-[#3fb950] mx-auto mb-2" />
              <span className="text-sm font-medium">View Site</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
