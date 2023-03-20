import { useState, useEffect } from "react";
import Nav from "./Components/Nav";
import CreateRequest from "./Components/CreateRequest";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Landing from "./Pages/Landing";
import UserSchedule from "./Pages/PatientSchedule";
import DoctorSchedule from "./Pages/DoctorSchedule";
import Request from "./Components/Request";

const Home = () => {
  const [confirmPopupToggle, setConfirmPopupToggle] = useState(false);
  const [page, setPage] = useState("request");  //อย่าลืมเปลี่ยนกลับเป็น landing
  const [type, setType] = useState("patient"); 

  return (
    <div className="h-full font-kanit">
      <Nav className="cursor-pointer" />
      {page === "landing" && <Landing setPage={setPage} type={type}/>}
      {page === "patientSchedule" && <UserSchedule setPage={setPage} />}
      {page === "doctorSchedule" && <DoctorSchedule setPage={setPage} />}
      {page === "createRequest" && (
        <CreateRequest
          setPage={setPage}
          setConfirmPopupToggle={setConfirmPopupToggle}
          confirmPopupToggle={confirmPopupToggle}
        />
      )}
      {page === "request" &&<Request setPage={setPage}/>}
    </div>
  );
};
export default Home;
