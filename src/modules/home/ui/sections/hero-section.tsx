"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const [videoUrl, setVideoUrl] = useState("https://dhbdzeb2cbayq.cloudfront.net/aiffa/videos/hero.m3u8")

  const promotedMovies = [
    {
      title: "Rooted",
      country: "Oman",
      director: "Sultan Al Qamshouai",
      synopsis:
        "A thirty-year-old son returns to the mountain home he abandoned, where his dying mother's last wish forces him to face the woman, the land, and the legacy he left behind.",
      poster: "/images/Films/rooted.webp",
      posterAlt: "Rooted Poster",
    },
    {
      title: "Wahm",
      country: "Oman",
      director: "Issa Alsubhi",
      synopsis:
        "An unsettled academic seeks solace in the mountains to escape his inner conflicts, only to confront the idea that the forces binding humanity may be enduring illusions.",
      poster: "/images/Films/wahm.webp",
      posterAlt: "Wahm Poster",
    },
  ]

  useEffect(() => {
    async function fetchTenantConfig() {
      try {
        const response = await fetch('/api/tenant/config');
        if (response.ok) {
          const data = await response.json();
          if (data && data.HeroVideoURL) {
            setVideoUrl(data.HeroVideoURL);
          }
        }
      } catch (error) {
        console.error("Error fetching tenant config:", error);
      }
    }
    
    fetchTenantConfig();
  }, []);

  return (
    <section className="w-full">
      {/* LOGO SECTION */}
      <div
        className="w-full pt-24 pb-8"
        style={{ background: "black", minHeight: "200px" }} 
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 flex justify-center">
          <Image
            src="/images/aiffalogo-bg.webp"  
            alt="AIFFA – Arab International Film Festival of Australia"
            width={520}
            height={100}
            priority
            className="h-auto w-[280px] sm:w-[360px] md:w-[460px]"
          />
        </div>
      </div>

      {/* VIDEO SECTION */}
      <div
        className="w-full pt-28 pb-20"
        style={{ backgroundColor: "#000000" }} 
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="mb-3 text-left text-sm sm:text-base uppercase tracking-widest text-[#c18f2c]">
            Experience a Gift for Life
          </p>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/30 shadow-2xl bg-black/30">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 z-10 rounded-2xl pointer-events-none" style={{background: "linear-gradient(to bottom, rgba(201,168,79,0.15) 0%, rgba(0,0,0,0.15) 100%)"}} />
              <video
                className="h-full w-full object-cover rounded-2xl border-2 border-[#C9A84F] z-0"
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/hero-poster.jpg"
              >
                <source
                  src={videoUrl}
                  type="application/x-mpegURL"
                />
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION + CTA SECTION */}
      <div
        className="w-full pt-12 py-10"
        style={{ backgroundColor: "#000000" }} 
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
          <p className="font-libre-baskerville text-center text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mb-10" style={{ color: "#C9A84F" }}>
            AIFFA was established through a collaboration between the Oman Film Society and the
            International Film Festival of Australia (IFFA) to connect Omani and Arab filmmakers with
            Australia on an international platform, supporting youth and emerging talent through
            creative exchange, skills development, and global industry access.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/submissions"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide hover:bg-primary/90 transition-colors text-center"
            >
              Submit Film
            </Link>
            <Link
              href="/program"
              className="w-full sm:w-auto px-8 py-4 border border-champagne/30 text-champagne font-medium tracking-wide hover:border-primary hover:text-primary transition-colors text-center"
            >
              View Program
            </Link>
          </div>
        </div>
      </div>

      {/* PROMOTED PARTNER MOVIES SECTION */}
      <div className="w-full py-20" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-20">
            
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {promotedMovies.map((movie, index) => (
              <article key={movie.title}>
                {/* Big Poster */}
                <div className="relative mb-8 overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 border-4 border-white/20 bg-black/20">
                  <Image
                    src={movie.poster}
                    alt={movie.posterAlt}
                    width={800}
                    height={1200}
                    className="w-full h-[600px] md:h-[700px] lg:h-[800px] object-cover transition-transform duration-700"
                    priority={index < 2}
                  />

                  

                  <div className="absolute top-4 left-4 z-20 px-4 py-2 rounded-full bg-black/70 border border-[#C9A84F]/50">
                    <p className="text-[#C9A84F] text-sm md:text-base font-semibold">{movie.title}</p>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Synopsis */}
                <div className="text-center md:text-left px-4 md:px-0">
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-[#C9A84F]" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                    {movie.title}
                  </h3>
                  <h2 className="text-lg md:text-xl font-semibold mb-5 leading-tight text-[#C9A84F]/90" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}>
                    {movie.country}  <br></br>
                    Dir. {movie.director}
                  </h2>
                  <p className="text-lg md:text-xl text-[#E6D4A3] leading-relaxed max-w-2xl mx-auto md:mx-0 font-light">
                    {movie.synopsis}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
