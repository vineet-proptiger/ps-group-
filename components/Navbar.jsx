'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { logoImages } from '../lib/images'

const navLinks = [
  { name: 'OVERVIEW',    href: '#overview', active: true },
  { name: 'HIGHLIGHTS',  href: '#highlights' },
  { name: 'GALLERY',     href: '#gallery' },
  { name: 'PRICE LIST',  href: '#pricing' },
  { name: 'AMENITIES',   href: '#amenities' },
  // { name: 'LOCATION',    href: '#location' },
  { name: 'MASTER & FLOOR PLAN', href: '#masterplan' },
]

const Navbar = ({ setIsOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out py-1.5 md:py-2 ${
        isScrolled ? 'translate-y-0' : 'translate-y-0'
      }`}
      style={{
        background: '#ffffff',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
      }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="flex items-center justify-between h-[55px] md:h-[65px]">

          {/* Logo (Left Side) */}
          <a href="#home" className="flex items-center shrink-0">
            <img
              src={logoImages.main}
              alt="Upcoming New Launch Projects in Newtown "
              style={{ height: 'clamp(42px, 6vw, 56px)', width: 'auto', objectFit: 'contain' }}
            />
          </a>

          {/* Desktop Nav Links (Center/Right) */}
          <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1 ml-4 xl:ml-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontSize: '15px',
                  fontWeight: link.active ? '700' : '600',
                  color: link.active ? '#d49500' : '#2d3748',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => {
                  if (!link.active) e.target.style.color = '#d49500'
                }}
                onMouseLeave={e => {
                  if (!link.active) e.target.style.color = '#2d3748'
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Button — Desktop (Right Side) */}
          <div className="hidden lg:flex items-center shrink-0 ml-4">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-[50px] font-bold text-[15px] transition-all duration-300 whitespace-nowrap cursor-pointer"
              style={{
                background: '#f5b800',
                color: '#111111',
                border: '2px solid #f5b800',
                boxShadow: '0 4px 14px 0 rgba(245, 184, 0, 0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#111111';
                e.currentTarget.style.color = '#fed215';
                e.currentTarget.style.borderColor = '#111111';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#f5b800';
                e.currentTarget.style.color = '#111111';
                e.currentTarget.style.borderColor = '#f5b800';
                e.currentTarget.style.transform = 'none';
              }}
            >
              Book Site Visit
            </button>
          </div>

          {/* Mobile hamburger - Hidden on Desktop (lg) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: '#2d3748', padding: '4px', background: 'none', border: 'none' }}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={32} strokeWidth={2} /> : <Menu size={32} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: '#ffffff',
          borderTop: '1px solid rgba(0,0,0,0.05)',
          fontFamily: 'var(--font-poppins), Poppins, sans-serif'
        }}>
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '14px 24px',
                fontSize: '15px',
                fontWeight: link.active ? '700' : '600',
                color: link.active ? '#d49500' : '#2d3748',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.02)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              {link.name}
            </a>
          ))}
          <div style={{ padding: '16px 24px' }}>
            <button
              onClick={() => { setIsOpen(true); setMobileOpen(false) }}
              className="w-full py-3.5 px-4 rounded-[50px] font-bold text-[15px] transition-all duration-300 cursor-pointer"
              style={{ background: '#f5b800', color: '#111111', border: '2px solid #f5b800', boxShadow: '0 4px 14px 0 rgba(245, 184, 0, 0.4)' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#111111';
                e.currentTarget.style.color = '#fed215';
                e.currentTarget.style.borderColor = '#111111';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#f5b800';
                e.currentTarget.style.color = '#111111';
                e.currentTarget.style.borderColor = '#f5b800';
              }}
            >
              Book Site Visit
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
