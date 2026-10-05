'use client'
import React, { useState } from 'react'

const plansData = [
  {
    title: '30 : 40 : 30',
    line1: 'Year 1 — ₹80 Lacs',
    line2: 'Year 2 — Nil',
  },
  {
    title: 'CLP 20 × 5',
    line1: 'Year 1 — ₹45 Lacs',
    line2: 'Year 2 — ₹45 Lacs',
  },
  {
    title: 'Subvention',
    line1: 'Easy Entry',
    line2: 'Bank Backed Plan',
  },
]

const PaymentPlan = ({ setIsOpen }) => {
  // Default to null so no card is highlighted until hovered
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <section
      id="payment-plan"
      className="w-full py-10 md:py-14 font-poppins overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff, #fafafa)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6" style={{ maxWidth: '1150px' }}>
        {/* Section Title */}
        <div className="text-center max-w-[800px] mx-auto mb-12 sm:mb-14" data-aos="fade-up">
          <span className="text-[#d49500] font-bold text-[13px] sm:text-[14px] tracking-[2.5px] uppercase mb-3 block">
            PAYMENT PLAN
          </span>
          <h2 className="text-[#111111] text-[26px] sm:text-[32px] md:text-[38px] font-extrabold m-0 leading-tight">
            Flexible Payment Plan
          </h2>
        </div>

        {/* Payment Wrapper Container (White Box) */}
        <div
          className="bg-white rounded-[24px] sm:rounded-[28px] p-2 sm:p-3"
          style={{
            boxShadow: '0 20px 50px rgba(245, 184, 0, 0.08)',
            border: '1px solid rgba(245, 184, 0, 0.25)',
          }}
          data-aos="fade-up"
          onMouseLeave={() => setActiveIdx(null)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-0 items-stretch">
            {plansData.map((plan, index) => {
              const isActive = activeIdx === index

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIdx(index)}
                  onMouseLeave={() => setActiveIdx(null)}
                  onClick={() => setIsOpen && setIsOpen(true)}
                  className={`relative cursor-pointer transition-all duration-300 ease-in-out py-10 px-6 rounded-[20px] flex flex-col items-center justify-center text-center ${
                    isActive ? 'scale-[1.01] sm:scale-100 z-10' : ''
                  }`}
                  style={{
                    background: isActive ? '#111111' : 'transparent',
                    boxShadow: isActive ? '0 12px 30px rgba(0, 0, 0, 0.25)' : 'none',
                    border: isActive ? '2px solid #f5b800' : '2px solid transparent',
                  }}
                >
                  {/* Vertical Divider for desktop (only when neither current nor previous is active) */}
                  {index > 0 && !isActive && activeIdx !== index - 1 && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-3/5 bg-gray-200" />
                  )}
                  {/* Horizontal Divider for mobile (between cards when untouched) */}
                  {index > 0 && !isActive && activeIdx !== index - 1 && (
                    <div className="block md:hidden absolute left-1/2 top-0 -translate-x-1/2 w-4/5 h-[1px] bg-gray-200" />
                  )}

                  <h3
                    className="text-[22px] sm:text-[24px] font-extrabold mb-3.5 tracking-tight transition-colors duration-300"
                    style={{
                      color: isActive ? '#ffffff' : '#222222',
                    }}
                  >
                    {plan.title}
                  </h3>

                  <p
                    className="text-[15px] sm:text-[16px] font-medium leading-relaxed m-0 transition-colors duration-300"
                    style={{
                      color: isActive ? 'rgba(255, 255, 255, 0.85)' : '#6c757d',
                    }}
                  >
                    {plan.line1}
                    <br />
                    {plan.line2}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentPlan
