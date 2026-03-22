
type ExperienceCardProps = {
  company: string
  companyUrl?: string
  position: string
  dates: string
  location: string
  accomplishments: string[]
}

export default function ExperienceCard({
  company,
  companyUrl,
  position,
  dates,
  location,
  accomplishments,
}: ExperienceCardProps) {
  return (
    <article className="experience-card">
      <header className="experience-card-header">
        <h3 className="experience-company">
          {companyUrl ? (
            <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="company-link">
              {company}
              <svg className="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ) : (
            company
          )}
        </h3>
        <p className="experience-position">{position}</p>
        <p className="experience-meta">
          <span>{dates}</span>
          <span>{location}</span>
        </p>
      </header>

      <ul className="experience-accomplishments">
        {accomplishments.map((accomplishment) => (
          <li key={accomplishment}>{accomplishment}</li>
        ))}
      </ul>
    </article>
  )
}
