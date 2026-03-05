"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const [videoUrl, setVideoUrl] = useState("https://dhbdzeb2cbayq.cloudfront.net/aiffa/videos/hero.m3u8")

  useEffect(() => {
    // // local testing with tenant config API
    // async function fetchTenantConfig() {
    //   try {
    //     const response = await fetch('/api/tenant/config', {
    //       headers: {
    //         // Replace this with a DomainName that ACTUALLY exists 
    //         // in your DynamoDB "TenantConfigs" table!
    //         'x-tenant-domain': 'aiffa.com.au'
    //       }
    //     });
        
    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log("DynamoDB Data received:", data); // Check the terminal/browser console!
          
    //       if (data && data.heroVidUrl) {
    //         setVideoUrl(data.heroVidUrl);
    //       }
    //     }
    async function fetchTenantConfig() {
      try {
        const response = await fetch('/api/tenant/config');
        if (response.ok) {
          const data = await response.json();
          // Use HeroVideoURL from API response if it exists
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
        className="w-ful
        
        
        
        
        
        l pt-24 pb-8"
        style={{ background: "black", minHeight: "200px" }} 
      > {/*"linear-gradient(to bottom, #d8bca0 0%, #d8bca0 50%, #f7f2ed 100%)" */}
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


      {/* 1) VIDEO SECTION */}
      <div
        className="w-full pt-28 pb-20"
        style={{ backgroundColor: "#000000" }} 
      > {/*"#f7f2ed"*/}
        <div className="max-w-[1400px] mx-auto px-6">
          <p
            className="mb-3 text-left text-sm sm:text-base uppercase tracking-widest text-[#c18f2c]"
          >
            Experience a Gift for Life
          </p>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/30 shadow-2xl bg-black/30">
            <div className="relative h-full w-full">
              {/* Gradient overlay for depth */}
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



      {/* 3) DESCRIPTION + CTA SECTION */}
      <div
        className="w-full pt-12 py-10"
        style={{ backgroundColor: "#000000" }} 
      >{/*same as above color*/}
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
    </section>
  )
}

