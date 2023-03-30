import DoctorSchedule from "./DoctorSchedule";
import PatientSchedule from "./PatientSchedule";
const Schedule = () => {
  const type = localStorage.getItem("type");
  return (
    <>
      {type === "PATIENT" && <PatientSchedule />}
      {type === "DOCTOR" && <DoctorSchedule />}
    </>
  );
};

export default Schedule;
