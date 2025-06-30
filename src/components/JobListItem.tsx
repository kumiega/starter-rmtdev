import BookmarkIcon from "./BookmarkIcon";

import { JobItem } from "../libs/types";

type JobListItemProps = {
  jobItem: JobItem;
  isActive: boolean;
};

export default function JobListItem({ jobItem, isActive }: JobListItemProps) {
  return (
    <li className={isActive ? "job-item job-item--active" : "job-item"}>
      <a href={`#${jobItem.id}`} className="job-item__link">
        <div className="job-item__badge">{jobItem.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItem.title}</h3>
          <p className="job-item__company">{jobItem.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">
            {jobItem.daysAgo > 0 ? `${jobItem.daysAgo}d` : "NOW"}
          </time>
        </div>
      </a>
    </li>
  );
}
