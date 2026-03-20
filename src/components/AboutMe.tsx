
import ExperienceCard from './ExperienceCard'
import './AboutMe.css'

const experiences = [
  {
    company: 'TechNova Systems',
    position: 'Embedded Software Engineer',
    dates: 'May 2023 - Present',
    location: 'Toronto, ON',
    accomplishments: [
      'Designed BLE communication workflows that reduced telemetry packet loss by 22% during stress testing.',
      'Built board bring-up scripts and diagnostics to accelerate validation cycles for new hardware revisions.',
      'Partnered with product and QA teams to define test plans and release criteria for firmware milestones.',
    ],
  },
  {
    company: 'Nexa Logic Labs',
    position: 'Full Stack Developer Intern',
    dates: 'Jan 2022 - Apr 2023',
    location: 'Waterloo, ON',
    accomplishments: [
      'Developed React dashboards for device monitoring with role-based access and live status modules.',
      'Implemented backend endpoints and data pipelines used for operational reporting across multiple teams.',
      'Improved page load and API response performance through query optimization and client-side caching.',
    ],
  },
]

const education = [
  {
    school: 'University of Waterloo',
    program: 'BASc, Computer Engineering',
    dates: '2019 - 2024',
    location: 'Waterloo, ON',
    highlights: [
      'Coursework: Embedded Systems, Digital Logic, Real-Time Operating Systems, and Computer Networks.',
      'Capstone project focused on wireless sensing and low-power edge processing.',
    ],
  },
]

export default function AboutMe() {
  return (
    <section className="about-section snap-section" id="about" aria-labelledby="about-heading">
      <div className="about-content">
        <p className="about-eyebrow">Background</p>
        <h2 className="about-heading" id="about-heading">
          About Me
        </h2>
        <p className="about-intro">
          I build practical software across embedded systems and web platforms, with a focus on
          reliability, measurable performance, and maintainable architecture.
        </p>

        <div className="experience-grid">
          {experiences.map((experience) => (
            <ExperienceCard key={`${experience.company}-${experience.position}`} {...experience} />
          ))}
        </div>

        <div className="education-block" aria-labelledby="education-heading">
          <h3 className="education-heading" id="education-heading">
            Education
          </h3>
          <div className="education-grid">
            {education.map((item) => (
              <article key={item.school} className="education-card">
                <h4 className="education-school">{item.school}</h4>
                <p className="education-program">{item.program}</p>
                <p className="education-meta">
                  <span>{item.dates}</span>
                  <span>{item.location}</span>
                </p>
                <ul className="education-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
