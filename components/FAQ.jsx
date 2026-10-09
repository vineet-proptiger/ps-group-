'use client'
import React, { useState } from 'react'

const faqData = [
  {
    question: 'What configurations are available at Upcoming New Launch Projects in Newtown ?',
    answer: (
      <>
        Upcoming New Launch Projects in Newtown offers spacious <strong className="font-semibold text-[#222222]">3 BHK and 4 BHK luxury residences</strong> with modern layouts, expansive balconies, premium interiors, and refined architecture.
      </>
    ),
  },
  {
    question: 'Is Upcoming New Launch Projects in Newtown RERA registered?',
    answer: (
      <>
        Yes, <strong className="font-semibold text-[#222222]">Upcoming New Launch Projects in Newtown </strong> is registered with the West Bengal Real Estate Regulatory Authority (WBRERA). RERA Registration No: <strong className="font-semibold text-[#222222]">Coming Soon</strong>.
      </>
    ),
  },
  {
    question: 'How big is Upcoming New Launch Projects in Newtown and how many towers does it have?',
    answer:
      'Upcoming New Launch Projects in Newtown is spread across a prime 22-acre land parcel featuring 12 Premium Towers rising up to G+29/30 floors, with only 4 apartments per core and a total of 800–900 luxury units.',
  },
  {
    question: 'Where exactly is Upcoming New Launch Projects in Newtown located?',
    answer: (
      <>
        Upcoming New Launch Projects in Newtown is strategically located in <strong className="font-semibold text-[#222222]">Newtown, Kolkata</strong>, offering excellent connectivity to <strong className="font-semibold text-[#222222]">Biswa Bangla Gate, Eco Park, Sector V IT Hub, and the International Airport</strong>.
      </>
    ),
  },
  {
    question: 'Is Upcoming New Launch Projects in Newtown a good investment?',
    answer:
      "Yes, Upcoming New Launch Projects in Newtown is considered a top-tier investment due to the developer's legacy of engineering excellence, prime Newtown location, premium lifestyle amenities, low-density development, and high capital appreciation potential in Kolkata.",
  },
]

const FAQ = () => {
  // First item open by default, set to index 0
  const [openIdx, setOpenIdx] = useState(0)

  const toggleAccordion = (index) => {
    setOpenIdx(prev => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="w-full py-10 md:py-14 bg-white font-poppins overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1280px]">
        
        {/* Section Title */}
        <div className="text-center max-w-[800px] mx-auto mb-12 sm:mb-14" data-aos="fade-up">
          <span className="text-[#d49500] font-bold text-[13px] sm:text-[14px] tracking-[2.5px] uppercase mb-3 block">
            FAQ
          </span>
          <h2 className="text-[#111111] text-[26px] sm:text-[32px] md:text-[38px] font-extrabold m-0 leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion Container */}
        <div 
          className="max-w-[960px] mx-auto border border-[#dee2e6] rounded-[12px] sm:rounded-[14px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] divide-y divide-[#dee2e6]"
          data-aos="fade-up"
        >
          {faqData.map((item, index) => {
            const isOpen = openIdx === index

            return (
              <div key={index} className="bg-white">
                {/* Accordion Button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className={`w-full py-4 px-5 sm:py-5 sm:px-7 flex items-center justify-between gap-4 text-left text-[15.5px] sm:text-[17px] transition-all duration-200 cursor-pointer ${
                    isOpen
                      ? 'bg-[#fef6d8] text-[#111111] font-bold shadow-inner'
                      : 'bg-white text-[#212529] font-medium hover:bg-[#fafafa]'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  
                  {/* Chevron Icon */}
                  <span className={`text-current transition-transform duration-300 transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="bg-white px-5 py-5 sm:px-7 sm:py-6 text-[#343a40] text-[15px] sm:text-[15.5px] leading-[1.75] border-t border-[#dee2e6]/80 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default FAQ
