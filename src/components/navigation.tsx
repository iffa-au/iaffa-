"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { label: "Programs", href: "/program" },
  { label: "Prizes", href: "/prizes" },
  { label: "About", href: "/about" },
]

const participateItems = [
  { label: "Submissions", href: "/submissions" },
  { label: "Membership", href: "/membership" },
  { label: "Oman Partnership", href: "/oman-partnership" },
  { label: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-0 transition-all duration-500",
        isScrolled
          ? "shadow-lg shadow-black/20 backdrop-blur-xl"
          : "shadow-none"
      )}
      style={{
        background: isScrolled
          ? "rgba(10, 10, 10, 0.85)"
          : "rgba(0, 0, 0, 0.95)",
      }}
    >
      {/* Logo - Fixed at far left corner */}
      <Link
        href="/"
        className="absolute left-4 sm:left-6 xl:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center transition-all duration-500"
      >
        <Image
          src="/images/aiffalogo-bg.webp"
          alt="AIFFA Logo"
          width={120}
          height={40}
          className="h-auto w-[100px] sm:w-[130px] xl:w-[140px] transition-all duration-300"
          priority
        />
      </Link>

      {/* Entries open - Centered pill (desktop only) */}
      <Link
        href="https://filmfreeway.com/ArabInternationalFilmFestivalofAustralia"
        target="_blank"
        rel="noreferrer"
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 px-5 py-2 text-xs font-semibold tracking-widest rounded-full border border-[#C9A84F] text-[#E6C15A] hover:bg-[#C9A84F]/15 hover:border-[#E6C15A] transition-all duration-300 uppercase whitespace-nowrap"
      >
        Entries open - AIFFA 2026
      </Link>

      <div className="relative z-10 mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex h-16 items-center justify-end">

          {/* Desktop Navigation - Right aligned */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-3 text-sm xl:text-base font-medium tracking-wide transition-all duration-300 group",
                    isActive
                      ? "text-[#E6C15A]"
                      : "text-[#f7f2ed] hover:text-[#E6C15A]"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-2 left-4 right-4 h-[2px] bg-gradient-to-r from-[#E6C15A] to-[#C9A84F] transition-all duration-300",
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              )
            })}

            {/* Get Involved Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={cn(
                  "relative px-4 py-3 text-sm xl:text-base font-medium tracking-wide transition-all duration-300 group flex items-center gap-1",
                  participateItems.some(i => pathname === i.href || pathname?.startsWith(i.href + "/"))
                    ? "text-[#E6C15A]"
                    : "text-[#f7f2ed] hover:text-[#E6C15A]"
                )}
              >
                Get Involved
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    dropdownOpen && "rotate-180"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-2 left-4 right-4 h-[2px] bg-gradient-to-r from-[#E6C15A] to-[#C9A84F] transition-all duration-300",
                    participateItems.some(i => pathname === i.href || pathname?.startsWith(i.href + "/"))
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  )}
                />
              </button>

              <div
                className={cn(
                  "absolute top-full right-0 pt-2 w-56 transition-all duration-300",
                  dropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                )}
              >
                <div className="bg-black/95 backdrop-blur-xl border border-[#E6C15A]/20 rounded-lg shadow-2xl overflow-hidden">
                  <div className="py-2">
                    {participateItems.map((item) => {
                      const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "block px-4 py-3 text-sm font-medium tracking-wide transition-all duration-200",
                            isActive
                              ? "text-[#E6C15A] bg-[#E6C15A]/10 border-l-2 border-[#E6C15A]"
                              : "text-gray-400 hover:text-[#E6C15A] hover:bg-[#E6C15A]/5 hover:border-l-2 hover:border-[#E6C15A]/50"
                          )}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-md transition-all duration-300 text-champagne hover:text-[#E6C15A] hover:bg-[#E6C15A]/10"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
        ) : (
          <Menu className="w-6 h-6 transition-transform duration-300" />
        )}
      </button>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-[#E6C15A]/20 shadow-2xl transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
        )}
      >
        <div className="px-4 py-6 space-y-1">
          {/* Entries open pill - top of mobile menu */}
          <Link
            href="https://filmfreeway.com/ArabInternationalFilmFestivalofAustralia"
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 mb-2 text-base font-semibold tracking-wide uppercase rounded-md border border-[#C9A84F] text-[#E6C15A] hover:bg-[#C9A84F]/15 transition-all duration-200"
          >
            Entries open - AIFFA 2026
          </Link>

          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-3 text-base font-medium tracking-wide rounded-md transition-all duration-200",
                  isActive
                    ? "text-[#E6C15A] bg-[#E6C15A]/10 border-l-2 border-[#E6C15A]"
                    : "text-champagne/80 hover:text-[#E6C15A] hover:bg-[#E6C15A]/5 hover:border-l-2 hover:border-[#E6C15A]/50"
                )}
              >
                {item.label}
              </Link>
            )
          })}

          {/* Mobile Get Involved Section */}
          <div className="pt-2 mt-2 border-t border-[#E6C15A]/20">
            <div className="px-4 py-2 text-xs font-semibold tracking-wider text-[#E6C15A]/70 uppercase">
              Get Involved
            </div>
            {participateItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium tracking-wide rounded-md transition-all duration-200",
                    isActive
                      ? "text-[#E6C15A] bg-[#E6C15A]/10 border-l-2 border-[#E6C15A]"
                      : "text-champagne/80 hover:text-[#E6C15A] hover:bg-[#E6C15A]/5 hover:border-l-2 hover:border-[#E6C15A]/50"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
