import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const SCENES = ['dawn', 'day', 'sunset', 'night']
export const MODES = ['auto', ...SCENES]
export const SCENE_LABEL = { dawn: 'Dawn', day: 'Day', sunset: 'Sunset', night: 'Night' }
export const SCENE_PHRASE = { dawn: 'early morning', day: 'daytime', sunset: 'evening', night: 'night' }

export function sceneForHour(h) {
  if (h >= 5 && h < 8) return 'dawn'
  if (h >= 8 && h < 17) return 'day'
  if (h >= 17 && h < 20) return 'sunset'
  return 'night'
}

const KEY = 'pks-scene-mode'

function readMode() {
  try {
    const m = localStorage.getItem(KEY)
    return MODES.includes(m) ? m : 'auto'
  } catch {
    return 'auto'
  }
}

// ?hour=21 fakes the clock for testing the auto mode
function currentHour() {
  const q = new URLSearchParams(window.location.search).get('hour')
  const h = q === null ? NaN : Number(q)
  return Number.isInteger(h) && h >= 0 && h < 24 ? h : new Date().getHours()
}

const SceneContext = createContext(null)

export function SceneProvider({ children }) {
  const [mode, setModeState] = useState(readMode)
  const [autoScene, setAutoScene] = useState(() => sceneForHour(currentHour()))

  useEffect(() => {
    const id = setInterval(() => setAutoScene(sceneForHour(currentHour())), 60_000)
    return () => clearInterval(id)
  }, [])

  const scene = mode === 'auto' ? autoScene : mode

  useEffect(() => {
    document.documentElement.dataset.scene = scene
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue('--sky-2').trim()
  }, [scene])

  const value = useMemo(() => ({
    mode,
    scene,
    autoScene,
    setMode: (m) => {
      setModeState(m)
      try { localStorage.setItem(KEY, m) } catch { /* storage unavailable */ }
    },
  }), [mode, scene, autoScene])

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}

export const useScene = () => useContext(SceneContext)
