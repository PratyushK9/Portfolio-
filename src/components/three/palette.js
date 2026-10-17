// JS mirror of the scene colours, for three.js materials and lights.
export const PAL = {
  dawn: { accent: '#e2457a', accent2: '#7a4fd6', amb: 0.65, key: '#ffc2a8', keyI: 1.5, fill: '#b9a2ff', bulb: '#ffcf9e', desk: '#b97a5c', screenBg: '#2b1840' },
  day: { accent: '#ff6a1a', accent2: '#1a7dff', amb: 0.95, key: '#ffffff', keyI: 1.8, fill: '#9fd4ff', bulb: '#fff1b8', desk: '#c98d5f', screenBg: '#0e2a40' },
  sunset: { accent: '#ffd166', accent2: '#ff6f91', amb: 0.5, key: '#ff9b55', keyI: 1.6, fill: '#ff6f91', bulb: '#ffd166', desk: '#9a5a42', screenBg: '#2a1550' },
  night: { accent: '#7cf7ff', accent2: '#ff7ac6', amb: 0.3, key: '#8fa8ff', keyI: 0.8, fill: '#7cf7ff', bulb: '#7cf7ff', desk: '#5e4234', screenBg: '#050816' },
}

export function can3D() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.innerWidth < 768) return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}
