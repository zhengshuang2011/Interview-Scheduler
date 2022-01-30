import axios from "axios";
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
  const SpotsForDays = (state, appointments) => {
    const currentDay = state.days.find((day) => day.name === state.day);
    let spots = 0;
    for (let id of currentDay.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }
    const dayId = currentDay.id;
    const updateDay = {
      ...currentDay,
      spots,
    };
    const days = state.days.map((day) => (day.id === dayId ? updateDay : day));
    return days;
  };

  //Created a helper function to shorter URL for appointments/:id
  const appointmentUrl = (id) => {
    return `/api/appointments/${id}`;
  };

  //A user can book an interview in an empty appointment slot
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(appointmentUrl(id), appointment).then(() => {
      const days = SpotsForDays(state, appointments);
      setState({
        ...state,
        days,
        appointments,
      });
    });
  };

  //A user can cancel an existing interview.
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(appointmentUrl(id)).then(() => {
      const days = SpotsForDays(state, appointments);
      setState({
        ...state,
        days,
        appointments,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
