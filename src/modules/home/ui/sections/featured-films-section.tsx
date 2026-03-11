"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const DEMO_TRAILER_URL = "https://youtu.be/oxkITW7kP7U"

const toYouTubeEmbedUrl = (url: string) => {
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

const featuredFilms = [
  {
    title: "The Kingdom of the mono-cell",
    director: "Marwa Abd Elmoneim",
    country: "Egypt",
      image: "/images/Films/The_kingdom_of_the_mono-cell.webp",
    trailerUrl: "",
  },
  {
    title: "Made of Plastic",
    director: "Marwa Abd Elmoneim",
    country: "Egypt",
    image: "/images/Films/Made_Of_Plastic.webp",
    trailerUrl: "",
  },
  {
    title: "All from one cell",
    director: "Marwa Abd Elmoneim",
    country: "Egypt",
    image: "/images/Films/All_From_One_Cell.webp",
    trailerUrl: "",
  },
  {
    title: "She Narrated It",
    director: "Marwa Abd Elmoneim",
    country: "Egypt",
    image: "/images/Films/She_Narrated_It.webp",
    trailerUrl: "",
  },
  {
    title: "When Lucy Came",
    director: "Marwa Abd Elmoneim",
    country: "Egypt",
    image: "/images/Films/When_Lucy_Came.webp",
    trailerUrl: "",
  },
  {
    title: "Help Us, Our Lady",
    director: "Marwa Ali",
    country: "Egypt",
    image: "/images/Films/Help_Us_Our_Lady.webp",
    trailerUrl: "",
  },
  {
    title: "Hard Days",
    director: "Marwa Ali",
    country: "Egypt",
    image: "/images/Films/Hard_Days.webp",
    trailerUrl: "",
  },
  {
    title: "Shadow And Light",
    director: "Marwa Ali",
    country: "Egypt",
    image: "/images/Films/Shadow_And_Light.webp",
    trailerUrl: "",
  },
  {
    title: "With The Bitterness Of Sugar",
    director: "Marwa Ali",
    country: "Egypt",
    image: "/images/Films/With_The_Bitterness_Of_Sugar.webp",
    trailerUrl: "",
  },
  {
    title: "Miserable Island",
    director: "Marwa Ali",
    country: "Egypt",
    image: "/images/Films/Miserable_Island.webp",
    trailerUrl: "",
  },
  {
    title: "The Turtle",
    director: "Nouf Saad",
    country: "Saudi Arabia",
    image: "/images/Films/The_Turtle.webp",
    trailerUrl: "https://www.youtube.com/watch?v=",
  },
  {
    title: "Under Occupation",
    director: "Anas Yahya",
    country: "Jordan",
    image: "/images/Films/Under_Occupation.webp",
    trailerUrl: "https://www.youtube.com/watch?v=",
  },
  {
    title: "Free Will",
    director: "Ghiya Rushidat",
    country: "United Arab Emirates",
    image: "/images/Films/Free_Will.webp",
    trailerUrl: "https://www.youtube.com/watch?v=",
  },
  {
    title: "Sea Of Hope",
    director: "Jubrail Abubaker Rahman",
    country: "Iraq",
    image: "/images/Films/SEA_OF_HOPE.webp",
    trailerUrl: "https://www.youtube.com/watch?v=",
  },
  {
    title: "The Smell Of Henna",
    director: "Louay Rezgui",
    country: "Tunisia",
    image: "/images/Films/The_Smell_Of_Henna.webp",
    trailerUrl: "https://www.youtube.com/watch?v=",
  },
  {
    title: "In The Red",
    director: "Dawan Nazad Majeed",
    country: "Iraq",
    image: "/images/Films/In_the_red.webp",
    trailerUrl: "https://www.youtube.com/watch?v=",
  },
  {
    title: "Broken Whispers",
    director: "Amir Athar Soheili, Amir Masoud Soheili",
    country: "Iran",
    image: "/images/Films/Broken_Whispers.webp",
    trailerUrl: "https://www.youtube.com/watch?v=",
  },
  {
    title: "An Almost Ordinary Day",
    director: "Slim Belhiba",
    country: "Tunisia",
      image: "/images/Films/An_almost_ordinary_day.webp",
    trailerUrl: "https://www.youtube.com/watch?v=",
  }
]

export function FeaturedFilmsSection() {
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll carousel continuously
  useEffect(() => {
    if (!isAutoPlay || !scrollContainerRef.current) return

    const autoScroll = () => {
      const container = scrollContainerRef.current
      if (container) {
        const scrollAmount = 816 // Scroll 3 films at a time (w-64 + gap-6 × 3)
        const maxScroll = container.scrollWidth - container.clientWidth

        if (container.scrollLeft + scrollAmount >= maxScroll - 10) {
          // Reset to beginning when reaching end
          container.scrollLeft = 0
        } else {
          container.scrollLeft += scrollAmount
        }
      }
    }

    const timer = setInterval(autoScroll, 4000)
    return () => clearInterval(timer)
  }, [isAutoPlay])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 816
      const newScrollLeft =
        container.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount)
      
      container.scrollLeft = newScrollLeft
      
      // Pause auto-play temporarily when user clicks
      setIsAutoPlay(false)
      
      // Resume auto-play after 6 seconds of inactivity
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current)
      }
      autoPlayTimeoutRef.current = setTimeout(() => {
        setIsAutoPlay(true)
      }, 2000)
    }
  }

  const handleMouseEnter = () => {
    setIsAutoPlay(false)
  }

  const handleMouseLeave = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current)
    }
    setIsAutoPlay(true)
  }

  return (
    <section 
      className="py-24 border-0" 
      style={{ border: 'none', boxShadow: 'none', marginTop: 0, backgroundColor: '#000000' }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-3">Now Showing</p>
            <h2 className="font-libre-baskerville text-3xl sm:text-4xl font-bold text-[#c18f2c]">
              Featured Films
            </h2>
          </div>
          {/* Navigation Arrows */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => scroll('left')}
              className="p-2 text-primary hover:bg-primary/10 transition-all duration-300 rounded-full hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 text-primary hover:bg-primary/10 transition-all duration-300 rounded-full hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Continuous Scrolling Films. */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar film-carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            scrollBehavior: 'smooth',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            scrollSnapType: 'x mandatory',
          }}
        >
          {featuredFilms.map((film, idx) => {
            const filmSlug = film.title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .replace(/^-|-$/g, "")
            return (
              <div
                key={`${film.title}-${idx}`}
                className="group flex-shrink-0 w-64 animate-fade-in slide-card transition-all duration-300"
                style={{
                  animation: `fadeInScale 0.6s ease-out ${idx * 0.1}s both`,
                  scrollSnapAlign: 'start',
                }}
              >
                <Link href={`/films/${filmSlug}`}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3 cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:overflow-visible bg-black shadow-lg group-hover:shadow-2xl group-hover:shadow-primary/30">
                    {/* Blurred background layer */}
                    <Image
                      src={film.image || "/placeholder.svg"}
                      alt=""
                      fill
                      className="object-cover blur-md opacity-60"
                      aria-hidden="true"
                    />
                    
                    {/* Main poster on top */}
                    <Image
                      src={film.image || "/placeholder.svg"}
                      alt={film.title}
                      fill
                      className="object-contain relative z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-eerie-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                    
                    {/* Content on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-30">
                      <h3 className="font-libre-baskerville text-lg sm:text-xl font-semibold text-primary mb-1 line-clamp-2">
                        {film.title}
                      </h3>
                      <p className="text-primary text-sm line-clamp-1">Dir. {film.director}</p>
                      <p className="text-primary text-sm mb-3">{film.country}</p>
                      
                      {/* Trailer Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setActiveTrailer(toYouTubeEmbedUrl(film.trailerUrl || DEMO_TRAILER_URL))
                        }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/80 hover:bg-primary text-black rounded-full text-xs font-medium transition-colors duration-300"
                      >
                        <Play className="w-4 h-4 fill-black" />
                        Trailer
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="lg:hidden flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => scroll('left')}
            className="p-2 text-primary hover:bg-primary/10 transition-all duration-300 rounded-full hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 text-primary hover:bg-primary/10 transition-all duration-300 rounded-full hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center justify-center mt-12">
          <a
            href="/films/all"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84F] hover:bg-[#B8982A] text-black rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <span>View All Films</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

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
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideFromLeft {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeInScale 0.6s ease-out forwards;
        }

        .slide-card {
          animation: slideFromLeft 0.6s ease-out forwards;
          filter: brightness(1);
        }

        .film-carousel:has(.group:hover) .slide-card:not(:hover) {
          filter: brightness(0.6);
        }

        .slide-card:hover {
          filter: brightness(1.2);
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
