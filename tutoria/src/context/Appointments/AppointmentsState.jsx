import React, { useReducer } from "react";
import AppointmentsReducer from "./AppointmentsReducer";
import AppointmentsContext from "./AppointmentsContext";
import clienteAxios from "../../config/axios";


function AppointmentsState({ children }) {
  const initialState = {
    tutor: null,
    studentsList: [],
    studentSelected: null,
    appointmentList: [],
    appointmentSelected: null,
    appointmentNew: null,
  };

  // useState is a hook that allows us to create a state variable
  // useReducer is a hook that allows us to create a state variable and a reducer function

  const [state, dispatch] = useReducer(AppointmentsReducer, initialState);

  // All functions
  const getTutor = async () => {
    const res = await clienteAxios.get("/tutor/<string:cod_tutor>");
    dispatch({
      type: "GET_TUTOR",
      payload: res.data,
    });
  };

  const getStudentsList = async () => {
    const res = await clienteAxios.get("/students");
    dispatch({
      type: "GET_STUDENTS_LIST",
      payload: res.data,
    });
  };
  const getStudentSelected = async (codStudent) => {
    const res = await clienteAxios.get(`/student/${codStudent}`);
    dispatch({
      type: "GET_STUDENT_SELECTED",
      payload: res.data,
    });
  };

  const getAppointmentList = async (codStudent) => {
    const res = await clienteAxios.get(`/appointments/${codStudent}`);
    dispatch({
      type: 'GET_APPOINTMENTS_LIST',      
      payload: res.data
    });
  };

  const postAppointmentNew = async (codStudent,data) => {
    const res = await clienteAxios.post(`/appointments/${codStudent}`,data);
    dispatch({
      type: 'POST_APPOINTMENT_NEW',
      payload: res.data
    });
  };

  const getAppointment = async (codAppointment) => {
    const res = await clienteAxios.get(`/appointment/${codAppointment}`);
    dispatch({
      type: 'GET_APPOINTMENT',
      payload: res.data
    });
  }

  
  return (
    //Context provider
    <AppointmentsContext.Provider
      value={{
        // Functions
        getTutor,
        getStudentsList,
        getStudentSelected,
        getAppointmentList,
        postAppointmentNew,
        getAppointment,
        // Values
        tutor: state.tutor,
        studentsList: state.studentsList,
        studentSelected: state.studentSelected,
        appointmentList: state.appointmentList,
        appointmentNew: state.appointmentNew,
        appointmentSelected: state.appointmentSelected
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}

export default AppointmentsState;
