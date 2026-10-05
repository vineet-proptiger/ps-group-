'use client'
import React from 'react'

const amenities = [
  {
    title: 'Resort-Style Pools',
    description: 'Expansive aquatic & leisure zones',
    icon: 'fa-solid fa-water-ladder'
  },
  {
    title: 'Landscaped Podium',
    description: '7 acres of gardens, lawns & trails',
    icon: 'fa-solid fa-tree'
  },
  {
    title: 'Wellness & Fitness',
    description: 'Premium health, fitness & relaxation',
    icon: 'fa-solid fa-spa'
  },
  {
    title: 'Sports & Recreation',
    description: 'Indoor & outdoor recreational facilities',
    icon: 'fa-solid fa-table-tennis-paddle-ball'
  },
  {
    title: 'Club & Social Spaces',
    description: 'Elegant spaces for community gatherings',
    icon: 'fa-solid fa-martini-glass-citrus'
  },
  {
    title: 'Lifestyle Amenities',
    description: 'Thoughtfully curated everyday facilities',
    icon: 'fa-solid fa-gem'
  },
  {
    title: 'Kid Play Area',
    description: 'Safe & modern play zone',
    icon: 'fa-solid fa-child-reaching'
  },
  {
    title: 'Concierge Service 24*7',
    description: 'Premium round-the-clock support',
    icon: 'fa-solid fa-bell-concierge'
  }
]

const Amenities = () => {
  return (
    <section id="amenities" className="w-full py-10 md:py-14 font-poppins" style={{ background: '#f9f9f9' }}>
      <div className="container mx-auto px-4" style={{ maxWidth: '1280px' }}>

        {/* Section Title */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-[#d49500] font-bold text-[14px] tracking-[2px] uppercase mb-3 block">
            Premium lifestyle amenities
          </span>
          <h2 className="text-[#111111] text-[26px] sm:text-[32px] md:text-[38px] font-bold m-0">
            A Lifestyle Beyond Ordinary
          </h2>
        </div>

        {/* 4x3 Grid of Amenity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 md:gap-7">
          {amenities.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={((index % 4) * 50).toString()}
              className="group bg-white rounded-[20px] p-8 text-center border border-[#f5df98] shadow-[0_6px_25px_rgba(0,0,0,0.03)] hover:-translate-y-2.5 hover:shadow-[0_15px_35px_rgba(245,184,0,0.18)] hover:border-[#f5b800]/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center"
            >
              {/* Icon in Circular Badge */}
              <div className="w-[76px] h-[76px] rounded-full bg-[#fef6d8] text-[#b87e00] group-hover:bg-[#f5b800] group-hover:text-[#111111] flex items-center justify-center text-[28px] mb-6 transition-all duration-300 group-hover:scale-110 shadow-[0_4px_10px_rgba(245,184,0,0.12)] group-hover:shadow-[0_6px_20px_rgba(245,184,0,0.35)]">
                <i className={item.icon}></i>
              </div>

              {/* Title */}
              <h4 className="text-[#222222] font-extrabold text-[19px] mb-2.5 tracking-tight group-hover:text-[#d49500] transition-colors duration-200">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-[#6c757d] text-[13.5px] leading-relaxed m-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Amenities
