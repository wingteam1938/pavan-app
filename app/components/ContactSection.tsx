'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

interface ContactContent {
  heading?: string
  subheading?: string
  email?: string
  phone?: string
}

export default function ContactSection({ content }: { content: ContactContent }) {
  const heading = content?.heading || "Let's Work Together"
  const subheading = content?.subheading || "Tell us about your project and we'll get back to you within 24 hours"
  const email = content?.email || 'hello@webdevpro.com'
  const phone = content?.phone || '+1 (415) 555-1234'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', company: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (err) {
      console.error('Failed to submit:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <div className="inline-block bg-[#1C2333] border border-[#30363D] rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm text-[#6C63FF]">Get In Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {heading.split(' ').map((word, i) => 
                i === heading.split(' ').length - 1 ? (
                  <span key={i} className="gradient-text"> {word}</span>
                ) : word + ' '
              )}
            </h2>
            <p className="text-lg text-[#8B949E] mb-10">
              {subheading}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#6C63FF]" />
                </div>
                <div>
                  <div className="text-sm text-[#8B949E]">Email</div>
                  <a href={`mailto:${email}`} className="font-medium hover:text-[#6C63FF] transition-colors">{email}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00D9FF]/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#00D9FF]" />
                </div>
                <div>
                  <div className="text-sm text-[#8B949E]">Phone</div>
                  <a href={`tel:${phone}`} className="font-medium hover:text-[#6C63FF] transition-colors">{phone}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B6B]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#FF6B6B]" />
                </div>
                <div>
                  <div className="text-sm text-[#8B949E]">Location</div>
                  <div className="font-medium">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="admin-card">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-[#8B949E]">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#8B949E]">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="admin-input"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#8B949E]">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="admin-input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#8B949E]">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="admin-input"
                      placeholder="+1 (415) 555-1234"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#8B949E]">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="admin-input"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#8B949E]">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="admin-input resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
                >
                  {loading ? (
                    <div className="spinner" />
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
