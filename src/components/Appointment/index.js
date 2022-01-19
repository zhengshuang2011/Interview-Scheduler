import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const { time } = props;
  return (
    <article className="appointment">
      {time && `Appoinments at ${time}`}
      {!time && `No Appoinments`}
    </article>
  );
}
