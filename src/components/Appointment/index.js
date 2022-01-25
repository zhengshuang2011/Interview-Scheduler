import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview).then((res) => {
      transition(SHOW);
    });
  };

  return (
    <article className="appointment">
      {time && <Header time={time} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewerData}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          id={id}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
          onSave={() => transition(SAVING)}
          onCancel={() => back()}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={() => transition(DELETING)}
          onCancle={() => back()}
        />
      )}
      {mode === SAVING && <Status message="SAVING" />}
    </article>
  );
}
