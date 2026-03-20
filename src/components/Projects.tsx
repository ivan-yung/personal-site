
import ProjectsCard from './ProjectsCard'
import './Projects.css'

const projects = [
  {
    title: 'PSOC6 BLE Telemetry Node',
    description:
      'Firmware and dashboard stack for streaming sensor data over BLE with low-latency packet handling and real-time status panels.',
    tech: ['C', 'FreeRTOS', 'BLE', 'React', 'TypeScript'],
    videoSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    imageSrc:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    repoUrl: '#',
  },
  {
    title: 'Full Stack Portfolio Platform',
    description:
      'Portfolio site with interactive 3D hero section, project indexing, and responsive content blocks tuned for performance.',
    tech: ['React', 'Vite', 'Three.js', 'CSS'],
    videoSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    imageSrc:
      'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1200&q=80',
    liveUrl: '#',
    repoUrl: '#',
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
        <h2 className="projects-heading" id="projects-heading">
          Projects
        </h2>
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
