import type { ProjectStatus } from '../../data/projects';
import './StatusBadge.css';

type StatusBadgeProps = {
  status: ProjectStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status status--${status.tone}`}>
      <span className="status__dot" aria-hidden="true" />
      <span className="status__text">
        {status.label}
        {status.note ? (
          <>
            <span className="status__separator" aria-hidden="true">
              {' / '}
            </span>
            {status.note}
          </>
        ) : null}
      </span>
    </span>
  );
}
