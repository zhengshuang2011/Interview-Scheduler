function getAppointmentsForDay(state, name) {
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
function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  if (interview.interviewerData) {
    return interview;
  }
  const interviewerId = interview.interviewer;
  interview.interviewerData = state.interviewers[interviewerId];
  return interview;
}

export { getAppointmentsForDay, getInterview };
