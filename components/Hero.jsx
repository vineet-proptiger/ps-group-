'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import LeadForm from './LeadForm'
import { heroSlides } from '../lib/images'
import { RERA_NO, PHONE_NUMBER } from '../lib/config'

// Slides extended with clones at both ends for seamless infinite circular loop
const extendedSlides = [
  heroSlides[heroSlides.length - 1],
  ...heroSlides,
  heroSlides[0],
]

const Hero = ({ setIsOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(true)

  // Infinite circular auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev + 1)
    }, 3800)
    return () => clearInterval(timer)
  }, [])

  const handleTransitionEnd = () => {
    if (currentIndex >= extendedSlides.length - 1) {
      // Reached the clone at the end -> jump back to real first slide seamlessly
      setIsTransitioning(false)
      setCurrentIndex(1)
      setTimeout(() => {
        setIsTransitioning(true)
      }, 50)
    } else if (currentIndex <= 0) {
      // Reached the clone at start -> jump back to real last slide seamlessly
      setIsTransitioning(false)
      setCurrentIndex(extendedSlides.length - 2)
      setTimeout(() => {
        setIsTransitioning(true)
      }, 50)
    }
  }

  // Active slide index (0 to 3) for highlighting tabs
  const activeSlide = (currentIndex - 1 + heroSlides.length) % heroSlides.length

  return (
    <section
      id="home"
      className="hero-section relative bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-gray-900 overflow-hidden"
      style={{
        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
      }}
    >
      <div className="w-full pt-[82px] pb-8 sm:pt-[88px] sm:pb-10 lg:pt-[98px] lg:pb-12 relative z-10">

        {/* Ambient glow removed for cleaner light theme */}

        <div className="container mx-auto px-3.5 sm:px-6" style={{ maxWidth: '1380px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">

            {/* ══════════════════════════════════════════════════════
                LEFT 50% (7 cols on lg): Pure Visual & Info
               ══════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 flex flex-col">

              {/* Heading & Brand Identity */}
              <div className="mb-3 sm:mb-4">
                <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3.5 mb-1.5">
                  <h1 className="text-gray-900 font-black tracking-tight leading-[1.08] text-[24px] xs:text-[28px] sm:text-[32px] md:text-[38px] m-0">
                    PS Group Project 
                  </h1>
                  {/* <span className="text-[10px] sm:text-[11px] uppercase tracking-[1.5px] font-semibold text-[#fed215] bg-[#f5b800]/20 border border-[#f5b800]/40 px-2.5 py-0.5 rounded-full self-center">
                    Pre-Launch • Newtown, Kolkata
                  </span> */}
                </div>

                {/* Brand Tagline & Location Row */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3.5 text-xs sm:text-[13.5px] text-gray-600 mt-1.5">
                  <span className="text-gray-800 font-medium tracking-[2px] uppercase text-[11px] sm:text-xs">
                    By PS Group
                  </span>
                  <span className="text-gray-300 hidden xs:inline">•</span>
                  <span className="inline-flex items-center gap-1.5 text-gray-700 font-medium">
                    <i className="fas fa-location-dot text-[#fed215] text-[11px]" />
                    <span>Newtown, Kolkata</span>
                  </span>
                </div>
              </div>

              {/* ── 100% CLEAN IMAGE (Infinite circular carousel) ── */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-black">
                <div 
                  onTransitionEnd={handleTransitionEnd}
                  className={`flex w-full ${
                    isTransitioning ? 'transition-transform duration-700 ease-in-out' : 'transition-none'
                  }`}
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {extendedSlides.map((slide, idx) => (
                    <div 
                      key={`${slide.id}-${idx}`} 
                      className="relative w-full h-[220px] xs:h-[250px] sm:h-[310px] md:h-[350px] lg:h-[370px] flex-shrink-0"
                    >
                      <Image
                        src={slide.img}
                        alt={slide.name}
                        fill
                        priority={idx === 1}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 55vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RESPONSIVE BUTTONS (2 per line on small devices, 4 on desktop) ── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mt-3">
                {heroSlides.map((slide, idx) => {
                  const isActive = activeSlide === idx
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => {
                        setIsTransitioning(true)
                        setCurrentIndex(idx + 1)
                      }}
                      className={`py-2 sm:py-2.5 px-2 rounded-lg text-xs sm:text-[13px] font-semibold transition-all cursor-pointer text-center border whitespace-nowrap overflow-hidden text-ellipsis ${
                        isActive
                          ? 'bg-[#f5b800] text-[#111111] font-bold border-[#f5b800] shadow-md'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span>{slide.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* Key Project Badges: 22 acres | 12 towers | G+29/30 Floors */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 pt-3.5 border-t border-gray-200 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#f5b800] bg-[#fff8e1] flex items-center justify-center text-[#b87e00] text-[13px] sm:text-[15px] mb-1.5 shadow-sm transition-transform hover:scale-110 duration-300">
                    <i className="fa-solid fa-tree" />
                  </div>
                  <span className="text-[12px] sm:text-[14px] font-black uppercase tracking-wide text-gray-900">22 acres</span>
                  <span className="text-[9px] sm:text-[10px] uppercase text-gray-500 font-semibold">Land Parcel</span>
                </div>
                <div className="flex flex-col items-center border-x border-gray-200">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#f5b800] bg-[#fff8e1] flex items-center justify-center text-[#b87e00] text-[13px] sm:text-[15px] mb-1.5 shadow-sm transition-transform hover:scale-110 duration-300">
                    <i className="fa-solid fa-building" />
                  </div>
                  <span className="text-[12px] sm:text-[14px] font-black uppercase tracking-wide text-gray-900">12 towers</span>
                  <span className="text-[9px] sm:text-[10px] uppercase text-gray-500 font-semibold">Total Towers</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#f5b800] bg-[#fff8e1] flex items-center justify-center text-[#b87e00] text-[13px] sm:text-[15px] mb-1.5 shadow-sm transition-transform hover:scale-110 duration-300">
                    <i className="fa-solid fa-layer-group" />
                  </div>
                  <span className="text-[12px] sm:text-[14px] font-black uppercase tracking-wide text-gray-900">G+29/30</span>
                  <span className="text-[9px] sm:text-[10px] uppercase text-gray-500 font-semibold">Total Floors</span>
                </div>
              </div>

              {/* Project RERA Number Box
              <div className="mt-4">
                <div className="inline-flex items-center bg-white/[0.06] border border-white/15 rounded-lg py-2.5 px-4 shadow-sm text-xs sm:text-[13.5px] backdrop-blur-sm transition-all hover:border-white/30">
                  <i className="fas fa-shield-halved text-emerald-400 mr-2 text-[13px]" />
                  <span className="text-white/70 mr-1.5 font-medium">
                    RERA No :
                  </span>
                  <span className="text-white font-bold tracking-wider">
                    {RERA_NO}
                  </span>
                </div>
              </div>
              */}

            </div>

            {/* ══════════════════════════════════════════════════════
                RIGHT 50% (5 cols on lg): Conversion Console Card
               ══════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 mt-2 lg:mt-0 flex flex-col">

              {/* Key Quick Specs Strip (Moved above the form) */}
              <div className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-3 sm:gap-4 lg:gap-5 p-2.5 sm:p-4 mb-5 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-black text-xs sm:text-sm w-full">
                <div className="flex-shrink-0">
                  <span className="text-gray-500 font-bold tracking-wider text-[10px] sm:text-[11px] uppercase block mb-1">Price</span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fed215] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fed215]"></span>
                    </span>
                    <strong className="text-gray-900 blink-price font-black text-[15.5px] sm:text-[20px] whitespace-nowrap tracking-tight">
                      ₹ 1.40 Cr* Onwards
                    </strong>
                  </div>
                </div>
                <div className="border-l border-gray-200 pl-3 sm:pl-5 lg:pl-6 flex-shrink-0">
                  <span className="text-gray-500 font-bold tracking-wider text-[10px] sm:text-[11px] uppercase block mb-1">Typology</span>
                  <strong className="text-gray-900 font-black text-[13px] sm:text-[15px] whitespace-nowrap">3 &amp; 4 BHK</strong>
                </div>
                <div className="border-l border-gray-200 pl-3 sm:pl-5 lg:pl-6 flex-shrink-0">
                  <span className="text-gray-500 font-bold tracking-wider text-[10px] sm:text-[11px] uppercase block mb-1">Status</span>
                  <strong className="text-emerald-600 font-black text-[13px] sm:text-[15px] whitespace-nowrap">Pre-Launch</strong>
                </div>
              </div>

              <div
                className="bg-white border border-black rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden"
                style={{
                  borderTop: '4px solid #f5b800',
                }}
              >
                {/* Header */}
                <div className="text-center mb-4 sm:mb-5">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-black text-gray-900 tracking-tight m-0">
                    Get Instant Cost Sheet &amp; Plans
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-600 mt-1 font-normal">
                    Delivered on WhatsApp &amp; Email in 60s
                  </p>
                </div>

                {/* LeadForm */}
                <LeadForm formName="PS Group Project  Hero Form" btnText="Submit" />

                {/* Instant Actions (Call & Visit on Mobile) */}
                <div className="mt-3.5 pt-3.5 border-t border-gray-200 flex items-center justify-between text-[11.5px] sm:text-xs">
                  <button
                    type="button"
                    onClick={() => setIsOpen && setIsOpen(true)}
                    className="text-[#b87e00] hover:underline flex items-center gap-1.5 font-semibold cursor-pointer"
                  >
                    <i className="fas fa-calendar-check text-[11px]" />
                    <span>Book VIP Visit</span>
                  </button>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="text-emerald-600 hover:underline flex items-center gap-1.5 font-semibold"
                  >
                    <i className="fas fa-phone text-[11px]" />
                    <span>Call Sales Desk</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
