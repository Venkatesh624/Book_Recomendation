"use client"
import { createContext, useState, useEffect } from 'react'

export const BookContext = createContext()

export function BookProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('bookFavorites')
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites))
  }, [])

  const addFavorite = (book) => {
    const updatedFavorites = [...favorites, book]
    setFavorites(updatedFavorites)
    localStorage.setItem('bookFavorites', JSON.stringify(updatedFavorites))
  }

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(book => book.id !== id)
    setFavorites(updatedFavorites)
    localStorage.setItem('bookFavorites', JSON.stringify(updatedFavorites))
  }

  return (
    <BookContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </BookContext.Provider>
  )
}