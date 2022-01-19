import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  const interviewerClass = `interviewers__item ${
    selected ? "interviewers__item--selected" : ""
  }`;
  const imageClass = `interviewers__item-image ${
    selected ? "interviewers__item-image--selected" : ""
  }`;

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className={imageClass} src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
