import { useState, useEffect } from "react";
import Nav from "./Components/Nav";
import Request from "./Components/Request";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Landing from "./Pages/Landing";
import UserSchedule from "./Pages/PatientSchedule";
import DoctorSchedule from "./Pages/DoctorSchedule";

const Home = () => {
  const [confirmPopupToggle, setConfirmPopupToggle] = useState(false);
  const [page, setPage] = useState("landing");
  const [type, setType] = useState("doctors");

  return (
    <div className="h-full font-kanit">
      <Nav className="cursor-pointer" />
      {page === "landing" && <Landing setPage={setPage} type={type}/>}
      {page === "patientSchedule" && <UserSchedule setPage={setPage} />}
      {page === "doctorSchedule" && <DoctorSchedule setPage={setPage} />}
      {page === "createRequest" && (
        <Request
          setPage={setPage}
          setConfirmPopupToggle={setConfirmPopupToggle}
          confirmPopupToggle={confirmPopupToggle}
        />
      )}
    </div>
  );
};
export default Home;
