import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || 'popular'
    
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`
    )
    const data = await response.json()

    const books = data.docs.map(doc => ({
      id: doc.key.replace('/works/', ''),
      title: doc.title,
      author: doc.author_name?.[0] || 'Unknown Author',
      cover: doc.cover_i 
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : '/book-placeholder.jpg',
      rating: (Math.random() * 3 + 2).toFixed(1),
      description: doc.first_publish_year 
        ? `First published in ${doc.first_publish_year}`
        : doc.subject?.[0] || 'No description available',
      year: doc.first_publish_year || null
    }))

    return NextResponse.json(books)
  } catch (error) {
    console.error('Open Library search error:', error)
    return NextResponse.json(
      { error: 'Failed to search books' },
      { status: 502 }
    )
  }
}