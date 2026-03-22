import { useEffect, useState } from 'react'
import PcbDisplay from './components/PcbDisplay'
import Projects from './components/Projects'
import AboutMe from './components/AboutMe'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', onScroll, { passive: true })

    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleSectionNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault()

    const target = document.getElementById(targetId)
    if (!target) return

    const nav = event.currentTarget.closest('.pill-nav') as HTMLElement | null
    const navHeight = nav?.offsetHeight ?? 0
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 10

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    })
  }

  return (
    <>
      <header className="pill-nav" aria-label="Primary">
        <nav className="pill-nav-track">
          <a className="pill-nav-link" href="#projects" onClick={(event) => handleSectionNavClick(event, 'projects')}>
            Projects
          </a>
          <a className="pill-nav-link" href="#about" onClick={(event) => handleSectionNavClick(event, 'about')}>
            About Me
          </a>
          <a className="pill-nav-link" href="https://github.com/ivan-yung" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="pill-nav-link" href="https://www.linkedin.com/in/ikyung" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
      </header>

      <main className="app-shell" id="top">
        <section className="canvas-wrap">
          <PcbDisplay scrollY={scrollY} />
        </section>

        <section className="scroll-space" aria-hidden="true" />
      </main>

      <Projects />
      <AboutMe />
    </>
  )
}

export default App
