import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const {
    id,
    time,
    day,
    interview,
    interviewers,
    bookInterview,
    cancelInterview,
  } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    bookInterview(id, interview, day)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.log(error);
      });
  };

  const reset = (id) => {
    transition(DELETING, true);
    cancelInterview(id, day)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      {time && <Header time={time} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show //Show mode: booked interview with student name and interviewerName/null.
          student={interview.student}
          interviewer={interview.interviewerData}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form //Form create mode : Without student name. With interviewers List
          interviewers={interviewers}
          id={id}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form //Form edit mode : With student name. With interviewers List(can be selected or not selected)
          student={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          id={id}
          message="Are you sure you want to delete?"
          onConfirm={reset}
          onCancle={() => back()}
        />
      )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" onClose={() => back()} />
      )}
    </article>
  );
}
