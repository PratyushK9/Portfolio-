// Lightning-bolt mark used as the site logo (an SVG, not an emoji).
export default function Bolt({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13.5 2 4 14h6.5L9.5 22 20 9.5h-6.6z" />
    </svg>
  )
}
