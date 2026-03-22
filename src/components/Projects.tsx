
import ProjectsCard from './ProjectsCard'
import vibwebpng from '../assets/vib-web.png'
import VibWebWebm from '../assets/optimized-vib-web.webm'
import logisim from '../assets/logisim.png'
import LogisimWebm from '../assets/optimized-logisim.webm'
import psoc6png from '../assets/psoc6.png'
import b3Webm from '../assets/optimized-b3.webm'
import b3Png from '../assets/b3.png'
import freshDetectPng from '../assets/freshDetect.png'
import './Projects.css'

const projects = [
  {
    title: 'Vib-Web',
    description:
      'A frontend drag and drop website code Generator. Create a wireframe, generate, and compile without leaving the webpage.',
    tech: ['React', 'TS', 'GO', 'GCP'],
    videoSrc: VibWebWebm,
    imageSrc: vibwebpng,
    liveUrl: 'https://vib-web.web.app/',
    repoUrl: 'https://github.com/ivan-yung/webgen',
  },
  {
    title: 'Logi-Sim',
    description:
      'Digital Circuit Simulator: Simulate gate level logic with accuracy and precision in a fun web format',
    tech: ['React', 'Directed Graphs'],
    videoSrc: LogisimWebm,
    imageSrc: logisim,
    liveUrl: 'https://logi-sim.web.app/',
    repoUrl: 'https://github.com/ivan-yung/logi-sim',
  },
  {
    title: 'Fresh Detect',
    description:
      'ML powered meat freshness detection app. A fine tuned CNN in an h5 file ran by a flask server predicts the freshness of meat on a gradient from fresh to spoiled.',
    tech: ['Computer Vision', 'Python', 'Flask', 'Fine tuning', 'React'],
    imageSrc: freshDetectPng,
    repoUrl: 'https://github.com/GDSC-UCD-Cohort-24-25/freshdetect',
    mediaMode: 'image' as const,
  },
  {
    title: 'PSOC Based Fit bit',
    description:
      'Designed custom PSoC 63 BLE 5.0 module (CYBLE-416045-02) boards, and firmware interfacing LIS3DH accellerometer to track real time motion and fitness statistics.',
    tech: ['Altium Designer', 'C', 'Serial Communication Protocols', 'PSOC6'],
    imageSrc:
      psoc6png,
    mediaMode: 'image' as const,
  },
  {
    title: 'IOT Embedded Bike Tracker',
    description:
      'TI CC3200 wifi SOC microcontroller interfacing with GPS, AWS IOT shadow, and accelerometer to provide real time location data and bike speed statistics onto acompanying web app',
    tech: ['IOT', 'Serial COmmunication Protocols', 'C++', 'AWS', 'React', 'GO'],
    imageSrc:
      b3Png,
    videoSrc: b3Webm,
  },
]

export default function Projects() {
  return (
    <section className="projects-section snap-section" id="projects" aria-labelledby="projects-heading">
      <div className="projects-content">
        <p className="projects-eyebrow">True Full Stack.</p>
        <div className="heading-with-cursor">
          <h2 className="projects-heading" id="projects-heading">
            Projects
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
