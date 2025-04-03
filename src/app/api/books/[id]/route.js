import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { id } = params
    const res = await fetch(`https://openlibrary.org/works/${id}.json`)
    
    if (!res.ok) throw new Error('Book not found')
    
    const data = await res.json()
    
    const book = {
      id,
      title: data.title,
      description: typeof data.description === 'string' 
        ? data.description 
        : data.description?.value || 'No description available',

    }
    
    return NextResponse.json(book)
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch book' },
      { status: 404 }
    )
  }
}