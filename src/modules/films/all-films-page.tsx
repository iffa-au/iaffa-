"use client"

import Image from "next/image"
import { allFilms } from "@/data/films"
import FilmCard from "@/components/film-card"

export default function AllFilmsPage() {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
            {allFilms.map((film) => (
              <FilmCard key={film.slug} film={film} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
