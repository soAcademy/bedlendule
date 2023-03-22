import { useState, useEffect, createContext } from "react";
import Nav from "./Components/Nav";
import CreateRequest from "./Components/CreateRequest";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Landing from "./Pages/Landing";
import PatientSchedule from "./Pages/PatientSchedule";
import DoctorSchedule from "./Pages/DoctorSchedule";
import { BsArrowLeft } from "react-icons/bs";
import DoctorProfileUserSide from "./Components/RequestInfoUser";
import ReviewDoctor from "./Components/ReviewDoctor";

export const ConfirmPopupContext = createContext();

export const Home = () => {
  const [confirmPopupToggle, setConfirmPopupToggle] = useState(false);
  const [page, setPage] = useState("landing"); //
  const [type, setType] = useState("doctor"); //อย่าลืมเปลี่ยนเป็น doctor

  return (
    <ConfirmPopupContext.Provider
      value={{ confirmPopupToggle, setConfirmPopupToggle }}
    >
      <div className="h-full font-kanit">
        <Nav
          setType={setType}
          type={type}
          page={page}
          setPage={setPage}
          className="cursor-pointer"
        />
        {page === "landing" && <Landing setPage={setPage} type={type} />}
        {page === "home" && type === "patient" && (
          <PatientSchedule setPage={setPage} />
        )}
        {page === "home" && type === "doctor" && (
          <DoctorSchedule setPage={setPage} />
        )}
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
      </div>
    </ConfirmPopupContext.Provider>
  );
};
