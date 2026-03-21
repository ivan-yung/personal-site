
import ProjectsCard from './ProjectsCard'
import vibwebpng from '../assets/vib-web.png'
import vibwebmp4 from '../assets/optimized-vib-web.webm'
import logisim from '../assets/logisim.png'
import logisimmp4 from '../assets/optimized-logisim.webm'
import './Projects.css'

const projects = [
  {
    title: 'Vib-Web',
    description:
      'A frontend drag and drop website code Generator. Create a wireframe, generate, and compile without leaving the webpage.',
    tech: ['React', 'TS', 'GO', 'GCP'],
    videoSrc: vibwebmp4,
    imageSrc: vibwebpng,
    liveUrl: 'https://vib-web.web.app/',
    repoUrl: 'https://github.com/ivan-yung/webgen',
  },
  {
    title: 'Logi-Sim',
    description:
      'Digital Circuit Simulator: Simulate gate level logic with accuracy and precision in a fun web format',
    tech: ['React'],
    videoSrc: logisimmp4,
    imageSrc: logisim,
    liveUrl: 'https://logi-sim.web.app/',
    repoUrl: 'https://github.com/ivan-yung/logi-sim',
  },
  {
    title: 'Embedded Device Test Bench',
    description:
      'Automated hardware validation toolchain for serial diagnostics, regression capture, and pass-fail test reporting.',
    tech: ['Python', 'PySerial', 'Node.js', 'SQLite'],
    imageSrc:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    mediaMode: 'image' as const,
    repoUrl: '#',
  },
]

export default function Projects() {
  return (
    <section className="projects-section snap-section" id="projects" aria-labelledby="projects-heading">
      <div className="projects-content">
        <p className="projects-eyebrow">True Full Stack.</p>
        <div className="heading-with-cursor">
          <h2 className="projects-heading" id="projects-heading">
            Products
          </h2>
          <div className="terminal-cursor"></div>
        </div>
        <p className="projects-intro">
          AI Powered Web tools, circuit simulators, IOT Embedded devices.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectsCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
