"use client"
import { useState } from 'react'

export default function FilterBar({ searchTerm, setSearchTerm }) {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: ''
  })

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 
    'Science Fiction', 'Biography', 'History'
  ]

  const years = Array.from({ length: 30 }, (_, i) => 2023 - i)
  const ratings = [1, 2, 3, 4, 5]

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setFilters({ genre: '', year: '', rating: '' })
    setSearchTerm('')
  }

  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Books
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Title or author..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black" // Added text-black
          />
        </div>

        {/* Genre Filter */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
            className="w-full md:w-40 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black" // Added text-black
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre} className="text-black">{genre}</option> // Added text-black
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="w-full md:w-28 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black" // Added text-black
          >
            <option value="">Any Year</option>
            {years.map(year => (
              <option key={year} value={year} className="text-black">{year}</option> // Added text-black
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Min Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="w-full md:w-20 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black" // Added text-black
          >
            <option value="">Any</option>
            {ratings.map(rating => (
              <option key={rating} value={rating} className="text-black">{rating}+</option> // Added text-black
            ))}
          </select>
        </div>

        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  )
}