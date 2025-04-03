"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function BookCard({ book, onFavoriteToggle, isFavorite }) {
  const [imgSrc, setImgSrc] = useState("/book-placeholder.jpg");

  useEffect(() => {
    if (book.cover_id) {
      const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;
      // Test if the image exists
      const img = new Image();
      img.src = coverUrl;
      img.onload = () => setImgSrc(coverUrl);
      img.onerror = () => setImgSrc("/book-placeholder.jpg");
    }
  }, [book.cover_id]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow hover:transform hover:scale-105 duration-200">
      <div className="relative h-48">
        <Image
          src={imgSrc}
          alt={`${book.title} cover`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc("/book-placeholder.jpg")}
          priority={false}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-2" title={book.title}>
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm truncate" title={book.author}>
          {book.author || "Unknown Author"}
        </p>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{book.rating || "N/A"}</span>
            {book.year && (
              <span className="text-gray-500 text-sm ml-2">({book.year})</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (typeof onFavoriteToggle === "function") {
                onFavoriteToggle();
              } else {
                console.warn("onFavoriteToggle is not a function");
              }
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-100 hover:bg-blue-200 text-blue-800"
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "Remove" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
