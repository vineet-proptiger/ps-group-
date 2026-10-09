'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { buildTrackingFields } from '../lib/formMeta'

const GOLD = 'var(--color-gold)'
const GOLD_DARK = 'var(--color-gold-dark)'
const PRIMARY = 'var(--color-primary)'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const ContactForm = () => {
  const [form, setForm] = useState({ fullname: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handle = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'phone' ? value.replace(/\D/g, '') : value })
  }

  const submit = async (e) => {
    e.preventDefault()
    if (form.phone.length !== 10) { setError('Enter valid 10-digit number'); return }
    if (!/^[6-9]\d{9}$/.test(form.phone)) { setError('Phone number must start with 6, 7, 8, or 9'); return }
    setError(''); setLoading(true)
    const tracking = buildTrackingFields()
    const payload = new FormData()
    payload.append('fullname', form.fullname)
    payload.append('phone', form.phone)
    payload.append('email', form.email || '')
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', 'Developer Section Form')
    payload.append('sheet_name', SHEET_NAME)
    payload.append('secret', SECRET_KEY)
    payload.append('city', CITY_DISPLAY)
    Object.entries(tracking).forEach(([k, v]) => payload.append(k, v))
    try {
      const res = await fetch(API_ENDPOINT, { method: 'POST', body: payload })
      const data = await res.json()
      if (data.status) {
        setSuccess(true)
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || []
          const nameParts = form.fullname.trim().split(' ')
          window.dataLayer.push({
            event: 'lead_submit_success', form_name: 'Developer Section Form',
            user_data: {
              email: form.email.trim() || undefined, phone: `+91${form.phone}`,
              first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || ''
            }
          })
        }
      } else setError(data.msg || 'Something went wrong.')
    } catch { setError('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  if (success) return (
    <div style={{ padding: '40px 0', textAlign: 'center' }}>
      <div style={{
        width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-gold-bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'
      }}>
        <svg width="28" height="28" fill="none" stroke={GOLD_DARK} strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p style={{ fontWeight: '700', fontSize: '18px', color: 'var(--color-text)', fontFamily: F_SANS }}>Thank You!</p>
      <p style={{ color: '#666', fontSize: '14px', marginTop: '6px', fontFamily: F_SANS }}>Our team will contact you shortly.</p>
    </div>
  )

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div>
        <label style={{
          display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280',
          fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
        }}>Full Name <span style={{ color: GOLD }}>*</span></label>
        <input name="fullname" required value={form.fullname} onChange={handle} placeholder="Enter full name"
          className="form-input" style={{ fontFamily: F_SANS, width: '100%' }} />
      </div>

      <div>
        <label style={{
          display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280',
          fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
        }}>Email Address</label>
        <input name="email" value={form.email} onChange={handle} placeholder="Email Id (optional)"
          className="form-input" style={{ fontFamily: F_SANS, width: '100%' }} />
      </div>

      <div>
        <label style={{
          display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280',
          fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
        }}>Mobile Number <span style={{ color: GOLD }}>*</span></label>
        <input name="phone" required value={form.phone} onChange={handle}
          placeholder="10-digit mobile number" maxLength={10}
          className="form-input" style={{ fontFamily: F_SANS, width: '100%' }} />
      </div>

      {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
        <input type="checkbox" required defaultChecked style={{ accentColor: '#f5b800', marginTop: '2px', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: '#777', fontFamily: F_SANS, lineHeight: 1.5 }}>
          I agree to receive updates as per the <Link href="/privacy-policy" style={{ color: '#2563eb', textDecoration: 'underline' }}>Privacy Policy</Link>.
        </span>
      </label>

      <button type="submit" disabled={loading}
        className="btn-gold w-full"
        style={{ padding: '14px', marginTop: '4px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        {loading ? 'Submitting...' : 'Submit Details'}
      </button>
    </form>
  )
}

const AboutDeveloper = ({ setIsOpen }) => (
  <section id="developer" className="py-10 sm:py-14 bg-[var(--color-bg-muted)] border-b border-gray-100">
    <div className="container mx-auto px-4 md:px-8">

      {/* Heading */}
      <div className="text-center mb-10" data-aos="fade-up">
        <span style={{
          display: 'inline-block', padding: '4px 16px',
          background: 'var(--color-gold-bg)', borderRadius: '50px',
          fontSize: '11px', fontWeight: '700', color: 'var(--color-gold)',
          fontFamily: F_JOST, letterSpacing: '0.1em', textTransform: 'uppercase',
          border: '1px solid var(--color-gold-light)', marginBottom: '10px',
        }}>Developer Profile</span>
        <h2 style={{
          fontFamily: F_JOST, fontWeight: '800', fontSize: '26px',
          color: PRIMARY, margin: '0 0 8px', letterSpacing: '-0.01em',
          textTransform: 'uppercase'
        }}>
          About the Developer
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <span style={{
            display: 'block', width: '40px', height: '3px',
            background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
            borderRadius: '2px',
          }} />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">

        {/* Left — Developer Info Card */}
        <div style={{
          background: '#fff',
          display: 'flex', flexDirection: 'column', height: '100%',
          borderRadius: '16px', overflow: 'hidden',
          boxShadow: '0 4px 24px var(--color-shadow-card)',
          border: '1px solid var(--color-gold-light)',
        }} data-aos="fade-right" data-aos-delay="100">

          {/* Dark Header */}
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
            padding: '18px 24px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontFamily: F_JOST, fontWeight: '800', fontSize: '18px', color: '#fff', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                  The Developer
                </h3>

              </div>
            </div>
          </div>

          {/* White Body */}
          <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p className='text-justify' style={{ color: '#555', fontFamily: F_SANS, lineHeight: 1.85, fontSize: '14px', margin: '0 0 20px' }}>
              The developer brings its legacy of excellence to Kolkata, with a premium residential development spanning 22 acres. The project reflects decades of expertise, trust, and uncompromising quality.
              <br /><br />
              Planned with extensive green areas and a modern architectural design, it offers thoughtfully designed high-rise residences, refined architecture, and contemporary living spaces. With a commitment to transparency, engineering brilliance, and rapid execution, the developer creates iconic developments that elevate modern lifestyles.
              <br /><br />
              At the heart of every project lies a dedicated focus on customer centricity, architectural perfection, and sustainable luxury living — delivering spaces that inspire life, community, and enduring value.
            </p>

            {/* Stats */}
            {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '22px' }}>
              {[
                { value: '15+', label: 'Years of Experience' },
                { value: '20+', label: 'Projects Delivered' },
                { value: '10000+', label: 'Happy Families' },
              ].map((stat, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: '14px 8px',
                  background: 'var(--color-bg-muted)',
                  borderRadius: '10px',
                  border: '1px solid var(--color-gold-light)',
                }}>
                  <p style={{ fontSize: '22px', fontWeight: '800', color: GOLD_DARK, fontFamily: F_JOST, margin: 0 }}>{stat.value}</p>
                  <p style={{ fontSize: '10px', color: '#888', fontFamily: F_SANS, marginTop: '4px', fontWeight: '600', textTransform: 'uppercase', lineHeight: 1.3 }}>{stat.label}</p>
                </div>
              ))}
            </div> */}

            <button onClick={() => setIsOpen(true)}
              className="btn-gold"
              style={{ padding: '11px 28px', fontSize: '13px', width: '100%' }}>
              Know More
            </button>
          </div>
        </div>

        {/* Right — Contact Form */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 4px 24px var(--color-shadow-card)',
          border: '1px solid var(--color-gold-light)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column', height: '100%',
        }} data-aos="fade-left" data-aos-delay="200">

          {/* Form Header */}
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
            padding: '18px 24px', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
            }} />
            <h3 style={{
              fontFamily: F_JOST, fontWeight: '800', fontSize: '18px',
              color: '#fff', margin: '0 0 4px', letterSpacing: '-0.01em'
            }}>
              Book Site Visit Today
            </h3>
            <p style={{ fontFamily: F_SANS, fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              Register now to get the best deal &amp; book your site visit
            </p>
          </div>

          {/* Form Body */}
          <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  </section>
)

export default AboutDeveloper
