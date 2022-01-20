import React from "react";
import "components/Appointment/styles.scss";
import Button from "components/Button";

export default function Confirm(props) {
  const { message, onConfirm, onCancle } = props;
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancle}>
          Cancel
        </Button>
        <Button danger onClick={onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
