'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { galleryImages } from '../lib/images'

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null)

  // Use first 5 images for the 3 + 2 layout (as requested in HTML/screenshot)
  const topRowImages = galleryImages.slice(0, 3)
  const bottomRowImages = galleryImages.slice(3, 5)

  const openLightbox = (index) => {
    setLightbox(index)
  }

  return (
    <section id="gallery" className="gallery-section py-10 md:py-14 bg-white overflow-hidden" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
      <div className="container mx-auto px-4 sm:px-6 max-w-[1350px]">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="block text-[#d49500] font-bold text-[13px] uppercase tracking-[2.5px] mb-2">
            PROJECT GALLERY
          </span>
          <h2 className="text-[#111111] font-extrabold text-[26px] sm:text-[32px] md:text-[38px] tracking-tight">
            Project Gallery
          </h2>
        </div>

        {/* ── Row 1: 3 Columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {topRowImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="gallery-item group relative cursor-pointer overflow-hidden rounded-[20px] shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100"
              style={{ aspectRatio: '4 / 3' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover Overlay */}
              <div className="gallery-overlay absolute inset-0 bg-[#222222]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white text-[#b87e00] flex items-center justify-center text-xl shadow-lg transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <i className="fa-solid fa-magnifying-glass-plus" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Row 2: 2 Larger Widescreen Columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bottomRowImages.map((img, idx) => {
            const actualIndex = idx + 3
            return (
              <div
                key={actualIndex}
                onClick={() => openLightbox(actualIndex)}
                className="gallery-item large group relative cursor-pointer overflow-hidden rounded-[20px] shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100"
                style={{ aspectRatio: '16 / 9' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-108"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Hover Overlay */}
                <div className="gallery-overlay absolute inset-0 bg-[#222222]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white text-[#b87e00] flex items-center justify-center text-2xl shadow-lg transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <i className="fa-solid fa-magnifying-glass-plus" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* ── Interactive Fullscreen Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setLightbox(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#f5b800] hover:bg-[#111111] text-[#111111] hover:text-[#fed215] text-2xl font-bold flex items-center justify-center transition-transform hover:scale-105 shadow-lg z-10 cursor-pointer"
          >
            ×
          </button>

          {/* Image Container */}
          <div
            className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              fill
              className="object-contain rounded-lg shadow-2xl"
              sizes="100vw"
              priority
            />
            
            {/* Counter */}
            <div className="absolute -bottom-10 left-0 right-0 text-center text-white/75 font-semibold text-sm tracking-widest uppercase">
              Image {lightbox + 1} of {galleryImages.length}
            </div>
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length)
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 border border-white/20 text-white text-2xl flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((lightbox + 1) % galleryImages.length)
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 border border-white/20 text-white text-2xl flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery
