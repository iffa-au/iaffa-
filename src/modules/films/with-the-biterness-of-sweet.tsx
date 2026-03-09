"use client"

import Image from "next/image"
import Link from "next/link"

export default function WithTheBiternessOfSweetFilmPage() {
  return (
    <main className="min-h-screen w-full pt-12 bg-black">
      <div className="w-full bg-black">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12">
          <div className="relative overflow-hidden rounded-lg shadow-2xl max-w-2xl mx-auto">
            <Image
              src="/images/Films/Side_Time.webp"
              alt="With the biterness of Sweet - Film Poster"
              width={800}
              height={1200}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-black">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4 text-champagne">With the biterness of Sweet</h1>

              <div className="bg-gray-900 border-l-4 border-[#C9A84F] p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-champagne">Film Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-champagne/70 font-semibold">Director</p>
                    <p className="text-lg text-champagne/90">Marwa Ali</p>
                  </div>
                  <div>
                    <p className="text-sm text-champagne/70 font-semibold">Country</p>
                    <p className="text-lg text-champagne/90">Egypt</p>
                  </div>
                  <div>
                    <p className="text-sm text-champagne/70 font-semibold">Language</p>
                    <p className="text-lg text-champagne/90">Arabic</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-champagne">Synopsis</h3>
                <p className="text-lg text-champagne/85 leading-relaxed">
                  The film tells the story of Safia, a strong Egyptian woman who stands up to social challenges, customs, traditions , and unemployement norms, and stands against her abusive husband
                  who wants to marry off their daughter, and against her harrasing colleague at work, through empowering her with the necessary legal information from civil society association.

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}