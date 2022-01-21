export function getAppointmentsForDay(state, name) {
  const filteredNames = state.days.filter((day) => day.name === name);
  if (filteredNames.length !== 0) {
    const appointmentsKey = filteredNames[0].appointments;
    let appointmentsArray = [];
    for (let id of appointmentsKey) {
      appointmentsArray.push(state.appointments[id]);
    }
    return appointmentsArray;
  }
  return [];
}
