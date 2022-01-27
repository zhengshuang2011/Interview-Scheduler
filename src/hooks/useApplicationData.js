import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const appointmentUrl = (id) => {
    return `/api/appointments/${id}`;
  };

  const bookInterview = (id, interview, day) => {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(appointmentUrl(id), appointment).then(() => {
      const days = changeSpots(state, day);
      setState({
        ...state,
        days,
        appointments,
      });
    });
  };

  const cancelInterview = (id, day) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(appointmentUrl(id)).then(() => {
      const days = changeSpots(state, day, true);
      setState({
        ...state,
        days,
        appointments,
      });
    });
  };

  const changeSpots = (state, name, increase) => {
    const currentDay = state.days.find((day) => day.name === name);

    const currentAppoitments = getAppointmentsForDay(state, name);
    const noInterview = currentAppoitments.filter(
      (appointment) => !appointment.interview
    );
    const spots = noInterview.length;

    const id = currentDay.id;
    const updateDay = {
      ...currentDay,
      spots: increase ? spots + 1 : spots - 1,
    };
    const days = state.days.map((day) => (day.id === id ? updateDay : day));

    return days;
  };

  return { state, setDay, bookInterview, cancelInterview };
}
