"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  

  const featuredBooks = [
    {
      id: 'featured1',
      title: 'Featured Book 1',
      description: 'Discover this amazing story',
      image: '/banner1.jpg',
      cta: 'Browse Now'
    },
    {
      id: 'featured2',
      title: 'Featured Book 2',
      description: 'Award winning novel',
      image: '/awardwinning.webp',
      cta: 'Learn More'
    }
  ]

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredBooks.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [featuredBooks.length])

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featuredBooks.map((book) => (
          <div key={book.id} className="w-full flex-shrink-0 relative">
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30 flex items-center">
              <div className="container mx-auto px-8 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">{book.title}</h2>
                <p className="text-lg md:text-xl mb-4 max-w-lg">{book.description}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                  {book.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {featuredBooks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}