import { useState, useEffect, createContext } from "react";
import Nav from "./Components/Nav";
import CreateRequest from "./Components/CreateRequest";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Landing from "./Pages/Landing";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import PatientSchedule from "./Pages/PatientSchedule";
import DoctorSchedule from "./Pages/DoctorSchedule";
import { BsArrowLeft } from "react-icons/bs";
import 
import DoctorProfileUserSide from "./Components/RequestInfoUser";
import ReviewDoctor from "./Components/ReviewDoctor";
import RequestDetail from "./Components/RequestDetail";
import SelectDoctor from "./Components/SelectDoctor";

export const ConfirmPopupContext = createContext();

export const Home = () => {
  const [confirmPopupToggle, setConfirmPopupToggle] = useState(false);
  const [page, setPage] = useState("login"); // landing
  const [type, setType] = useState("doctor"); //อย่าลืมเปลี่ยนเป็น doctor
  localStorage.setItem("doctorUUID", "d3d7e1bc-fa8a-48e5-9617-7970d60fb15b");
  localStorage.setItem("patientUUID", "c646e99a-9a64-497a-87fd-6972bd7bf387");
  return (
    <ConfirmPopupContext.Provider
      value={{ confirmPopupToggle, setConfirmPopupToggle }}
    >
      <div className="relative h-full w-full font-kanit">
        <Nav
          setType={setType}
          type={type}
          page={page}
          setPage={setPage}
          className="cursor-pointer"
        />
        {page === "landing" && <Landing setPage={setPage} />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "signup" && <Registration setPage={setPage} />}
        {page === "patient" && <PatientSchedule setPage={setPage} />}
        {page === "doctor" && <DoctorSchedule setPage={setPage} />}
        {page === "createRequest" && <CreateRequest setPage={setPage} />}
        {page === "setting" && (
          <button
            onClick={() => setPage("landing")}
            className="fixed top-20 right-5 z-40 rounded-lg border-2 p-4 shadow-xl hover:bg-slate-50 active:bg-slate-100"
          >
            <BsArrowLeft />
          </button>
        )}
        {page === "reviewDoctor" && <ReviewDoctor setPage={setPage} />}
        {page === "requestDetail" && <RequestDetail setPage={setPage} />}
      </div>
    </ConfirmPopupContext.Provider>
  );
};
