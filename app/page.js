'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'

import { PROJECT_NAME, PHONE_NUMBER, WHATSAPP_NUMBER } from '../lib/config'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Overview = dynamic(() => import('../components/Overview'), { ssr: true })
const Highlights = dynamic(() => import('../components/Highlights'), { ssr: true })
const Pricing = dynamic(() => import('../components/Pricing'), { ssr: true })
const Amenities = dynamic(() => import('../components/Amenities'), { ssr: true })
const Location = dynamic(() => import('../components/Location'), { ssr: true })
const MasterPlan = dynamic(() => import('../components/MasterPlan'), { ssr: true })
const Downloads = dynamic(() => import('../components/Downloads'), { ssr: true })
const AboutDeveloper = dynamic(() => import('../components/AboutDeveloper'), { ssr: true })
const VirtualTour = dynamic(() => import('../components/VirtualTour'), { ssr: true })
const PaymentPlan = dynamic(() => import('../components/PaymentPlan'), { ssr: true })
const FAQ = dynamic(() => import('../components/FAQ'), { ssr: true })
const Footer = dynamic(() => import('../components/Footer'), { ssr: true })

const Gallery = dynamic(() => import('../components/Gallery'), { ssr: false })
const EnquireModal = dynamic(() => import('../components/EnquireModal'), { ssr: false })
const AosInit = dynamic(() => import('../components/AosInit'), { ssr: false })

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="relative min-h-screen bg-white">
      <AosInit />
      <Navbar setIsOpen={setIsOpen} />
      <Hero setIsOpen={setIsOpen} />
      <Overview setIsOpen={setIsOpen} />
      <Highlights setIsOpen={setIsOpen} />
      <Gallery setIsOpen={setIsOpen} />
      <Pricing setIsOpen={setIsOpen} />
      {/* <PaymentPlan setIsOpen={setIsOpen} /> */}
      <Amenities setIsOpen={setIsOpen} />
      {/* <Location /> */}
      <MasterPlan setIsOpen={setIsOpen} />
      {/* <Downloads setIsOpen={setIsOpen} /> */}
      {/* <AboutDeveloper setIsOpen={setIsOpen} /> */}
      {/* <VirtualTour setIsOpen={setIsOpen} /> */}
      {/* <FAQ /> */}
      <Footer />
      <EnquireModal isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Floating vertical Enquire tab — desktop only */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex btn-floating-tab"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          letterSpacing: '2px',
        }}
      >
        ENQUIRE NOW
      </button>

      {/* Mobile sticky bottom bar */}
      <div className="sticky-bottom-bar">
        <a
          id="mobile-call"
          href={`tel:${PHONE_NUMBER}`}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1"
          style={{ background: '#1a1a1a', borderRight: '1px solid #333' }}
        >
          <div className="phone-icon-wrap flex items-center justify-center">
            <svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
          </div>
          <span className="text-[11px] sm:text-[12px] font-bold text-white mt-1 leading-none">Call Us</span>
        </a>
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1"
          style={{ background: '#f5b800', borderRight: '1px solid #d49500' }}
        >
          <div className="enquire-icon-wrap flex items-center justify-center">
            <svg width="22" height="22" fill="none" stroke="#111111" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span className="text-[11px] sm:text-[12px] font-bold text-[#111111] mt-1 leading-none">ENQUIRE</span>
        </button>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20I%20am%20interested%20in%20${encodeURIComponent(PROJECT_NAME)}`}
          target="_blank" rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1"
          style={{ background: '#25D366' }}
        >
          <div className="whatsapp-icon-wrap flex items-center justify-center">
            <svg width="22" height="22" fill="#ffffff" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <span className="text-[11px] sm:text-[12px] font-bold text-white mt-1 leading-none">WhatsApp</span>
        </a>
      </div>

      <div className="h-16 lg:hidden" />
    </main>
  )
}
