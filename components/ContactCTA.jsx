'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { buildTrackingFields } from '../lib/formMeta'

const GOLD = 'var(--color-gold)'
const GOLD_DARK = 'var(--color-gold-dark)'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'
const F_JOST = 'var(--font-jost), Montserrat, sans-serif'

const ContactCTA = () => {
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
    payload.append('form_name', 'Contact CTA Form')
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
            event: 'lead_submit_success', form_name: 'Contact CTA Form',
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

  return (
    <section className="py-10 sm:py-14 px-4" style={{ background: 'var(--color-bg-light)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>

        <div style={{ textAlign: 'center', marginBottom: '36px' }} data-aos="fade-up">
        </div>

        {success ? (
          <div style={{ padding: '32px 0', textAlign: 'center' }} data-aos="fade-up">
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
        ) : (
          <div style={{
            background: '#fff', borderRadius: '16px',
            boxShadow: '0 4px 24px var(--color-shadow-card)',
            border: '1px solid var(--color-gold-light)',
            overflow: 'hidden', display: 'flex', flexDirection: 'column', width: '100%',
            maxWidth: '500px', margin: '0 auto'
          }} data-aos="fade-up" data-aos-delay="200">
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
              padding: '18px 20px', position: 'relative', overflow: 'hidden', textAlign: 'left'
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
              <p style={{
                fontFamily: F_SANS, fontSize: '12px',
                color: 'rgba(255,255,255,0.6)', margin: 0
              }}>
                Register now to get the best deal &amp; book your site visit
              </p>
            </div>

            <div style={{ padding: '24px 20px', textAlign: 'left' }}>
              <form onSubmit={submit} className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label style={{
                    display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280',
                    fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
                  }}>
                    Full Name <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <input name="fullname" required value={form.fullname} onChange={handle} placeholder="Enter full name"
                    className="form-input" style={{ fontFamily: F_SANS, width: '100%' }} />
                </div>

                {/* Email */}
                <div>
                  <label style={{
                    display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280',
                    fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
                  }}>
                    Email Address
                  </label>
                  <input name="email" value={form.email} onChange={handle} placeholder="Email Id (optional)"
                    className="form-input" style={{ fontFamily: F_SANS, width: '100%' }} />
                </div>

                {/* Phone */}
                <div>
                  <label style={{
                    display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280',
                    fontFamily: F_JOST, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px'
                  }}>
                    Mobile Number <span style={{ color: 'var(--color-gold)' }}>*</span>
                  </label>
                  <input name="phone" required value={form.phone} onChange={handle}
                    placeholder="10-digit mobile number" maxLength={10}
                    className="form-input" style={{ fontFamily: F_SANS, width: '100%' }} />
                </div>

                {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', textAlign: 'left' }}>
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
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ContactCTA
