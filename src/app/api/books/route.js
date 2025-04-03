import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch popular books from Open Library API
    const response = await fetch('https://openlibrary.org/subjects/popular.json?limit=12')
    const data = await response.json()

    // Transform Open Library data to match our format
    const books = data.works.map(work => {
      const coverId = work.cover_id || work.cover_edition_key
      return {
        id: work.key.replace('/works/', ''),
        title: work.title,
        author: work.authors?.[0]?.name || 'Unknown Author',
        cover: coverId 
          ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
          : '/book-placeholder.jpg',
        rating: (Math.random() * 3 + 2).toFixed(1), // Random rating 2.0-5.0
        description: work.first_publish_year 
          ? `First published in ${work.first_publish_year}`
          : 'No description available',
        year: work.first_publish_year || null
      }
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error('Open Library API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books from Open Library' },
      { status: 502 } // Bad Gateway
    )
  }
}