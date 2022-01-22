import type { Job } from 'types';
import Experience from './Experience';

type TimelineProps = {
  jobs: Job[];
};

export default function Timeline({ jobs }: TimelineProps) {
  return (
    <div className="timeline">
      {jobs.map(job => (
        <Experience key={job.company.name} {...job} />
      ))}

      <style jsx>{`
        .timeline {
          display: flex;
          flex-direction: column;
          margin: calc(-1 * var(--space));
        }
      `}</style>
    </div>
  );
}
