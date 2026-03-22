
import ExperienceCard from './ExperienceCard'
import './AboutMe.css'

const experiences = [
  {
    company: 'CodeLab - Google',
    companyUrl: 'https://codelabdavis.com/',
    position: 'Contract Software Engineer - Google Careers Platform',
    dates: 'Jan 2026 - Present',
    location: 'Davis, CA',
    accomplishments: [
      'Selected for a 6-month software engineering contract through CodeLab supporting feature development for the Google Careers platform.',
      'Contributed to production feature development, focusing on user-facing improvements to job discovery and location-based experiences.',
      'Engineered and optimized scalable, user-facing web components using React, TypeScript, and Go-based services, ensuring high performance for a global user base.',
    ],
  },
  {
    company: 'GoDaddy',
    companyUrl: 'https://godaddy.com',
    position: 'AI Engineering Intern',
    dates: 'June 2025 - September 2025',
    location: 'Kirkland, WA',
    accomplishments: [
      'Contributed to the fullstack migration of a customer-facing portal (5K+ monthly users) to React and Next.js, collaborating across frontend, backend, and DevOps to ensure production readiness.',
      'Built an AI contract parsing tool (AWS Bedrock + Jira/Slack/Ironclad), estimated to save 23K+ hours annually by cutting 15 min per review.',
      'Lifted user engagement by 15% through the integration of a new support chatbot (verified through A/B testing).',
      'Implemented GitHub Actions workflows for testing (Jest/Cypress), linting, building, and deploying using GoDaddy’s internal CI/CD tools, automating team processes.'
    ],
  },
]

const education = [
  {
    school: 'University of California Davis',
    program: 'BS, Computer Engineering',
    dates: '2022-2026',
    location: 'Davis, CA',
    highlights: [
      'Coursework: Embedded Systems, Digital Circuits, Operating Systems, Computer Networks, VLSI design, DSP, Analog Circuits',
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
