'use client'
import React from 'react'

const highlights = [
  {
    title: 'Well-Connected Location',
    description: 'Easy reach to Biswa Bangla Sarani, Major Arterial Road, and VIP Road - key routes that make commuting simpler for daily travel.',
    icon: 'fa-solid fa-road',
  },
  {
    title: 'Large 22-acre Development',
    description: 'Spread over expansive acreage with master-planned residences across iconic high-rise towers, featuring lush central greens and landscaped open spaces.',
    icon: 'fa-solid fa-tree-city',
  },
  {
    title: 'Trusted Developer Background',
    description: 'Developed by PS Group, a well-known name in real estate development, bringing decades of experience and quality to this project.',
    icon: 'fa-solid fa-building-shield',
  },
  {
    title: 'Spacious Home Formats',
    description: '3 BHK and 4 BHK homes planned for families who want extra room for children, guests or working from home.',
    icon: 'fa-solid fa-house-chimney',
  },
  {
    title: 'Growing New Kolkata Belt',
    description: 'Located in an area that has been seeing steady residential growth, with more housing and infrastructure coming up around it.',
    icon: 'fa-solid fa-bullseye',
  },
  {
    title: 'Good Long-Term Potential',
    description: 'A large land parcel in a developing corridor can be worth watching for both end use and long-term value.',
    icon: 'fa-solid fa-sack-dollar',
  },
]

const Highlights = ({ setIsOpen }) => {
  return (
    <section id="highlights" className="w-full py-10 md:py-14 font-poppins" style={{ background: '#fafafa' }}>
      <div className="container mx-auto px-4" style={{ maxWidth: '1280px' }}>

        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-12" data-aos="fade-up">
          <span className="text-[#d49500] font-bold text-[14px] tracking-[2.5px] uppercase mb-2.5 block">
            PROJECT HIGHLIGHTS
          </span>
          <h2 className="text-[#111111] text-[26px] sm:text-[32px] md:text-[38px] font-extrabold m-0 leading-tight md:whitespace-nowrap">
            Highlights of PS Group Project
          </h2>
        </div>

        {/* 6 Cards: 3 per row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {highlights.map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={(i * 50).toString()}
              className="group relative bg-white rounded-[20px] p-7 border border-[#f5df98] shadow-[0_6px_25px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(245,184,0,0.18)] hover:border-[#f5b800]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Top Row: Icon & Title Side-by-Side */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-[52px] h-[52px] min-w-[52px] min-h-[52px] rounded-[14px] bg-[#fef6d8] text-[#b87e00] group-hover:bg-[#f5b800] group-hover:text-[#111111] flex items-center justify-center text-[22px] transition-all duration-300 shadow-sm flex-shrink-0 group-hover:scale-105">
                    <i className={item.icon}></i>
                  </div>
                  <h4 className="text-[#222222] font-bold text-[17px] sm:text-[18px] leading-snug group-hover:text-[#d49500] transition-colors duration-200 m-0">
                    {item.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-[#6c757d] text-[14.5px] font-medium leading-[1.65] m-0">
                  {item.description}
                </p>
              </div>

              {/* Subtle bottom accent line that expands on hover */}
              <div className="w-12 h-[3px] bg-[#f5b800]/30 group-hover:bg-[#f5b800] group-hover:w-full rounded-full mt-6 transition-all duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Highlights
