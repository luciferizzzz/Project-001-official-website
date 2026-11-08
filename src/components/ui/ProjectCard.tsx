import type { Project } from '../../data/projects';
import Button from './Button';
import StatusBadge from './StatusBadge';
import './ProjectCard.css';

type ProjectCardProps = {
  project: Project;
  onOpenRecord: (project: Project) => void;
};

export default function ProjectCard({
  project,
  onOpenRecord,
}: ProjectCardProps) {
  const titleId = `project-${project.id}-name`;

  const action = (
    <Button
      variant="quiet"
      icon="up-right"
      onClick={() => onOpenRecord(project)}
      ariaLabel={`Open the Project 001 record for ${project.name}`}
      ariaHasPopup="dialog"
    >
      Project record
    </Button>
  );

  const body = (
    <div className="project__body">
      <div className="project__top">
        <span className="project__index">Project {project.index}</span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="project__name" id={titleId}>
        {project.name}
      </h3>
      <p className="project__category">{project.category}</p>
      <p className="project__description">{project.description}</p>

      {project.note ? <p className="project__note">{project.note}</p> : null}

      <div className="project__action">{action}</div>
    </div>
  );

  if (project.layout === 'feature') {
    return (
      <article
        className="project project--feature"
        id={`project-${project.id}`}
        aria-labelledby={titleId}
        data-reveal
      >
        <figure className="project__visual project__plate">
          <span className="project__halo" aria-hidden="true" />

          {project.logoPath ? (
            <img
              className="project__logo"
              src={project.logoPath}
              width={project.logoWidth}
              height={project.logoHeight}
              alt={project.logoAlt ?? `${project.name} logo`}
              loading="lazy"
              decoding="async"
            />
          ) : null}

          <figcaption className="project__caption">
            <span>
              Fig. {project.index} / {project.name}
            </span>
            <span>{project.category}</span>
          </figcaption>
        </figure>

        {body}
      </article>
    );
  }

  if (project.layout === 'split') {
    return (
      <article
        className="project project--split"
        id={`project-${project.id}`}
        aria-labelledby={titleId}
        data-reveal
      >
        <div className="project__visual project__wordmark-plate">
          <span className="project__wordmark-index" aria-hidden="true">
            {project.index}
          </span>
          <span className="project__wordmark-ring" aria-hidden="true" />
          <span className="project__wordmark" aria-hidden="true">
            {project.name}
          </span>
          <span className="project__wordmark-label" aria-hidden="true">
            Typographic wordmark
          </span>
        </div>

        {body}
      </article>
    );
  }

  return (
    <article
      className="project project--quiet"
      id={`project-${project.id}`}
      aria-labelledby={titleId}
      data-reveal
    >
      <div className="project__quiet-visual" aria-hidden="true">
        <span className="project__quiet-label">Archive / {project.index}</span>
        <span className="project__quiet-mark">{project.name}</span>
        <span className="project__quiet-hatch" />
      </div>

      {body}
    </article>
  );
}
