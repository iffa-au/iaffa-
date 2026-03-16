"use client"

import Image from "next/image"
import { useState } from "react"
import { Play } from "lucide-react"
import type { Film } from "@/data/films"

interface FilmCardProps {
  film: Film
  onTrailerClick?: (url?: string) => void
}

export default function FilmCard({ film, onTrailerClick }: FilmCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="group cursor-pointer h-[480px] sm:h-[500px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front - Poster */}
        <div
          className="absolute w-full h-full rounded-lg overflow-hidden bg-gray-900 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="relative aspect-[3/4] w-full h-full">
            {/* Blurred background */}
            <Image
              src={film.image}
              alt=""
              fill
              className="object-cover blur-md opacity-60"
              aria-hidden="true"
            />
            
            {/* Main poster */}
            <Image
              src={film.image}
              alt={film.title}
              fill
              className="object-contain relative z-10"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20 pointer-events-none" />

            {/* Film info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
              <h3 className="font-libre-baskerville text-base font-semibold text-[#C9A84F] mb-0.5 line-clamp-2">
                {film.title}
              </h3>
              <p className="text-[#C9A84F]/80 text-xs mb-3 line-clamp-1">Dir. {film.director}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onTrailerClick?.(film.trailerUrl)
                }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/80 hover:bg-primary text-black rounded-full text-xs font-medium transition-colors duration-300"
              >
                <Play className="w-4 h-4 fill-black" />
                Trailer
              </button>
            </div>
          </div>
        </div>

        {/* Back - Details */}
        <div
          className="absolute w-full h-full rounded-lg overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <h3 className="font-libre-baskerville text-2xl sm:text-3xl font-bold text-[#C9A84F] mb-4 line-clamp-2">
              {film.title}
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Director</p>
                <p className="text-base sm:text-lg text-gray-100">{film.director}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Country</p>
                <p className="text-base sm:text-lg text-gray-100">{film.country}</p>
              </div>
            </div>
          </div>

          {film.synopsis && (
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Synopsis</p>
              <p className="text-sm sm:text-base text-gray-200 line-clamp-7 leading-relaxed">
                {film.synopsis}
              </p>
            </div>
          )}

          <p className="text-xs text-gray-500 text-center mt-4">Click to close</p>
        </div>
      </div>
    </div>
  )
}
