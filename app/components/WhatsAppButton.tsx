'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [number, setNumber] = useState('14155551234')
  const [message, setMessage] = useState('Hi! I need a website for my business.')
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    // Fetch WhatsApp settings from API
    fetch('/api/settings?keys=whatsapp_number,whatsapp_message')
      .then(res => res.json())
      .then(data => {
        if (data.whatsapp_number) setNumber(data.whatsapp_number)
        if (data.whatsapp_message) setMessage(data.whatsapp_message)
      })
      .catch(() => {})
  }, [])

  const openWhatsApp = (msg?: string) => {
    const text = encodeURIComponent(msg || message)
    window.open(`https://wa.me/${number}?text=${text}`, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <div className="animate-slide-up mb-4 bg-[#161B22] border border-[#30363D] rounded-2xl shadow-2xl w-80 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#6C63FF] to-[#00D9FF] p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">WebDev Pro</h3>
              <p className="text-white/70 text-xs">Typically replies instantly</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3">
            <div className="bg-[#1C2333] rounded-lg p-3 max-w-[80%]">
              <p className="text-sm text-[#E6EDF3]">
                👋 Hi there! Want a stunning website for your business? Drop us a message!
              </p>
            </div>
          </div>

          {/* Quick Replies */}
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            <button 
              onClick={() => openWhatsApp('Hi! I need a website for my business.')}
              className="text-xs bg-[#1C2333] text-[#6C63FF] border border-[#30363D] rounded-full px-3 py-1.5 hover:bg-[#6C63FF] hover:text-white transition-all"
            >
              💼 Get a Quote
            </button>
            <button 
              onClick={() => openWhatsApp('Can you show me your portfolio?')}
              className="text-xs bg-[#1C2333] text-[#6C63FF] border border-[#30363D] rounded-full px-3 py-1.5 hover:bg-[#6C63FF] hover:text-white transition-all"
            >
              🎨 Portfolio
            </button>
            <button 
              onClick={() => openWhatsApp('I need support for my existing website.')}
              className="text-xs bg-[#1C2333] text-[#6C63FF] border border-[#30363D] rounded-full px-3 py-1.5 hover:bg-[#6C63FF] hover:text-white transition-all"
            >
              🛠️ Support
            </button>
          </div>

          {/* Input */}
          <div className="border-t border-[#30363D] p-3 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputMessage) {
                  openWhatsApp(inputMessage)
                  setInputMessage('')
                }
              }}
              className="flex-1 bg-[#0D1117] border border-[#30363D] rounded-lg px-3 py-2 text-sm text-[#E6EDF3] focus:outline-none focus:border-[#6C63FF]"
            />
            <button
              onClick={() => {
                if (inputMessage) {
                  openWhatsApp(inputMessage)
                  setInputMessage('')
                }
              }}
              className="bg-[#6C63FF] text-white p-2 rounded-lg hover:bg-[#5a52e0] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full shadow-2xl flex items-center justify-center
          transition-all duration-300 animate-glow
          ${isOpen 
            ? 'bg-[#FF6B6B] rotate-45' 
            : 'bg-gradient-to-r from-[#6C63FF] to-[#00D9FF]'
          }
        `}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  )
}
