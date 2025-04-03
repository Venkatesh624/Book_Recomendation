"use client"
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Navbar from './components/navbar'
import BookCard from './components/BookCard'
import FilterBar from './components/FilterBar'
import Carousel from './components/carousel'
import { BookContext } from './context/BookContext'

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { favorites, addFavorite, removeFavorite } = useContext(BookContext)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        // Fetch popular books from Open Library
        const response = await fetch('https://openlibrary.org/subjects/popular.json?limit=12')
        const data = await response.json()
        
        // Transform Open Library data to match our format
        const formattedBooks = data.works.map(work => ({
          id: work.key.replace('/works/', ''),
          title: work.title,
          author: work.authors?.[0]?.name || 'Unknown Author',
          cover: work.cover_id 
            ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`
            : '/book-placeholder.jpg',
          year: work.first_publish_year,
          rating: (work.ratings_average || Math.random() * 3 + 2).toFixed(1),
          description: work.first_publish_year 
            ? `Published in ${work.first_publish_year}`
            : 'Description not available'
        }))
        
        setBooks(formattedBooks)
      } catch (error) {
        console.error('Failed to fetch books:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBooks()
  }, [])

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Carousel />

      <main className="container mx-auto px-4 py-8">
        <FilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-black">Popular Books</h2>
          {loading ? (
            <div className="text-center py-12">Loading books...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onFavoriteToggle={() => {
                    const isFavorite = favorites.some(fav => fav.id === book.id)
                    isFavorite ? removeFavorite(book.id) : addFavorite(book)
                  }}
                  isFavorite={favorites.some(fav => fav.id === book.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}