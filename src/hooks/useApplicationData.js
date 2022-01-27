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

  //To check selected day's spots and make change if book or cancel an interview.
  //Returned: state.days ==> updated days
  const changeSpotsForDays = (state, name, increase) => {
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

  //Created a helper function to shorter URL for appointments/:id
  const appointmentUrl = (id) => {
    return `/api/appointments/${id}`;
  };

  //A user can book an interview in an empty appointment slot
  const bookInterview = (id, interview, day) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(appointmentUrl(id), appointment).then(() => {
      const days = changeSpotsForDays(state, day);
      setState({
        ...state,
        days,
        appointments,
      });
    });
  };

  //A user can cancel an existing interview.
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
      const days = changeSpotsForDays(state, day, true);
      setState({
        ...state,
        days,
        appointments,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
