import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day: selectedDay, setDay } = props;
  const parsedDays = days.map((day) => (
    <DayListItem
      key={day.id}
      setDay={setDay}
      selected={selectedDay === day.name}
      {...day}
    />
  ));
  return <ul>{parsedDays}</ul>;
}
