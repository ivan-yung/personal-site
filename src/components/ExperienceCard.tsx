
type ExperienceCardProps = {
  company: string
  position: string
  dates: string
  location: string
  accomplishments: string[]
}

export default function ExperienceCard({
  company,
  position,
  dates,
  location,
  accomplishments,
}: ExperienceCardProps) {
  return (
    <article className="experience-card">
      <header className="experience-card-header">
        <h3 className="experience-company">{company}</h3>
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
