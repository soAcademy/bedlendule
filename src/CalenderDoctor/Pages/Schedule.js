import axios from "axios";
import DoctorSchedule from "./DoctorSchedule";
import PatientSchedule from "./PatientSchedule";
import { useState } from "react";
import useRedirect from "../Hooks/useRedirect";
const Schedule = () => {
  const [type,setType] = useState()
  const token = localStorage.getItem("access-token");
  const {redirectToLogin} = useRedirect()
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://bedlendule-backend.vercel.app/bedlendule/verifySession',
    headers: { 
      'authorization': token
    },
  };
  
  axios.request(config)
  .then((response) => {
    response.data.type === "PATIENT" ? setType("PATIENT") : setType("DOCTOR")
  })
  .catch((error) => {
    console.log(error);
    redirectToLogin()
  });
  
  return (
    <>
      {type === "PATIENT" && <PatientSchedule />}
      {type === "DOCTOR" && <DoctorSchedule />}
    </>
  );
};

export default Schedule;
