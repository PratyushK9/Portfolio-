# Pratyush Kumar Sahu: Portfolio

My personal portfolio site, built with React + Vite + Tailwind CSS, framer-motion and three.js (react-three-fiber).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Make changes

- **All text and content** lives in `src/data/profile.js`: projects, experience, skills, certifications, contact, and the "Ask Pratyush" Q&A.
- **Photos:** see `public/photos/README.md`.
- **GitHub:** set `contact.github` (and `links.github` for each project) in `profile.js` and the buttons show up.
- **Phone number:** hidden by default. Set `contact.showPhone: true` to show it.
- **Resume:** replace `public/resume.pdf`.
- **Intro video:** put your "Daddy's home" clip at `public/intro.mp4` (MP4/H.264, keep it short and under ~3 MB). Visitors click "Power up" to start it with sound. Without the file, an arc-reactor animation plays instead. It shows once per browser session; add `?intro=1` to the URL to see it again.

## Features

- **Time-of-day sky:** dawn, day, sunset or night, picked from the visitor's clock. The dial in the navbar overrides it (Auto → Dawn → Day → Sunset → Night). To test a time, use `?hour=21`.
- **Interactive cursor:** a springy ring that shows labels over buttons, a caret over text and a magnifier over project cards, plus spark bursts on click. Turned off on touch devices and with reduced motion.
- **3D:** a floating maker's desk in the hero that tilts toward the cursor (click the bulb!), and a draggable skill sphere. Lazy-loaded. Phones get a lightweight fallback.
- **Easter eggs:** the "Ask Pratyush" chat bubble (answers come from `profile.js` with cited sources) and the Konami code.

## Deploy (free)

- **Vercel:** import the repo at vercel.com and click Deploy (it detects Vite).
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **GitHub Pages:** set `base: '/<repo-name>/'` in `vite.config.js`, build, then publish `dist/`.
