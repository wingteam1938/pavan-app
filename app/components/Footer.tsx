import { Code2, Github, Twitter, Linkedin, Heart, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'

export default function Footer({ text, brandName }: { text: string; brandName: string }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    services: ['Web Development', 'UI/UX Design', 'E-Commerce', 'SEO Optimization', 'Mobile Apps'],
    company: ['About Us', 'Portfolio', 'Careers', 'Blog', 'Contact'],
    support: ['FAQ', 'Documentation', 'Support', 'Privacy Policy', 'Terms of Service'],
  }

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="relative bg-[#0B0E14] border-t border-[#30363D] overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-4 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#00D9FF] 
                  flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#6C63FF]/30 
                  transition-shadow duration-300">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">{brandName}</span>
              </a>
              <p className="text-[#8B949E] text-sm leading-relaxed max-w-md mb-6">
                We build digital experiences that help businesses grow and succeed in the modern web landscape. 
                Our team combines creativity with technical excellence to deliver outstanding results.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-[#1C2333] border border-[#30363D] 
                      flex items-center justify-center text-[#8B949E] 
                      hover:text-[#6C63FF] hover:border-[#6C63FF]/50 hover:bg-[#6C63FF]/10
                      transition-all duration-200"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-[#E6EDF3] uppercase tracking-wider mb-4 capitalize">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#8B949E] hover:text-[#6C63FF] transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="py-6 border-t border-[#30363D]">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#6C63FF]/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-[#6C63FF]" />
              </div>
              <div>
                <p className="text-xs text-[#8B949E]">Email</p>
                <a href="mailto:hello@webdevpro.com" className="text-sm font-medium hover:text-[#6C63FF] transition-colors">
                  hello@webdevpro.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#00D9FF]/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-[#00D9FF]" />
              </div>
              <div>
                <p className="text-xs text-[#8B949E]">Phone</p>
                <a href="tel:+14155551234" className="text-sm font-medium hover:text-[#6C63FF] transition-colors">
                  +1 (415) 555-1234
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF6B6B]/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#FF6B6B]" />
              </div>
              <div>
                <p className="text-xs text-[#8B949E]">Location</p>
                <p className="text-sm font-medium">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#30363D] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8B949E]">{text}</p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-[#8B949E] flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-[#FF6B6B] fill-[#FF6B6B]" /> by {brandName}
            </p>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg bg-[#1C2333] border border-[#30363D] 
                flex items-center justify-center text-[#8B949E] 
                hover:text-[#6C63FF] hover:border-[#6C63FF]/50
                transition-all duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
