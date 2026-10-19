import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'

// Phones and tablets get this page instead of the site: a plain white page and a button that plays
// Pratyush's favourite music (official Seedhe Maut videos, via YouTube's embedded player).
const QUERY = '(max-width: 1023px), (hover: none) and (pointer: coarse)'

export function useSmallScreen() {
  const [small, setSmall] = useState(() => window.matchMedia(QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setSmall(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return small
}

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(window.YT) }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const s = document.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s)
    }
  })
}

export default function SmallScreen() {
  const { videos } = profile.music
  const host = useRef(null)
  const player = useRef(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadYouTubeApi().then((YT) => {
      if (cancelled || !host.current) return
      // YouTube replaces the element it's given, so hand it one React doesn't own
      const el = document.createElement('div')
      host.current.appendChild(el)
      player.current = new YT.Player(el, {
        width: '100%', height: '100%',
        videoId: videos[0],
        // loop needs a playlist; with one song, it's a playlist of itself
        playerVars: { playlist: (videos.length > 1 ? videos.slice(1) : videos).join(','), loop: 1, playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e) => setPlaying(e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.BUFFERING),
        },
      })
    })
    return () => {
      cancelled = true
      player.current?.destroy?.()
      player.current = null
      if (host.current) host.current.innerHTML = ''
    }
  }, [videos])

  const toggle = () => {
    const p = player.current
    if (!p) return
    if (playing) p.pauseVideo()
    else p.playVideo()
  }

  return (
    <main className="fixed inset-0 overflow-y-auto bg-white text-neutral-900">
      <div className="mx-auto flex min-h-full max-w-md flex-col items-center justify-center gap-6 px-6 py-12 text-center">
        <button type="button" onClick={toggle} disabled={!ready}
          className="inline-flex items-center gap-3 rounded-full bg-neutral-900 px-7 py-4 font-display text-lg font-bold text-white shadow-lg transition active:scale-95 disabled:opacity-50">
          {playing
            ? <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
            : <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>}
          {ready ? (playing ? 'Pause the music' : `Play ${profile.firstName}’s favourite music`) : 'Loading the music…'}
        </button>

        <p className="text-lg leading-relaxed text-neutral-700">
          The person ({profile.firstName}) you are about to witness deserves a large screen, not a small one.
          Switch to a bigger screen. Till then, hear some of {profile.firstName}’s favourite music.
        </p>

        <div className="w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-md" style={{ aspectRatio: '16 / 9' }}>
          <div ref={host} className="h-full w-full [&>iframe]:h-full [&>iframe]:w-full" />
        </div>
        <p className="text-xs text-neutral-400">Now playing: {profile.music.artist}, via YouTube</p>
      </div>
    </main>
  )
}
