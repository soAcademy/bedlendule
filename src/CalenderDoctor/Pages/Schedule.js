import useRedirect from "../Hooks/useRedirect";
import DoctorSchedule from "./DoctorSchedule";
import PatientSchedule from "./PatientSchedule";
const Schedule = () => {
  const {redirect} = useRedirect()
  const type = JSON.parse(localStorage.getItem("userprofile"))?.type 
  if (!type) {
    console.log('notype')
    redirect('/login')
  }
  return (
    <>
      {type === "PATIENT" && <PatientSchedule />}
      {type === "DOCTOR" && <DoctorSchedule />}
    </>
  );
};

export default Schedule;
