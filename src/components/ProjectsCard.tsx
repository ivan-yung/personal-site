import { useRef } from 'react'

type ProjectsCardProps = {
	title: string
	description: string
	tech: string[]
	liveUrl?: string
	repoUrl?: string
	videoSrc?: string
	imageSrc?: string
	mediaAlt?: string
	mediaMode?: 'video' | 'image'
}

export default function ProjectsCard({
	title,
	description,
	tech,
	liveUrl,
	repoUrl,
	videoSrc,
	imageSrc,
	mediaAlt = `${title} preview`,
	mediaMode,
}: ProjectsCardProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null)
	const showImage = mediaMode === 'image' || !videoSrc

	const handleVideoEnter = () => {
		if (!videoRef.current) return
		void videoRef.current.play()
	}

	const handleVideoLeave = () => {
		if (!videoRef.current) return
		videoRef.current.pause()
		videoRef.current.currentTime = 0
	}

	return (
		<article className="project-card">
			<div className="terminal-window">
				<div className="terminal-header">
					<span className="terminal-title-tab">{title}.ps1</span>
				</div>
				<div className="terminal-content">
					<div
						className="project-media"
						onMouseEnter={handleVideoEnter}
						onMouseLeave={handleVideoLeave}
					>
						{showImage ? (
							<img src={imageSrc} alt={mediaAlt} className="project-media-image" loading="lazy" />
						) : (
							<video
								ref={videoRef}
								src={videoSrc}
								className="project-media-video"
								muted
								playsInline
								loop
								preload="metadata"
								poster={imageSrc}
							/>
						)}
					</div>

					<div className="terminal-body">
						<h3 className="project-card-title">{title}</h3>
						<p className="project-card-description">{description}</p>

						<ul className="project-tech-list" aria-label={`${title} technologies`}>
							{tech.map((item) => (
								<li key={item} className="project-tech-item">
									{item}
								</li>
							))}
						</ul>

						<div className="project-card-links">
							{liveUrl && (
								<a href={liveUrl} target="_blank" rel="noreferrer" className="project-link">
									Live Demo
								</a>
							)}
							{repoUrl && (
								<a href={repoUrl} target="_blank" rel="noreferrer" className="project-link">
									Source
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</article>
	)
}
