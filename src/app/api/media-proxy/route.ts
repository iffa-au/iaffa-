import { NextRequest, NextResponse } from "next/server"

const PLAYLIST_CONTENT_TYPES = [
  "application/vnd.apple.mpegurl",
  "application/x-mpegurl",
]

function buildProxyUrl(targetUrl: string, origin: string): string {
  const url = new URL("/api/media-proxy", origin)
  url.searchParams.set("url", targetUrl)
  return url.toString()
}

function rewritePlaylistContent(content: string, sourceUrl: string, origin: string): string {
  const baseUrl = new URL(sourceUrl)

  return content
    .split("\n")
    .map((line) => {
      const trimmed = line.trim()

      if (!trimmed) {
        return line
      }

      if (!trimmed.startsWith("#")) {
        const absolute = new URL(trimmed, baseUrl).toString()
        return buildProxyUrl(absolute, origin)
      }

      if (trimmed.includes('URI="')) {
        return line.replace(/URI="([^"]+)"/g, (_match, uriValue: string) => {
          const absolute = new URL(uriValue, baseUrl).toString()
          return `URI="${buildProxyUrl(absolute, origin)}"`
        })
      }

      return line
    })
    .join("\n")
}

export async function GET(request: NextRequest) {
  try {
    const target = request.nextUrl.searchParams.get("url")

    if (!target) {
      return NextResponse.json({ error: "Missing url query parameter" }, { status: 400 })
    }

    let parsedUrl: URL

    try {
      parsedUrl = new URL(target)
    } catch {
      return NextResponse.json({ error: "Invalid target URL" }, { status: 400 })
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: "Only http/https URLs are allowed" }, { status: 400 })
    }

    const upstreamResponse = await fetch(parsedUrl.toString(), {
      cache: "no-store",
      headers: {
        "User-Agent": "AIFFA-Media-Proxy",
      },
    })

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { error: "Upstream media request failed", status: upstreamResponse.status },
        { status: upstreamResponse.status },
      )
    }

    const contentType = upstreamResponse.headers.get("content-type") ?? "application/octet-stream"
    const isPlaylist =
      parsedUrl.pathname.toLowerCase().endsWith(".m3u8") ||
      PLAYLIST_CONTENT_TYPES.some((value) => contentType.toLowerCase().includes(value))

    if (isPlaylist) {
      const playlistText = await upstreamResponse.text()
      const rewritten = rewritePlaylistContent(
        playlistText,
        parsedUrl.toString(),
        request.nextUrl.origin,
      )

      return new NextResponse(rewritten, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Cache-Control": "public, max-age=30",
        },
      })
    }

    const data = await upstreamResponse.arrayBuffer()

    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=300",
      },
    })
  } catch (error) {
    console.error("Media proxy error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
