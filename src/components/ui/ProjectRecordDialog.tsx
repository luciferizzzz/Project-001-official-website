import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { X } from 'lucide-react';
import type { Project } from '../../data/projects';
import StatusBadge from './StatusBadge';
import './ProjectRecordDialog.css';

type ProjectRecordDialogProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectRecordDialog({
  project,
  onClose,
}: ProjectRecordDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project && !dialog.open) {
      dialog.showModal();
      document.body.classList.add('modal-open');
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      document.body.classList.remove('modal-open');
      onClose();
    };

    dialog.addEventListener('close', handleClose);

    return () => {
      dialog.removeEventListener('close', handleClose);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby={project ? 'project-dialog-title' : undefined}
      aria-describedby={
        project ? 'project-dialog-description' : undefined
      }
      onClick={handleBackdropClick}
    >
      {project ? (
        <div className="project-dialog__panel">
          <div className="project-dialog__top">
            <span className="project-dialog__eyebrow">
              Project {project.index} / Record
            </span>
            <button
              className="project-dialog__close"
              type="button"
              onClick={closeDialog}
              aria-label="Close project record"
            >
              <X size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <h2 className="project-dialog__title" id="project-dialog-title">
            {project.name}
          </h2>

          <div className="project-dialog__status">
            <StatusBadge status={project.status} />
          </div>

          <p
            className="project-dialog__description"
            id="project-dialog-description"
          >
            {project.description}
          </p>

          <dl className="project-dialog__record">
            {project.record.map((entry) => (
              <div className="project-dialog__record-row" key={entry.label}>
                <dt>{entry.label}</dt>
                <dd>{entry.value}</dd>
              </div>
            ))}
          </dl>

          {project.note ? (
            <p className="project-dialog__note">{project.note}</p>
          ) : null}

          <p className="project-dialog__footnote">
            Details are limited to confirmed public information.
          </p>
        </div>
      ) : null}
    </dialog>
  );
}
