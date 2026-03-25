"use client"

import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { tr } from "date-fns/locale"
import { count } from "console"

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
    title: "Adam",
    director: "Oyatillo Ahmadillayev",
    country: "Uzbekistan",
    synopsis: "Adam is a powerful short film that explores themes of human dignity, loneliness, and social indifference. The film follows a man struggling with hunger and isolation in a society that often overlooks the suffering of ordinary people. Through a stark and symbolic narrative, Adam reflects on the contradictions of modern social systems and questions the false values that shape our world.",
      image: "/images/Films/Adam.webp",
    trailerUrl: "https://youtu.be/Py9b4CSs-0U",
  },
  
  {
    title: "RED ARM",
    director: "Soufiane Youssefi",
    country: "Morocco",
    synopsis: "This film tells the story of a woman struggling to assert herself in a traditional society that places strict limits on the role of women. Despite social, cultural, and economic challenges, our heroine emerges as a strong woman who leads change with her patience, awareness, and determination. Through her personal journey-whether in education, work, or the fight for her rights and the rights of other women-the film reflects a true picture of women's strength and ability to bring about profound",
    image: "/images/Films/Red_Arm.webp",
    trailerUrl: "https://youtu.be/XFYYWWAb-k0",
  },
   {
    title: "Pause",
    director: "Khaled Mursi Hammoud",
    country: "Egypt",
    synopsis: "In a nursing home for the elderly, an extraordinary bond forms between Dr. Selim and Hayat, a silent woman who cannot hear or speak, yet clings to one desire: the return of her absent son, Noor. To ease her loneliness, Selim invents imaginary phone calls, translating them into sign language in hopes of rekindling life in her weary heart. As he becomes immersed in the world he creates for her, he begins to see in her the reflection of his late mother, while she finds in him the son who never came.",
    image: "/images/Films/Pause.webp",
    trailerUrl: "https://youtu.be/zuN2NwvZYpw",
  },
  {

    title: "In The Name Of The Son",
    director: "Fares Ahmed Eltabey",
    country: "Egypt",
    synopsis: "A young man struggling with lonliness and alienation towards his father, Accepting a scholarship to study cinema inspires him to rediscover the paradise of his lost father.",
    image:"/images/Films/In_The_Name_Of_The_Son.webp",
    trailerUrl:"https://youtu.be/S-INgsYNMVk"
  },
  {
    title: "Damascus, The smile of Sadness",
    director: "Malas Twins",
    country: "Syrian Arab Republic",
    synopsis: "After the fall of the Syrian regime, a young man returns to his city of Damascus after 14 years of absence, in search of his home, which no longer exists even on the map. In his absurd journey, tinged with nostalgia and wonder, he encounters old friends, and the quest for a lost house turns into a bittersweet confrontation with the past and the present. بعد سقوط النظام السوري، يعود شاب إلى مدينته دمشق بعد غياب ١٤ سنة، باحثاً عن بيته الذي لم يعد موجوداً حتى على الخريطة. في رحلته العبثية الممزوجة بالحنين والدهشة، يلتقي بأصدقائه القدامى، لتتحول رحلة البحث عن منزل مفقود إلى مواجهة مرحة ومؤلمة مع الماضي والحاضر.",
    image: "/images/Films/Damascus_The_Smile_Of_Sadness.webp",
    trailerUrl: "https://youtu.be/XVN2Qmr2uGk",
  },
  {
    title: " Bird Trap",
    director: "Ahmad Khalil",
    country: "Egypt",
    synopsis: "An 8-year-old girl escapes her cruel reality by retreating into a fragile fantasy world, but the boundary between pain and imagination slowly blurs.",
    image: "/images/Films/Bird_Trap.webp",
    trailerUrl: "https://youtu.be/pPiTuIqyjQk"
  },
  {
    title: "Once Upon A Time In Shubra",
    director: "Martine Sameh Moris",
    country: "Egypt",
    synopsis: "Ayman is a young man in his late twenties whose life is different from everyone else's, and then his life changes after meeting a girl",
    image: "/images/Films/Once_Upon_A_Time_In_Shubra.webp",
    trailerUrl: "https://youtu.be/PNIMJ2OLD0k"
  },
  {
    title: "Helwan… why?!",
    director: "Martin Sameh Moris",
    country: "Egypt",
    synopsis: "Martin wonders why some people choose the same university as him, and ends up saying that it is not important what brought him and them to this university, but rather that he found himself in this university.",
    image: "/images/Films/Helwan_Why.webp",
    trailerUrl: "https://youtu.be/ZFGNf2m3fR4",
  },
  {
    title: "It was a Black Bag",
    director: "Mazen Mohamed Elsayed",
    country: "Egypt",
    synopsis: "A symbolic short film about a mysterious encounter with a black plastic bag. It reveals how our lives can be filled with unseen burdens that weigh us down — things we may not always notice, but that never truly leave us. Each of us carries a “black bag” that follows us, reminding us of what still lingers within. The film invites reflection on this inner struggle, as well as on the environmental impact of plastic that has become inseparable from our reality.",
    image: "/images/Films/It_Was_A_Black_Bag.webp",
    trailerUrl: "https://youtu.be/BZb8fkO5bKE",
  },
  {
    title: "I can smell a rat",
    director: "Antonious George Bassily",
    country: "Egypt",
    synopsis: "Maribel, 10, is surprised when her drama teacher tells her that she has to play Hamlet in the school play just 2 days before the show, as she is the only one available after the girl who was playing Hamlet got sick and won’t make it. Maribel faces the biggest decision of her life: what to do when she has never taken a part in a play before, other than being a set decoration. She goes home and spends the scariest night of her life with all her fears coming to life.",
    image: "/images/Films/I_Can_Smell_A_Rat.webp",
    trailerUrl: "https://youtu.be/9Nt9yYvXdpc",
  },
  {
    title: "The Last Bottle",
    director: "Mohammad Assaad Alhussaini",
    country: "Syrian Arab Republic",
    synopsis: "\"The reality becomes as an island, where 2 pirates are fighting over the last bottle of rum, The one who lose is the one who will remain sober\" A surreal world where a pirate battles with himself on a deserted island over the last bottle that washes ashore. He desperately tries to seize it because of a strong desire to escape his reality, but his own self, which has emerged from him, struggles to drink it before he can. This conflict manifests in strange and illogical surreal scenes that reflect the incomprehensible nature of experienced reality.",
    image: "/images/Films/The_Last_Bottle.webp",
    trailerUrl: "https://youtu.be/d-982jzZZyc",
  },
  {
    title: "Week off",
    director: "Kraiem Mohamed",
    country: "Tunisia",
    synopsis: "The director borrows a small handheld camera and returns to his hometown, the city of Gabès. He attempts to document events, people, and places through a blend of the present moment and nostalgia.",
    image: "/images/Films/Week_Off.webp",
    trailerUrl: "https://youtu.be/Sh2kH5IAHdg",
  },
  {
    title: "Returning from the ashes",
    director: "Said KHALFI",
    country: "Morocco",
    synopsis: "Returning from the Ashes (2026), directed by Said Khalfi, is a powerful and emotionally resonant short film that explores themes of loss, resilience, and personal rebirth. Through a reflective and atmospheric narrative, the film follows a journey shaped by hardship and transformation, where the past lingers but does not define the future. With a grounded yet evocative visual style, it captures the quiet strength required to rebuild oneself and rise again from adversity.",
    image: "/images/Films/Returning_From_The_Ashes.webp",
    trailerUrl: "https://youtu.be/DkcZPKSXLIY",
  },
  {
    title: "Made of Plastic",
    director: "Marwa Abd Elmoneim",
    country: "Egypt",
    synopsis: "Synopsis coming soon.",
    image: "/images/Films/Made_Of_Plastic.webp",
    trailerUrl: "",
  },
  {
    title: "She Narrated It",
    director: "Marwa Abd Elmoneim",
    country: "Egypt",
    synopsis: "Thus, She narrated, dealing with the decision to leave and the accompanying journey of persecution based on gender, repeated racial discriminiation and acts of violence that do not stop regardless of place or time; where women are the first to suffer while carrying the legacy of their culture on their backs and cruising them across continents.",
    image: "/images/Films/She_Narrated_It.webp",
    trailerUrl: "",
  },
  {
    title: "When Lucy Came",
    director: "Marwa Abd Elmoneim",
    country: "Egypt",
    synopsis: "Lucy works as a scientist trying to discover the planet by studying living organisms and conducting experiments on them, and her attempt to discover turned into a state of chaos and destruction.",
    image: "/images/Films/When_Lucy_Came.webp",
    trailerUrl: "",
  },
  {
    title: "Help Us, Our Lady",
    director: "Marwa Ali",
    country: "Egypt",
    synopsis: "Zainab's family is an anthropological/ethnographic study of an Egyptian family in 100 years, but the history is from the women's point of view, and the film is the first story in the book, which tells about my grandmother's mother dreaming of the good news that she is pregnant with my grandmother, Zainab. The film is an entry portal into the world of Zainab's family.",
    image: "/images/Films/Help_Us_Our_Lady.webp",
    trailerUrl: "",
  },
  {
    title: "Hard Days",
    director: "Marwa Ali",
    country: "Egypt",
    synopsis: "This film is one of the outputs of a storytelling and drawing workshop to teach Sudanese children in Cairo to make animated films to express their ideas, dreams, and vision of their world and what surrounds them. The film's story tells about the Corona pandemic and its impact on human relationships with persons living on the street and how these animals lived their lives in those days. The workshop was implemented with the support of the Al-Noon Foundation for Family Care and the Gang Academy for KKnowledge Training and Consultation.",
    image: "/images/Films/Hard_Days.webp",
    trailerUrl: "",
  },
  {
    title: "Shadow And Light",
    director: "Marwa Ali",
    country: "Egypt",
    synopsis: "It was produced as part of the 16-day campaign to combat violence against women in Egypt. It talks about violence at work and the failure to implement laws that protect working women in Egypt.",
    image: "/images/Films/Shadow_And_Light.webp",
    trailerUrl: "",
  },
  {
    title: "With The Bitterness Of Sugar",
    director: "Marwa Ali",
    country: "Egypt",
    synopsis: "The film tells the story of Safia, a strong Egyptian woman who stands up to social challenges, customs, traditions , and unemployement norms, and stands against her abusive husband who wants to marry off their daughter, and against her harrasing colleague at work, through empowering her with the necessary legal information from civil society association.",
    image: "/images/Films/With_The_Bitterness_Of_Sugar.webp",
    trailerUrl: "",
  },
  {
    title: "Miserable Island",
    director: "Marwa Ali",
    country: "Egypt",
    synopsis: "This film is the result of a workshop to educate Sudanese immigrant children in Egypt. Making animated films that express their ideas, dreams, and vision of their world and what surrounds them. The film talks about humans' relationship with the planet around them and their negative impact on it. The film deals with a man's relationship with a beautiful green island through their destruction of it over the years, leaving it alone after it turned yellow.",
    image: "/images/Films/Miserable_Island.webp",
    trailerUrl: "",
  },
  {
    title: "The Turtle",
    director: "Nouf Saad",
    country: "Saudi Arabia",
    synopsis: "The Turtle is a quiet, poetic short film about grief, healing, and the fragile courage it takes to keep going. In a solitary room, a woman forms a gentle bond with a small turtle — a silent companion that mirrors her own emotional retreat after loss. As she begins to care for it, she slowly reconnects with life, beauty, and herself. But when that delicate world is suddenly disrupted, the woman is forced to confront the truth of her pain and the thin line between comfort and escape. Told through silent film but rich visual symbolism, The Turtle explores how healing does not come through forgetting, but through learning to carry what we have lost — slowly, carefully, and with love.",
    image: "/images/Films/The_Turtle.webp",
    trailerUrl: "",
  },
  {
    title: "Under Occupation",
    director: "Anas Yahya",
    country: "Jordan",
    synopsis: "In the shade of occupation, this short film unfolds the tale of a Palestinian child, navigating through the labyrinth of occupation's shadows, where myriad challenges and tribulations punctuate her daily existence. She grapples with the loss of family members and the sanctity of her home, casualties to the ceaseless onslaughts and bombardments by Israeli forces. Witnessing her father's incarceration under the yoke of the occupation's arbitrary measures, the film poignantly portrays the indelible imprint of occupation on the lives of Palestinian children. Yet, amidst the bleakness, it captures their unwavering resilience and steadfast hope, defiantly clinging to the promise of a brighter tomorrow despite the formidable odds stacked against them.",
    image: "/images/Films/Under_Occupation.webp",
    trailerUrl: "",
  },
  {
    title: "Free Will",
    director: "Ghiya Rushidat",
    country: "United Arab Emirates",
    synopsis: "Poem written, music composed, video directed by Ghiya Rushidat",
    image: "/images/Films/Free_Will.webp",
    trailerUrl: "",
  },
  {
    title: "Sea Of Hope",
    director: "Jubrail Abubaker Rahman",
    country: "Iraq",
    synopsis: "Sea of Hope\" is a short film that unveils the devastating human toll of war through the eyes of civilians trapped in its wake. Focusing on the emotional and physical scars of forced displacement, the film traces the journeys of individuals forced to flee their homes, risking everything as they navigate treacherous paths—where death and drowning loom at every turn—in a desperate quest for safety and a life of dignity.",
    image: "/images/Films/SEA_OF_HOPE.webp",
    trailerUrl: "",
  },
  {
    title: "The Smell Of Henna",
    director: "Louay Rezgui",
    country: "Tunisia",
    synopsis: "Tunisia, the year 2000. In a country undergoing transformation and grappling with a deep identity crisis, Lamia, a young woman, prepares for her wedding. Amid the turmoil of traditions and the chaos of the Henna ritual, she finds herself facing much more than a mere celebration…",
    image: "/images/Films/The_Smell_Of_Henna.webp",
    trailerUrl: "",
  },
  {
    title: "All from one cell",
    director: "Marwa Abd Elmoneim",
    country: "Egypt",
    synopsis: "Synopsis coming soon.",
    image: "/images/Films/All_From_One_Cell.webp",
    trailerUrl: "",
  },
  {
    title: "Broken Whispers",
    director: "Amir Athar Soheili, Amir Masoud Soheili",
    country: "Iran",
    synopsis: "Weary of the creative process, an old painter fixes a broken instrument he finds in the rubble. When his students go around looking for someone who can play the instrument, they meet other artists bearing the scars of war.",
    image: "/images/Films/Broken_Whispers.webp",
    trailerUrl: "",
  },
  {
    title: "An Almost Ordinary Day",
    director: "Slim Belhiba",
    country: "Tunisia",
    synopsis: "On the eve of their trip to France to attend their only daughter’s wedding, Fatma is left to face alone a humiliating incident involving her husband, Taoufik. What began as an ordinary day soon unravels into a turning point that will change their lives forever.",
      image: "/images/Films/An_almost_ordinary_day.webp",
    trailerUrl: "",
  }
]

export function FeaturedFilmsSection() {
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null)
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})
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

  const toggleFlip = (idx: number) => {
    setFlippedCards((prev) => ({ ...prev, [idx]: !prev[idx] }))
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
            const isFlipped = !!flippedCards[idx]

            return (
              <div
                key={`${film.title}-${idx}`}
                className="group flex-shrink-0 w-64 animate-fade-in slide-card transition-all duration-300"
                style={{
                  animation: `fadeInScale 0.6s ease-out ${idx * 0.1}s both`,
                  scrollSnapAlign: 'start',
                }}
              >
                <div
                  className="relative aspect-[3/4] mb-3"
                  onClick={() => toggleFlip(idx)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-500 ease-out"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-lg cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:overflow-visible bg-black shadow-lg group-hover:shadow-2xl group-hover:shadow-primary/30"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Image
                        src={film.image || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-cover blur-md opacity-60"
                        aria-hidden="true"
                      />

                      <Image
                        src={film.image || "/placeholder.svg"}
                        alt={film.title}
                        fill
                        className="object-contain relative z-10"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-eerie-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-30">
                        <h3 className="font-libre-baskerville text-lg sm:text-xl font-semibold text-primary mb-1 line-clamp-2">
                          {film.title}
                        </h3>
                        <p className="text-primary text-sm line-clamp-1">Dir. {film.director}</p>
                        <p className="text-primary text-sm mb-3">{film.country}</p>

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

                    {/* Back */}
                    <div
                      className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg p-4 flex flex-col justify-between"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div>
                        <h3 className="font-libre-baskerville text-xl font-bold text-[#C9A84F] mb-3 line-clamp-2">
                          {film.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Director</p>
                        <p className="text-sm text-gray-100 mb-2 line-clamp-2">{film.director}</p>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Country</p>
                        <p className="text-sm text-gray-100 mb-3">{film.country}</p>
                        {film.synopsis && (
                          <>
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Synopsis</p>
                            <p className="text-xs text-gray-200 leading-relaxed line-clamp-6">{film.synopsis}</p>
                          </>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 text-center">Click to close</p>
                    </div>
                  </div>
                </div>
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
