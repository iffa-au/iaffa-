import Image from "next/image"
import Link from "next/link"

const leadership = [
  {
    name: "Fahad Al Maimani",
    title: "Lecturer, Filmmaking | Board Member, Oman Film Society",
    image: "/images/fahad.webp",
    imagePosition: "center 22%",
    instagram: "@fahadmaimani",
    bio: `Fahad Al Maimani is an Omani academic, filmmaker, and cultural leader dedicated to advancing film education and independent cinema in Oman. He serves as a Lecturer in Filmmaking at the University of Technology and Applied Sciences (UTAS), where he contributes to the academic and practical development of emerging filmmakers.\n\nHe is a Board Member of the Oman Film Society and Head of the Local and International Cooperation Committee, working to strengthen international partnerships and promote Omani cinema globally. Fahad is also the Founder of the AKS Film Platform, an online initiative supporting independent filmmakers, and the Founder and Director of the AKS University Film Festival. He is currently preparing to organise the AKS International Film Festival, further expanding opportunities for filmmakers and cross-cultural collaboration.\n\nHis creative work has received recognition at several national and international festivals, with awards including Best Film, Best Documentary, and Best Cinematography. In addition to filmmaking, he contributes to the international film community as a festival jury member, including serving as Head of Jury at the Tangier Film Festival.\n\nFahad holds a Bachelor of Arts in Photography from the Creative Industries College at UTAS and a Master’s degree in Media from the University of Leicester, United Kingdom. More about his work and projects can be found at www.aksoman.om.`
  },
  {
    name: "Mohammed bin Abdullah Al-Ajmi",
    title: "Chairman, Oman Film Society | CEO, Silver Lens Production",
    image: "/images/mohammed.webp",
    imagePosition: "center 4%",
    instagram: "@alajmiphoto",
    bio: `Mohammed bin Abdullah Al-Ajmi is an Omani filmmaker, cinematographer, and cultural leader committed to developing the film industry in the Sultanate of Oman and across the Arab region. He currently serves as Chairman of the Oman Film Society and CEO of Silver Lens Production, where he supports emerging filmmakers and promotes Omani cinema internationally.\n\nAl-Ajmi holds a Bachelor’s degree in Radio and Television from Bayan College (affiliated with Purdue University, USA) and a Diploma in Photography from the Higher College of Technology. His creative work includes directing narrative and documentary films that explore Omani culture, heritage, and contemporary stories, with his films receiving recognition at several regional and international festivals.\n\nBeyond filmmaking, he is actively involved in film festival development and cultural initiatives. He is currently organising the Al Batinah International Film Festival and has served on international film festival juries. He also contributes to the industry through his role on the Script Approval Committee at the Ministry of Youth, Sports & Culture in Oman and as a member of the General Union of Arab Artists (2025–2029).\n\nThrough his work as a filmmaker and industry leader, Mohammed bin Abdullah Al-Ajmi continues to champion cinema as a platform for cultural dialogue and creative development in Oman and the wider region.`
  }
]

function renderBioWithLinks(bio: string) {
  const linkPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi

  return bio.split("\n\n").map((paragraph, paragraphIndex) => {
    const parts = paragraph.split(linkPattern)

    return (
      <p key={`paragraph-${paragraphIndex}`} className="mb-3 last:mb-0">
        {parts.map((part, partIndex) => {
          if (!part.match(linkPattern)) {
            return <span key={`text-${paragraphIndex}-${partIndex}`}>{part}</span>
          }

          const cleanPart = part.replace(/[),.;]+$/g, "")
          const trailing = part.slice(cleanPart.length)
          const href = cleanPart.startsWith("http") ? cleanPart : `https://${cleanPart}`

          return (
            <span key={`link-${paragraphIndex}-${partIndex}`}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c18f2c] underline decoration-[#c18f2c]/70 underline-offset-2 hover:text-yellow-400"
              >
                {cleanPart}
              </a>
              {trailing}
            </span>
          )
        })}
      </p>
    )
  })
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cinema.webp"
            alt="Cinema interior"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#c18f2c] mb-6">
            About the Festival
          </h1>
          <p className="text-[#c18f2c] text-lg max-w-2xl mx-auto">
            A platform for Arab voices, stories, and cinematic excellence
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 p-10 text-center">
            <p className="text-[#c18f2c] tracking-[0.2em] uppercase text-sm mb-4">Our Mission</p>
            <p className="text-gray-400 leading-relaxed text-lg">
              We connect Australian audiences with the vibrant world of Arab cinema through carefully curated film programs, industry events, and cultural exchanges. Our mission is to provide a platform that elevates Arab voices, supports emerging filmmakers, and builds bridges between cultures through the universal language of cinema.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 p-10 text-center">
            <p className="text-[#c18f2c] tracking-[0.2em] uppercase text-sm mb-4">Our Vision</p>
            <p className="text-gray-400 leading-relaxed text-lg">
              To be Australia&apos;s premier showcase of Arab cinema, fostering cross-cultural understanding and celebrating the artistic achievements of Arab filmmakers. We envision a future where Arab stories are recognized, appreciated, and celebrated as essential contributions to world cinema.
            </p>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-24 bg-black">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-12">
            <p className="text-[#c18f2c] tracking-[0.2em] uppercase text-sm mb-4">Our Goals</p>
            <h2 className="font-libre-baskerville text-3xl sm:text-4xl font-bold text-[#c18f2c] mb-6">
              What We Strive For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-8">
              <h3 className="font-libre-baskerville text-xl font-semibold text-[#c18f2c] mb-3">Cultural Bridge</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create meaningful connections between Arab and Australian cultures through the power of storytelling and shared cinematic experiences.
              </p>
            </div>
            <div className="bg-gray-900 p-8">
              <h3 className="font-libre-baskerville text-xl font-semibold text-[#c18f2c] mb-3">Filmmaker Support</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Provide emerging and established Arab filmmakers with platforms, resources, and opportunities to showcase their work and advance their careers.
              </p>
            </div>
            <div className="bg-gray-900 p-8">
              <h3 className="font-libre-baskerville text-xl font-semibold text-[#c18f2c] mb-3">Audience Engagement</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Engage diverse audiences across Australia, introducing them to the richness and diversity of Arab cinema and cultural narratives.
              </p>
            </div>
            <div className="bg-gray-900 p-8">
              <h3 className="font-libre-baskerville text-xl font-semibold text-[#c18f2c] mb-3">Industry Development</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Foster professional development through workshops, masterclasses, and networking opportunities that strengthen the global film industry.
              </p>
            </div>
            <div className="bg-gray-900 p-8">
              <h3 className="font-libre-baskerville text-xl font-semibold text-[#c18f2c] mb-3">Recognition & Excellence</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Recognize and celebrate excellence in Arab cinema through awards, showcases, and critical appreciation of outstanding filmmaking.
              </p>
            </div>
            <div className="bg-gray-900 p-8">
              <h3 className="font-libre-baskerville text-xl font-semibold text-[#c18f2c] mb-3">Long-term Impact</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Build a sustainable, long-term platform that continues to grow and evolve, leaving a lasting legacy for Arab cinema in Australia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-24 bg-black">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-12">
            <p className="text-[#c18f2c] tracking-[0.2em] uppercase text-sm mb-4">Our Objectives</p>
            <h2 className="font-libre-baskerville text-3xl sm:text-4xl font-bold text-[#c18f2c] mb-6">
              How We Achieve Our Goals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8">
              <h3 className="font-libre-baskerville text-xl font-semibold text-[#c18f2c] mb-4">Curate Exceptional Programs</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Select and showcase 50+ films annually from across the Arab world</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Present diverse genres including features, documentaries, shorts, and animations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Ensure representation from all 22 Arab countries</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8">
              <h3 className="font-libre-baskerville text-xl font-semibold text-[#c18f2c] mb-4">Foster Industry Connections</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Organize networking events connecting filmmakers with industry professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Facilitate co-production and collaboration opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Create mentorship programs pairing emerging talent with established filmmakers</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8">
              <h3 className="font-libre-baskerville text-xl font-semibold text-[#c18f2c] mb-4">Provide Educational Opportunities</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Conduct masterclasses and workshops on filmmaking techniques and industry practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Offer training programs in scriptwriting, directing, cinematography, and post-production</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Host panel discussions and Q&A sessions with filmmakers and industry experts</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8">
              <h3 className="font-libre-baskerville text-xl font-semibold text-[#c18f2c] mb-4">Build Community Engagement</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Engage with Arab diaspora communities across Australia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Partner with cultural organizations, universities, and community centers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Create accessible programming that welcomes audiences of all backgrounds</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Arab Cinema in Australia */}
      <section className="py-24 bg-black">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <p className="text-primary tracking-[0.2em] uppercase text-sm">Our Purpose</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#c18f2c] leading-tight">
                Why Arab Cinema in Australia
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Arab cinema represents a rich tapestry of cultures, languages, and perspectives from across 22 countries. In Australia, home to a vibrant Arab diaspora, these films provide both a connection to heritage and an opportunity for broader audiences to discover new perspectives.
              </p>
              <p className="text-gray-400 leading-relaxed">
                By showcasing Arab cinema, we celebrate diversity, challenge stereotypes, and highlight the creativity and resilience of Arab storytellers who continue to push boundaries in one of the world&apos;s most dynamic film traditions.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/arab-culture.webp"
                alt="Arab cultural heritage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border border-primary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-black">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#c18f2c] mb-6">
              Leadership & Expertise
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto" />
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {leadership.map((person) => (
                <div
                  key={person.name}
                  className="bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col gap-6 hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                    <div className="w-40 h-40 relative flex-shrink-0 rounded-full overflow-hidden border-4 border-[#c18f2c]">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover"
                        style={{ objectPosition: person.imagePosition }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 w-full sm:w-auto text-center sm:text-left relative">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2 pr-8 sm:pr-10">
                        <h3 className="font-serif text-2xl font-bold text-[#c18f2c]">{person.name}</h3>
                        <a
                          href={`https://instagram.com/${person.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#c18f2c] hover:text-yellow-400 absolute top-0 right-0"
                          aria-label={`Instagram of ${person.name}`}
                        >
                          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.5.2.8.4 1.2.8.4.4.6.7.8 1.2.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.5-.4.8-.8 1.2-.4.4-.7.6-1.2.8-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.5-.2-.8-.4-1.2-.8-.4-.4-.6-.7-.8-1.2-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7 .1c-1.3.1-2.2.3-3 .6-.8.3-1.5.7-2.1 1.3-.6.6-1 .1-1.3 2.1-.3.8-.5 1.7-.6 3C.1 8.3 0 8.7 0 12c0 3.3.1 3.7.1 5 .1 1.3.3 2.2.6 3 .3.8.7 1.5 1.3 2.1.6.6 1.3 1 2.1 1.3.8.3 1.7.5 3 .6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.1-1.3.6-.6 1-1.3 1.3-2.1.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.3-2.1-.6-.6-1.3-1-2.1-1.3-.8-.3-1.7-.5-3-.6C15.7.1 15.3 0 12 0z"/><path d="M12 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.3a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>
                        </a>
                      </div>
                      <p className="text-[#c18f2c] text-xs font-medium tracking-[0.16em] uppercase">{person.title}</p>
                    </div>
                  </div>
                  <div className="w-full text-gray-400 leading-relaxed text-sm">
                    {renderBioWithLinks(person.bio)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-lg mb-10">
            Join us in celebrating the power of Arab storytelling
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/program"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide hover:bg-primary/90 transition-colors text-center"
            >
              View Program
            </Link>
            <Link
              href="/membership"
              className="w-full sm:w-auto px-8 py-4 border border-[#c18f2c]/30 text-[#c18f2c] font-medium tracking-wide hover:border-primary hover:text-primary transition-colors text-center"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

