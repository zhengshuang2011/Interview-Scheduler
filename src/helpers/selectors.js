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

function getInterviewersForDay(state, name) {
  const filteredNames = state.days.filter((day) => day.name === name);
  if (filteredNames.length !== 0) {
    const interviewersKey = filteredNames[0].interviewers;
    let interviewersArray = [];
    for (let id of interviewersKey) {
      interviewersArray.push(state.interviewers[id]);
    }
    return interviewersArray;
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

export { getAppointmentsForDay, getInterviewersForDay, getInterview };
