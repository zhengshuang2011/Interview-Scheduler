import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  const imageClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
      <img className={imageClass} src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
