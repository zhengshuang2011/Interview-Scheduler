import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value: selectedDay, onChange } = props;
  const parsedDays = days.map((day) => (
    <DayListItem
      key={day.id}
      setDay={onChange}
      selected={selectedDay === day.name}
      {...day}
    />
  ));
  return <ul>{parsedDays}</ul>;
}
