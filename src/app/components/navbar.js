"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  
  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">BookFinder</Link>
        <div className="flex space-x-4">
          <Link href="/books" className="hover:text-blue-200">Books</Link>
          <Link href="/favorites" className="hover:text-blue-200">Favorites</Link>
        </div>
      </div>
    </nav>
  )
}