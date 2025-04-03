import { BookProvider } from './context/BookContext'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BookProvider>
          {children}
        </BookProvider>
      </body>
    </html>
  )
}