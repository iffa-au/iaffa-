"use client"

import Image from "next/image"
import { useState } from "react"
import type { Film } from "@/data/films"

interface FilmCardProps {
  film: Film
}

export default function FilmCard({ film }: FilmCardProps) {
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

            {/* Overlay hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end justify-center pb-4">
              <p className="text-white text-sm font-medium">Click to view details</p>
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
            <h3 className="font-libre-baskerville text-3xl sm:text-4xl font-bold text-[#C9A84F] mb-6 line-clamp-3">
              {film.title}
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Director</p>
                <p className="text-base sm:text-lg text-gray-100">{film.director}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Country</p>
                <p className="text-base sm:text-lg text-gray-100">{film.country}</p>
              </div>
              
              {film.language && (
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Language</p>
                  <p className="text-base sm:text-lg text-gray-100">{film.language}</p>
                </div>
              )}
            </div>
          </div>

          {film.synopsis && (
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">Synopsis</p>
              <p className="text-sm sm:text-base text-gray-200 line-clamp-4 leading-relaxed">
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
