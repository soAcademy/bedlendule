import { useState, useEffect } from "react";
import Nav from "./Components/Nav";
import CreateRequest from "./Components/CreateRequest";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Landing from "./Pages/Landing";
import PatientSchedule from "./Pages/PatientSchedule";
import DoctorSchedule from "./Pages/DoctorSchedule";
import { BsArrowLeft } from "react-icons/bs";

const Home = () => {
  const [confirmPopupToggle, setConfirmPopupToggle] = useState(false);
  const [page, setPage] = useState("landing");
  const [type, setType] = useState("patient"); //อย่าลืมเปลี่ยนเป็น doctor

  return (
    <div className="h-full font-kanit">
      <Nav page={page} setPage={setPage} className="cursor-pointer" />
      {page === "landing" && <Landing setPage={setPage} type={type} />}
      {page === "patientSchedule" && <PatientSchedule setPage={setPage} />}
      {page === "doctorSchedule" && <DoctorSchedule setPage={setPage} />}
      {page === "createRequest" && (
        <CreateRequest
          setPage={setPage}
          setConfirmPopupToggle={setConfirmPopupToggle}
          confirmPopupToggle={confirmPopupToggle}
        />
      )}
      {page === "setting" && (
        <button
          onClick={() => setPage("landing")}
          className="fixed top-20 right-5 z-40 rounded-lg border-2 p-4 shadow-xl hover:bg-slate-50 active:bg-slate-100"
        >
          <BsArrowLeft />
        </button>
      )}
    </div>
  );
};
export default Home;
