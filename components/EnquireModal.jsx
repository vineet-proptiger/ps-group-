'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PROJECT_ID, PROJECT_NAME, API_ENDPOINT, SHEET_NAME, SECRET_KEY, CITY_DISPLAY } from '../lib/config'
import { buildTrackingFields } from '../lib/formMeta'

const F_SANS = 'var(--font-poppins), Poppins, sans-serif'
const F_JOST = 'var(--font-poppins), Poppins, sans-serif'

const fieldStyle = {
  width: '100%',
  background: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  padding: '13px 16px',
  color: '#212529',
  fontSize: '14.5px',
  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
  outline: 'none',
  caretColor: '#f5b800',
}

const EnquireModal = ({ isOpen, setIsOpen }) => {
  const autoTriggered = useRef(false)
  const intervalRef = useRef(null)

  const [form, setForm] = useState({ fullname: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  /* ── Auto-trigger (same as before) ── */
  useEffect(() => {
    if (autoTriggered.current) return
    const initial = setTimeout(() => {
      autoTriggered.current = true
      setIsOpen(true)
      intervalRef.current = setInterval(() => setIsOpen(true), 30000)
    }, 15000)
    return () => {
      clearTimeout(initial)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [setIsOpen])

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])


  const handle = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'phone' ? value.replace(/\D/g, '') : value }))
  }

  /* ── Submit — identical API call as LeadForm ── */
  const submit = async (e) => {
    e.preventDefault()
    if (form.phone.length !== 10) { setError('Please enter a valid 10-digit mobile number.'); return }
    if (!/^[6-9]\d{9}$/.test(form.phone)) { setError('Phone number must start with 6, 7, 8, or 9'); return }
    setError(''); setLoading(true)
    const tracking = buildTrackingFields()

    // --- GCLID-SPECIFIC BROWSER LIMIT ---
    let currentCount = 0;
    let safeGclid = '';
    
    if (tracking.gclid) {
      safeGclid = tracking.gclid;
      const cookieRegex = new RegExp(`(?:^|; )lead_trk_${PROJECT_ID}_${safeGclid}=([^;]*)`);
      const cookieMatch = document.cookie.match(cookieRegex);
      const cookieCount = cookieMatch ? parseInt(cookieMatch[1], 10) : 0;
      
      let lsCount = 0;
      const lsKey = `lead_trk_data_${PROJECT_ID}`;
      const lsDataStr = localStorage.getItem(lsKey);
      
      if (lsDataStr) {
        try {
          const lsData = JSON.parse(lsDataStr);
          const gclidRecord = lsData[tracking.gclid];
          
          if (gclidRecord) {
            if (Date.now() - gclidRecord.firstSeen < 2592000000) {
              lsCount = gclidRecord.count || 0;
            } else {
              delete lsData[tracking.gclid];
              localStorage.setItem(lsKey, JSON.stringify(lsData));
            }
          }
        } catch (e) {}
      }
      
      currentCount = Math.max(cookieCount, lsCount);
      
      if (currentCount >= 3) {
        setSuccess(true);
        setLoading(false);
        return;
      }
    }

    const payload = new FormData()
    payload.append('fullname', form.fullname)
    payload.append('email', form.email)
    payload.append('phone', form.phone)
    payload.append('website', '')          // honeypot — keep empty
    payload.append('projectId', PROJECT_ID)
    payload.append('projectName', PROJECT_NAME)
    payload.append('form_name', 'Popup Modal')
    payload.append('sheet_name', SHEET_NAME)
    payload.append('secret', SECRET_KEY)
    payload.append('city', CITY_DISPLAY)
    Object.entries(tracking).forEach(([k, v]) => payload.append(k, v))
    try {
      const res = await fetch(API_ENDPOINT, { method: 'POST', body: payload })
      const data = await res.json()
      if (data.status) {
        if (tracking.gclid) {
          const newCount = currentCount + 1;
          if (typeof document !== 'undefined') document.cookie = `lead_trk_${PROJECT_ID}_${safeGclid}=${newCount}; max-age=2592000; path=/`;
          
          if (typeof localStorage !== 'undefined') {
            const lsKey = `lead_trk_data_${PROJECT_ID}`;
            let lsData = {};
            try {
              const existing = localStorage.getItem(lsKey);
              if (existing) lsData = JSON.parse(existing);
            } catch(e) {}
            
            lsData[tracking.gclid] = {
              count: newCount,
              firstSeen: (lsData[tracking.gclid] && lsData[tracking.gclid].firstSeen) ? lsData[tracking.gclid].firstSeen : Date.now()
            };
            try { localStorage.setItem(lsKey, JSON.stringify(lsData)); } catch(e) {}
          }
        }
        setSuccess(true)
        if (typeof window !== 'undefined') {
          localStorage.setItem('_lsub_done', '1')
          window.dataLayer = window.dataLayer || []
          const nameParts = form.fullname.trim().split(' ')
          window.dataLayer.push({
            event: 'lead_submit_success', form_name: 'Popup Modal',
            user_data: {
              email: form.email.trim() || undefined, phone: `+91${form.phone}`,
              first_name: nameParts[0] || '', last_name: nameParts.slice(1).join(' ') || ''
            },
          })
        }
      } else {
        setError(data.msg || 'Submission failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '460px',
          borderRadius: '16px',
          border: 'none',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          position: 'relative',
          padding: '36px 30px 30px',
          maxHeight: '95vh',
          overflowY: 'auto',
          animation: 'slideInRight 0.38s cubic-bezier(0.22,1,0.36,1) forwards',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Close button ── */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute', top: '16px', right: '18px',
            background: '#f3f4f6', border: 'none', cursor: 'pointer',
            width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', fontWeight: '700', color: '#4b5563',
            lineHeight: 1, borderRadius: '50%',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#111111'; e.currentTarget.style.color = '#fed215' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#4b5563' }}
          aria-label="Close"
        >
          ×
        </button>

        {/* ── Heading ── */}
        <h2 style={{
          color: '#222222', fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: '800',
          fontSize: '24px', margin: '0 0 24px', letterSpacing: '0.02em',
          textTransform: 'uppercase', textAlign: 'center'
        }}>
          ENQUIRE NOW
        </h2>

        {/* ── Success state ── */}
        {success ? (
          <div style={{ textAlign: 'center', padding: '28px 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(245, 184, 0, 0.1)', border: '2px solid #f5b800',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="32" height="32" fill="none" stroke="#d49500" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p style={{ color: '#222222', fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '20px', fontWeight: '700', marginBottom: '6px' }}>
              Thank You!
            </p>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={submit}>

            {/* Name */}
            <div style={{ marginBottom: '16px' }}>
              <input
                name="fullname" required value={form.fullname} onChange={handle}
                placeholder="Enter your name"
                style={fieldStyle}
                onFocus={e => { e.currentTarget.style.borderColor = '#f5b800'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 184, 0, 0.2)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <input
                name="email" type="email" value={form.email} onChange={handle}
                placeholder="Enter your email (Optional)"
                style={fieldStyle}
                onFocus={e => { e.currentTarget.style.borderColor = '#f5b800'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 184, 0, 0.2)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '18px' }}>
              <input
                name="phone" required value={form.phone} onChange={handle}
                placeholder="Enter your phone number" maxLength={10}
                style={fieldStyle}
                onFocus={e => { e.currentTarget.style.borderColor = '#f5b800'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 184, 0, 0.2)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>

            {error && (
              <p style={{
                color: '#ef4444', fontSize: '13px',
                marginBottom: '14px', fontWeight: '500'
              }}>
                {error}
              </p>
            )}

            {/* Consent */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '22px' }}>
              <input
                type="checkbox" id="popup-privacy" required defaultChecked
                style={{ accentColor: '#f5b800', marginTop: '3px', flexShrink: 0, width: '16px', height: '16px' }}
              />
              <label htmlFor="popup-privacy" style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, cursor: 'pointer' }}>
                I agree to receive updates as per the{' '}
                <Link href="/privacy-policy" style={{ color: '#d49500', fontWeight: '600', textDecoration: 'underline' }}>Privacy Policy</Link>.
              </label>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/* Submit */}
              <button
                type="submit" disabled={loading}
                style={{
                  background: '#f5b800', color: '#111111', border: '2px solid #f5b800',
                  padding: '14px 48px', fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: '700',
                  fontSize: '15px', letterSpacing: '0.05em', cursor: loading ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase', borderRadius: '8px',
                  opacity: loading ? 0.75 : 1, width: '100%',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(245, 184, 0, 0.35)',
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#111111'; e.currentTarget.style.color = '#fed215'; e.currentTarget.style.borderColor = '#111111' } }}
                onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#f5b800'; e.currentTarget.style.color = '#111111'; e.currentTarget.style.borderColor = '#f5b800' } }}
              >
                {loading ? 'SENDING...' : 'SUBMIT'}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}

export default EnquireModal
