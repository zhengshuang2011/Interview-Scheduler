import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { spots, selected, name, setDay } = props;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  const formatSpots = () => {
    return (
      (spots === 0 && `no spots`) ||
      (spots === 1 && `1 spot`) ||
      (spots > 1 && `${spots} spots`)
    );
  };

  return (
    <li className={dayClass} data-testid="day" onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}
