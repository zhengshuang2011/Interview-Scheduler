import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const { student, interviewer, interviewers, onSave, onCancel } = props;
  const [studentName, setStudentName] = useState(student || "");
  const [interviewerName, setInterviewerName] = useState(interviewer || null);
  const reset = () => {
    setStudentName("");
    setInterviewerName(null);
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewerName}
          onChange={setInterviewerName}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={() => {
              onCancel();
              reset();
            }}
          >
            Cancel
          </Button>
          <Button confirm onClick={() => onSave(studentName, interviewerName)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
