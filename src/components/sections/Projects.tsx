import { useState } from 'react';
import { PROJECTS } from '../../data/projects';
import type { Project } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import ProjectRecordDialog from '../ui/ProjectRecordDialog';
import SectionHeading from '../ui/SectionHeading';
import './Projects.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="section projects"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <SectionHeading
          index="03"
          label="Projects"
          headingId="projects-title"
          title={
            <>
              The work, <em>on record</em>.
            </>
          }
          intro="A curated register of current and previous initiatives. Public descriptions are limited to confirmed information."
        />

        <div className="projects__list">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenRecord={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <ProjectRecordDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
