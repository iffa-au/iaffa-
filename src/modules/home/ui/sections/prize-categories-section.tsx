import Link from "next/link"
import Image from "next/image"

const prizes = [
  {
    title: "Best Feature Film",
    slug: "best-feature-film",
    icon: "movie",
    subtitle: "Premier Award",
    description: "Honoring the most outstanding cinematic achievement in feature-length storytelling, evaluating direction, narrative, and technical excellence."
  },
  {
    title: "Best Documentary",
    slug: "best-documentary",
    icon: "videocam",
    subtitle: "Non-fiction Excellence",
  },
  {
    title: "Best Short Film",
    slug: "best-short-film", 
    icon: "shutter_speed",
    subtitle: "Concise Storytelling",
  },
  {
    title: "Best Director",
    slug: "best-director",
    icon: "person",
    subtitle: "Visionary Leadership",
  },
  {
    title: "Best Cinematography",
    slug: "best-cinematography",
    icon: "camera",
    subtitle: "Visual Artistry",
  },
  {
    title: "Audience Choice Award",
    slug: "audience-choice-award",
    icon: "favorite_border",
    subtitle: "Public Favorite",
  }
]

export function PrizeCategoriesSection() {
  const featuredPrize = prizes[0]

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 px-4">
         
          <h2 className="font-serif text-5xl md:text-6xl text-[#c18f2c] mb-6">
            Prize Categories
          </h2>
          {/* <div className="w-24 h-0.5 bg-[#c18f2c] mx-auto opacity-50"></div> */}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Hero Image Card */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-lg aspect-video lg:aspect-auto lg:h-auto border border-white/10">
            <Image
              src="/images/ceremony-1.webp"
              alt="Cinematic movie set background"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Featured overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <div className="flex items-center gap-3 text-[#c18f2c] mb-4">
                <span className="material-icons text-lg">stars</span>
                <span className="uppercase tracking-widest text-xs font-bold">Premier Award</span>
              </div>
              <h3 className="font-serif text-4xl md:text-5xl text-[#c18f2c] mb-4">
                {featuredPrize.title}
              </h3>
              <p className="text-slate-300 max-w-lg mb-8 font-light leading-relaxed">
                {featuredPrize.description}
              </p>
              <Link
                href="/prizes"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-[#c18f2c] text-xs uppercase tracking-[0.3em] transition-all font-medium text-white hover:text-[#c18f2c] rounded-lg"
              >
                View All Categories
              </Link>
            </div>
          </div>

          {/* Sidebar List */}
          <div className="lg:col-span-5">
            
            <div className="overflow-y-auto pr-4 space-y-4 custom-scrollbar">
              {prizes.slice(1).map((prize) => (
                <Link
                  key={prize.title}
                  href={`/prizes/${prize.slug}`}
                  className="group p-6 bg-slate-800/50 border border-white/5 hover:border-[#c18f2c]/50 transition-all cursor-pointer flex items-center justify-between rounded-lg"
                >
                  <div className="flex items-center gap-6">
                    <span className="material-icons text-[#c18f2c] text-xl group-hover:scale-110 transition-transform">
                      {prize.icon}
                    </span>
                    <div>
                      <h5 className="font-serif text-xl text-[#c18f2c] mb-1">
                        {prize.title}
                      </h5>
                      <p className="text-xs text-slate-500 uppercase tracking-tighter">
                        {prize.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="material-icons text-[#c18f2c] opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                    chevron_right
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Divider */}
        {/* <div className="w-full flex items-center justify-center gap-12 opacity-40">
          <div className="h-px bg-slate-400 flex-1"></div>
          <div className="flex items-center gap-4 text-[#c18f2c]">
            <span className="material-icons text-sm">circle</span>
            <span className="material-icons text-lg">circle</span>
            <span className="material-icons text-sm">circle</span>
          </div>
          <div className="h-px bg-slate-400 flex-1"></div>
        </div> */}
      </div>
    </section>
  )
}
