import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const {
    interviewers,
    interviewer: selectedInterviewer,
    setInterviewer,
  } = props;
  const parsedInterviewers = interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      setInterviewer={setInterviewer}
      selected={selectedInterviewer === interviewer.id}
      {...interviewer}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}
