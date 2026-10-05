'use client'
import React from 'react'

const pricingData = [
  {
    type: '3 BHK',
    area: '1,400 - 1,700 SQ.FT.',
    price: '₹ 1.50 Cr* Onwards',
  },
  {
    type: '4 BHK',
    area: '1,900 - 2,200 SQ.FT.',
    price: 'Price on Request',
  },
]

const Pricing = ({ setIsOpen }) => {
  return (
    <section id="pricing" className="w-full py-10 md:py-14 font-poppins overflow-hidden" style={{ background: '#fafafa' }}>
      <div className="container mx-auto px-4 sm:px-6" style={{ maxWidth: '1050px' }}>
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-12" data-aos="fade-up">
          <span className="text-[#d49500] font-bold text-[13px] sm:text-[14px] tracking-[2px] uppercase mb-2.5 block">
            PRICE LIST
          </span>
          <h2 className="text-[#111111] text-[26px] sm:text-[32px] md:text-[38px] font-extrabold m-0 leading-tight md:whitespace-nowrap">
            Configurations & Pricing
          </h2>
        </div>

        {/* ── MOBILE / SMALL DEVICE CARDS (Visible below md breakpoint) ── */}
        <div className="flex flex-col gap-6 md:hidden">
          {pricingData.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={(index * 100).toString()}
              className="bg-white rounded-[20px] p-6 sm:p-7 border border-[#f5df98] shadow-[0_8px_30px_rgba(245,184,0,0.08)] relative overflow-hidden flex flex-col justify-between"
              style={{ borderTop: '4px solid #f5b800' }}
            >
              <div>
                {/* Top Header: Unit Type & Area Tag */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#f1f5f9] mb-4">
                  <h3 className="text-[#1a1a1a] font-black text-[20px] sm:text-[22px] m-0">
                    {item.type}
                  </h3>
                  <span className="bg-[#fef6d8] text-[#b87e00] text-[12.5px] sm:text-[13.5px] font-extrabold px-3.5 py-1.5 rounded-full shadow-sm whitespace-nowrap">
                    {item.area}
                  </span>
                </div>

                {/* Estimated Price Block */}
                <div className="mb-6">
                  <span className="text-[11.5px] text-[#6c757d] font-bold uppercase tracking-wider block mb-1">
                    ESTIMATED PRICE
                  </span>
                  <div className="text-[#222222] font-black text-[24px] tracking-tight">
                    {item.price}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="w-full py-3.5 rounded-[50px] font-bold text-[15px] transition-all duration-300 shadow-[0_6px_20px_rgba(245,184,0,0.35)] active:scale-[0.98] cursor-pointer"
                style={{
                  background: '#f5b800',
                  color: '#111111',
                  border: '2px solid #f5b800',
                }}
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
                Get Price List
              </button>
            </div>
          ))}
        </div>

        {/* ── DESKTOP TABLE (Visible on md and above) ── */}
        <div className="hidden md:block bg-white rounded-[16px] shadow-[0_10px_35px_rgba(0,0,0,0.04)] overflow-hidden border border-[#e5e7eb]" data-aos="fade-up">
          <table className="w-full text-center border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#1a1a1a] text-white">
                <th className="py-5 px-6 font-bold text-[13.5px] tracking-wider uppercase border-b-0 w-1/4">UNIT TYPE</th>
                <th className="py-5 px-6 font-bold text-[13.5px] tracking-wider uppercase border-b-0 w-1/4">SIZE</th>
                <th className="py-5 px-6 font-bold text-[13.5px] tracking-wider uppercase border-b-0 w-1/4">ESTIMATED PRICE</th>
                <th className="py-5 px-6 font-bold text-[13.5px] tracking-wider uppercase border-b-0 w-1/4">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-[#222222] divide-y divide-[#f0f0f0]">
              {pricingData.map((item, index) => (
                <tr key={index} className="hover:bg-[#fafafa] transition-colors duration-200">
                  <td className="py-6 px-6 font-extrabold text-[18px] text-[#1a1a1a]">{item.type}</td>
                  <td className="py-6 px-6 text-[15.5px] font-semibold text-[#495057]">{item.area}</td>
                  <td className="py-6 px-6 font-black text-[18px] text-[#222222]">{item.price}</td>
                  <td className="py-6 px-6">
                    <button 
                      onClick={() => setIsOpen(true)}
                      className="inline-flex items-center justify-center px-8 py-3 rounded-[50px] font-bold text-[14px] transition-all duration-300 shadow-[0_4px_16px_rgba(245,184,0,0.35)] cursor-pointer"
                      style={{
                        background: '#f5b800',
                        color: '#111111',
                        border: '2px solid #f5b800',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#111111';
                        e.currentTarget.style.color = '#fed215';
                        e.currentTarget.style.borderColor = '#111111';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,184,0,0.45)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#f5b800';
                        e.currentTarget.style.color = '#111111';
                        e.currentTarget.style.borderColor = '#f5b800';
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(245,184,0,0.35)';
                      }}
                    >
                      Get Price List
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  )
}

export default Pricing
