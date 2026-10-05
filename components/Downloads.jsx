'use client'
import React, { useState } from 'react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const docs = [
  {
    label: 'Brochure',
    icon: (hovered) => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"
        stroke={hovered ? '#ffffff' : '#1a1a1a'}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="13" y="8"  width="38" height="48" rx="2" />
        <line x1="21" y1="22" x2="43" y2="22" />
        <line x1="21" y1="30" x2="43" y2="30" />
        <line x1="21" y1="38" x2="34" y2="38" />
        <rect x="26" y="8"  width="12" height="8" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Cost Sheet',
    icon: (hovered) => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"
        stroke={hovered ? '#ffffff' : '#1a1a1a'}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="10" width="26" height="20" rx="2" />
        <rect x="28" y="32" width="26" height="20" rx="2" />
        <line x1="17" y1="18" x2="30" y2="18" />
        <line x1="17" y1="24" x2="28" y2="24" />
        <line x1="35" y1="40" x2="48" y2="40" />
        <line x1="35" y1="46" x2="46" y2="46" />
        <path d="M36 10 L54 10 L54 28 L44 28" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    label: 'Payment Plan',
    icon: (hovered) => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"
        stroke={hovered ? '#ffffff' : '#1a1a1a'}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8"  y="14" width="48" height="36" rx="3" />
        <line x1="8"  y1="24" x2="56" y2="24" />
        <line x1="20" y1="34" x2="44" y2="34" />
        <line x1="20" y1="40" x2="36" y2="40" />
        <rect x="12" y="28" width="8" height="16" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Site Plan',
    icon: (hovered) => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"
        stroke={hovered ? '#ffffff' : '#1a1a1a'}
        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="10" width="44" height="44" rx="2" />
        <rect x="18" y="18" width="12" height="12" />
        <rect x="34" y="18" width="10" height="12" />
        <rect x="18" y="34" width="10" height="12" />
        <rect x="34" y="34" width="10" height="12" />
        <line x1="10" y1="32" x2="54" y2="32" />
        <line x1="32" y1="10" x2="32" y2="54" />
      </svg>
    ),
  },
]

const DownloadCard = ({ doc, setIsOpen }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '2px',
        border: hovered ? '1px solid #111' : '1px solid #e0e0e0',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.35)' : 'none',
      }}
    >
      {/* Card body */}
      <div style={{
        background: hovered ? '#111111' : '#ffffff',
        padding: '40px 20px 28px',
        textAlign: 'center',
        flex: 1,
        transition: 'background 0.3s',
      }}>
        {/* Icon */}
        <div style={{
          display: 'flex', justifyContent: 'center', marginBottom: '20px',
        }}>
          {doc.icon(hovered)}
        </div>

        {/* Label */}
        <p style={{
          fontFamily: F_JOST, fontWeight: '500', fontSize: '15px',
          color: hovered ? '#ffffff' : '#1a1a1a',
          margin: '0 0 14px', letterSpacing: '0.01em',
          transition: 'color 0.3s',
        }}>
          {doc.label}
        </p>

        {/* Gold underline */}
        <div style={{
          width: '40px', height: '2px',
          background: '#C4952A',
          margin: '0 auto',
          borderRadius: '1px',
        }} />
      </div>

      {/* Download button — always gold, full width */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'block', width: '100%',
          background: '#C4952A', color: '#fff', border: 'none',
          padding: '15px 0',
          fontFamily: F_JOST, fontWeight: '700', fontSize: '13px',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          cursor: 'pointer', transition: 'background 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#9A7518')}
        onMouseLeave={e => (e.currentTarget.style.background = '#C4952A')}
      >
        DOWNLOAD
      </button>
    </div>
  )
}

const Downloads = ({ setIsOpen }) => (
  <section id="downloads" style={{ padding: '72px 0', background: '#111111' }}>
    {/* Truly Full width */}
    <div style={{ width: '100%', padding: '0' }}>

      {/* Heading */}
      <h2
        data-aos="fade-up"
        style={{
          fontFamily: F_JOST, fontWeight: '800',
          fontSize: 'clamp(28px,4vw,40px)',
          color: '#ffffff', textAlign: 'center',
          textTransform: 'uppercase', letterSpacing: '0.04em',
          margin: '0 0 48px',
        }}
      >
        DOWNLOADS
      </h2>

      {/* 4 cards — full width grid with gaps */}
      <div
        style={{ 
          display: 'grid',
          gap: '16px',
          padding: '0 16px' // small edge padding so it's not literally touching the screen edge
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        data-aos="fade-up"
      >
        {docs.map((doc, i) => (
          <DownloadCard key={i} doc={doc} setIsOpen={setIsOpen} />
        ))}
      </div>

    </div>
  </section>
)

export default Downloads
