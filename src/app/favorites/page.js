"use client"
import { useContext } from 'react'
import BookCard from '../components/BookCard' 
import { BookContext } from '../context/BookContext'

export default function FavoritesPage() {
  const { favorites } = useContext(BookContext)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-8">Your Favorite Books</h1>
          
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">You haven't saved any favorites yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onFavoriteToggle={() => removeFavorite(book.id)}
                  isFavorite={true}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}