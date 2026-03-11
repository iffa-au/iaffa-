"use client"

import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"
import { allFilms } from "@/data/films"
import FilmCard from "@/components/film-card"

const DEMO_TRAILER_URL = "https://youtu.be/oxkITW7kP7U"

const toYouTubeEmbedUrl = (url?: string) => {
  const fallback = "https://www.youtube.com/embed/oxkITW7kP7U?autoplay=1&rel=0"
  if (!url) return fallback

  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "")
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : fallback
    }

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v")
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : fallback
    }
  } catch {
    return fallback
  }

  return fallback
}

export default function AllFilmsPage() {
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const ITEMS_PER_PAGE = 30
  const totalPages = Math.ceil(allFilms.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedFilms = allFilms.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of films section
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen w-full pt-12 bg-black">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cinema.webp"
            alt="Theater interior"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-libre-baskerville text-4xl sm:text-5xl lg:text-6xl font-bold text-[#c18f2c] mb-6">
            All Films
          </h1>
          <p className="text-[#c18f2c] text-lg max-w-2xl mx-auto">
            Explore our complete collection of exceptional Arab cinema
          </p>
        </div>
      </section>

      {/* Films Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6 auto-rows-max">
            {paginatedFilms.map((film) => (
              <FilmCard
                key={film.slug}
                film={film}
                onTrailerClick={(url) => setActiveTrailer(toYouTubeEmbedUrl(url || DEMO_TRAILER_URL))}
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-16 flex-wrap">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === 1
                ? "bg-black border border-[#c18f2c]/30 text-[#c18f2c]/30 cursor-not-allowed"
                : "bg-black border border-[#c18f2c] text-[#c18f2c] hover:bg-[#c18f2c]/10"
            }`}
          >
            ← Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                currentPage === page
                  ? "bg-[#c18f2c] text-black"
                  : "bg-black border border-[#c18f2c] text-[#c18f2c] hover:bg-[#c18f2c]/10"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === totalPages
                ? "bg-black border border-[#c18f2c]/30 text-[#c18f2c]/30 cursor-not-allowed"
                : "bg-black border border-[#c18f2c] text-[#c18f2c] hover:bg-[#c18f2c]/10"
            }`}
          >
            Next →
          </button>
        </div>
      </section>

      {activeTrailer && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[95vw] max-w-3xl rounded-xl overflow-hidden bg-black border border-primary/40 shadow-2xl shadow-black/70">
            <div className="flex items-center justify-between px-3 py-2 bg-black/90 border-b border-primary/30">
              <p className="text-primary text-xs font-medium">Trailer</p>
              <button
                type="button"
                onClick={() => setActiveTrailer(null)}
                className="text-primary/90 hover:text-primary transition-colors"
                aria-label="Close trailer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={activeTrailer}
                title="Trailer player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
