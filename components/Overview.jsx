'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { overviewImage } from '../lib/images'

const Overview = ({ setIsOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section id="overview" className="w-full py-10 md:py-14 bg-white font-poppins">
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <div className="flex flex-col lg:flex-row items-start lg:mx-[-12px]">
          
          {/* Image Column */}
          <div className="w-full lg:w-1/2 lg:px-[12px] mb-10 lg:mb-0 flex justify-center lg:sticky lg:top-24">
            <div className="relative w-full max-w-[480px] h-[320px] sm:h-[380px] md:h-[430px] lg:h-[470px] rounded-[20px] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
               <Image 
                 src={overviewImage} 
                 alt="About New Launch Projects in Newtown " 
                 fill 
                 className="object-cover" 
                 sizes="(max-width: 1024px) 100vw, 50vw" 
               />
               <div className="absolute" style={{ right: '8px', bottom: '50%', transform: 'translateY(50%) rotate(-90deg)', transformOrigin: 'center right' }}>
                 <span className="text-[#e0e0e0] text-[10px] tracking-widest uppercase" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Artistic Impression</span>
               </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-1/2 lg:px-[12px] lg:pl-16">
            <div className="section-heading">
              <span className="text-[#d49500] font-bold text-[14px] tracking-widest uppercase mb-3 block">
                Premium Development
              </span>
              <h2 className="text-[#111111] text-[25px] sm:text-[30px] md:text-[38px] font-extrabold leading-[1.2] mb-4">
                Overview
              </h2>
              <div className="mb-5 pr-0 lg:pr-6">
                <div className={`text-[#6c757d] text-[15px] leading-[1.7] text-justify ${!isExpanded ? 'line-clamp-5 overflow-hidden' : ''}`}>
                  <p className="m-0 mb-3">
                    <strong className="text-[#111111]">New Launch Projects in Newtown </strong> brings a legacy of engineering excellence to Kolkata, with a premium residential development spanning 22 acres. The project reflects decades of expertise and quality. Planned with extensive green areas and a modern architectural design, it will offer thoughtfully designed high-rise residences, refined architecture, contemporary living spaces, and a well-planned community.
                  </p>
                  <p className="m-0">
                    Featuring 3 &amp; 4 BHK luxury residences across 12 premium towers rising up to G+29/30 floors, the project embodies modern sophistication, extensive landscaped open greens, premium lifestyle amenities, and only 4 apartments per core.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[#d49500] font-semibold text-[14.5px] mt-2 hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors duration-200 focus:outline-none"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 mb-8">
                {/* Feature 1 */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-0.5 flex-shrink-0 text-[#d49500]">
                    <i className="fa-solid fa-circle-check text-[18px] sm:text-[22px]"></i>
                  </div>
                  <div>
                    <h5 className="text-[#222222] font-bold text-[13.5px] sm:text-[16px] mb-1 leading-snug">Land Parcel</h5>
                    <p className="text-[#6c757d] text-[12px] sm:text-[14px] m-0 leading-normal">22 acres Sprawling Land</p>
                  </div>
                </div>
                {/* Feature 2 */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-0.5 flex-shrink-0 text-[#d49500]">
                    <i className="fa-solid fa-circle-check text-[18px] sm:text-[22px]"></i>
                  </div>
                  <div>
                    <h5 className="text-[#222222] font-bold text-[13.5px] sm:text-[16px] mb-1 leading-snug">Total Towers &amp; Floors</h5>
                    <p className="text-[#6c757d] text-[12px] sm:text-[14px] m-0 leading-normal">12 towers (G+29/30 Floors)</p>
                  </div>
                </div>
                {/* Feature 3 */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-0.5 flex-shrink-0 text-[#d49500]">
                    <i className="fa-solid fa-circle-check text-[18px] sm:text-[22px]"></i>
                  </div>
                  <div>
                    <h5 className="text-[#222222] font-bold text-[13.5px] sm:text-[16px] mb-1 leading-snug">Configuration</h5>
                    <p className="text-[#6c757d] text-[12px] sm:text-[14px] m-0 leading-normal">3 &amp; 4 BHK Apartments</p>
                  </div>
                </div>
                {/* Feature 4 */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-0.5 flex-shrink-0 text-[#d49500]">
                    <i className="fa-solid fa-circle-check text-[18px] sm:text-[22px]"></i>
                  </div>
                  <div>
                    <h5 className="text-[#222222] font-bold text-[13.5px] sm:text-[16px] mb-1 leading-snug">Low Density</h5>
                    <p className="text-[#6c757d] text-[12px] sm:text-[14px] m-0 leading-normal">Only 4 apartments per core</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Overview
