import { useState, useEffect, createContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  redirect,
} from "react-router-dom";
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
import DoctorProfileUserSide from "./Components/RequestInfoUser";
import ReviewDoctor from "./Components/ReviewDoctor";
import RequestDetail from "./Components/RequestDetail";
import SelectDoctor from "./Components/SelectDoctor";
import axios from "axios";
import SelectRequest from "./Components/SelectRequest";
import Schedule from "./Pages/Schedule";

export const ConfirmPopupContext = createContext();
export const DisabledatesContext = createContext();

export const Home = () => {
  const [disabledDates, setDisabledDates] = useState([]);
  const [datesArray, setDatesArray] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [confirmPopupToggle, setConfirmPopupToggle] = useState(false);
  const [page, setPage] = useState(); // landing
  const [type, setType] = useState(); //อย่าลืมเปลี่ยนเป็น doctor
  
  window.onload = () => {
    const accessToken = localStorage.getItem("access-token");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5555/bedlendule/verifySession",
      headers: {
        "access-token": accessToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        if (response.status === 250) {
          redirect("/login");
        } else if (response.status === 200) {
          localStorage.setItem("type", response.data.type);
          localStorage.setItem("uuid", response.data.uuid);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("page", page);
  }, [page]);
  const dateTemplate = (date) => {
    const _date = new Date([date.year, +date.month + 1, date.day].join("-"));
    if (!datesArray.includes(_date.toLocaleDateString())) {
      const _datesArray = [
        ...new Set([...datesArray, _date.toLocaleDateString()]),
      ];
      setDatesArray(_datesArray);
    }
    if (
      timeSlots?.includes(_date.toLocaleDateString()) &&
      _date.getTime() >= new Date(new Date().toDateString()).getTime()
    ) {
      return date.day === new Date().getDate() ? (
        <div
          style={{
            backgroundColor: "#99B47B",
            color: "#ffffff",
            borderRadius: "50%",
            width: "4em",
            height: "4em",
            lineHeight: "4em",
            padding: 0,
            textAlign: "center",
          }}
        >
          {date.day}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#C5E1A5",
            color: "#ffffff",
            borderRadius: "50%",
            width: "3em",
            height: "3em",
            lineHeight: "3em",
            padding: 0,
            textAlign: "center",
          }}
        >
          {date.day}
        </div>
      );
    } else {
      return (
        <div
          className="bg-slate-200 text-slate-400"
          style={{
            borderRadius: "50%",
            width: "3em",
            height: "3em",
            lineHeight: "3em",
            padding: 0,
            textAlign: "center",
          }}
        >
          {date.day}
        </div>
      );
    }
  };
  return (
    <ConfirmPopupContext.Provider
      value={{ confirmPopupToggle, setConfirmPopupToggle }}
    >
      <DisabledatesContext.Provider
        value={{
          dateTemplate,
          disabledDates,
          setDisabledDates,
          timeSlots,
          setTimeSlots,
          datesArray,
          setDatesArray,
        }}
      >
        <div className="relative h-full w-full font-kanit">
          <BrowserRouter>
            <Nav
              setType={setType}
              type={type}
              page={page}
              setPage={setPage}
              className="cursor-pointer"
            />

            <div>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="login" element={<Login />} />
                <Route path="schedule" element={<Schedule />}></Route>
                <Route
                  exact path="schedule/selectdoctor/:date"
                  element={<SelectDoctor />}
                />
                <Route
                  exact path="schedule/selectRequest/:date"
                  element={<SelectRequest />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </DisabledatesContext.Provider>
    </ConfirmPopupContext.Provider>
  );
};
