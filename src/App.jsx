import { SceneProvider } from './components/scene/useTimeOfDay'
import SkyBackground from './components/scene/SkyBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Internships from './components/Internships'
import FanMail from './components/FanMail'
import Certifications from './components/Certifications'
import Gallery from './components/Gallery'
import { Contact, Footer } from './components/Contact'
import Challenge from './components/Challenge'
import CustomCursor from './components/fx/CustomCursor'
import ScrollProgress from './components/fx/ScrollProgress'
import EasterEgg from './components/fx/EasterEgg'
import AskBubble from './components/fx/AskBubble'
import Intro from './components/fx/Intro'

export default function App() {
  return (
    <SceneProvider>
      <SkyBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Internships />
        <Certifications />
        <Gallery />
        <FanMail />
        <Contact />
        <Challenge />
      </main>
      <Footer />
      <AskBubble />
      <EasterEgg />
      <Intro />
      <CustomCursor />
    </SceneProvider>
  )
}
