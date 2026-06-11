'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Code2 } from 'lucide-react'

export default function Navbar({ brandName, logo }: { brandName: string; logo?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'glass shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2 group">
            {logo ? (
              <img src={logo} alt={brandName} className="h-8 w-8 rounded-lg" />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#00D9FF] 
                flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#6C63FF]/30 
                transition-shadow duration-300">
                <Code2 className="w-5 h-5 text-white" />
              </div>
            )}
            <span className="text-xl font-bold gradient-text">{brandName}</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#8B949E] hover:text-[#E6EDF3] transition-colors text-sm font-medium
                  relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                  after:bg-gradient-to-r after:from-[#6C63FF] after:to-[#00D9FF]
                  hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                bg-gradient-to-r from-[#6C63FF] to-[#5a52e0]
                hover:from-[#7B73FF] hover:to-[#6C63FF]
                shadow-lg shadow-[#6C63FF]/25 hover:shadow-[#6C63FF]/40
                transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#E6EDF3] p-2 rounded-lg hover:bg-[#1C2333] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 rounded-xl text-[#8B949E] hover:text-[#E6EDF3] 
                    hover:bg-[#1C2333] transition-all text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block mt-2 py-3 px-4 rounded-xl text-center text-sm font-semibold text-white
                  bg-gradient-to-r from-[#6C63FF] to-[#5a52e0] hover:from-[#7B73FF] hover:to-[#6C63FF]
                  transition-all duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
