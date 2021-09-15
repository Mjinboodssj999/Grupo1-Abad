import {
  GET_STUDENTS_LIST,
  GET_STUDENT_SELECTED,
  GET_APPOINTMENTS_LIST,
  POST_APPOINTMENT_NEW,
  GET_APPOINTMENT,
} from "../types";

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // case GET_TUTOR:
    //   return {
    //     ...state,
    //     tutor: payload
    //   }
    case GET_STUDENTS_LIST:
      return {
        ...state,
        studentsList: payload,
      };
    case GET_STUDENT_SELECTED:
      return {
        ...state,
        studentSelected: payload,
      };
    case GET_APPOINTMENTS_LIST:
      return {
        ...state,
        appointmentList: payload,
      };
    case POST_APPOINTMENT_NEW:
      return {
        ...state,
        appointmentList: [
          ...state.appointmentList,
          payload
        ],
      };
    case GET_APPOINTMENT:
      return {
        ...state,
        appointmentSelected: payload,
      }
  }
};
