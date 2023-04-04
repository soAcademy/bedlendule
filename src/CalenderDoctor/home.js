import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Landing from "./Pages/Landing";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import SelectDoctor from "./Components/SelectDoctor";
import axios from "axios";
import SelectRequest from "./Components/SelectRequest";
import Schedule from "./Pages/Schedule";
import ProfileSetting from "./Components/ProfileSetting";

export const ConfirmPopupContext = createContext();
export const DisabledatesContext = createContext();

export const Home = () => {
  const [disabledDates, setDisabledDates] = useState([]);
  const [datesArray, setDatesArray] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [confirmPopupToggle, setConfirmPopupToggle] = useState(false);
  const [page, setPage] = useState(); // landing
  const [type, setType] = useState(); //อย่าลืมเปลี่ยนเป็น doctor

  const accessToken = localStorage.getItem("access-token");
  useEffect(() => {
    if (accessToken) {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://bedlendule-backend.vercel.app/bedlendule/verifySession",
        headers: {
          authorization: accessToken,
          "Content-Type": "application/json",
        },
      };
      axios
        .request(config)
        .then((response) => {
          if (response.status === 200 && response.data.uuid) {
            localStorage.setItem("uuid", response.data.uuid);
          } else if (
            response.status === 200 &&
            !response.data.uuid &&
            window.location.href !== window.location.origin + "/login"
          ) {
            window.location = window.location.origin + "/login";
            localStorage.removeItem("access-token");
            localStorage.removeItem("userprofile");
          } else {
            window.location = window.location.origin + "/login";
            localStorage.removeItem("access-token");
            localStorage.removeItem("uuid");
            localStorage.removeItem("userprofile");
          }
        })
        .catch((error) => {
          window.location = window.location.origin + "/login";
          localStorage.removeItem("access-token");
          localStorage.removeItem("uuid");
          localStorage.removeItem("userprofile");
          console.log(error);
        });
    } else {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://bedlendule-backend.vercel.app/bedlendule/getPublicToken",
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          localStorage.setItem("access-token", response.data.access_token);
          localStorage.removeItem("uuid");
          localStorage.removeItem("userprofile");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    const uuid = localStorage.getItem("uuid");
    if (uuid) {
      let data = JSON.stringify({
        uuid: uuid,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://bedlendule-backend.vercel.app/bedlendule/getUserDetailByUUID",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          localStorage.setItem("userprofile", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
            <Nav setType={setType} type={type} page={page} setPage={setPage} />

            <div className="absolute top-[50px] w-full">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="login" element={<Login />} />
                <Route path="setting" element={<ProfileSetting />} />
                <Route path="signup" element={<Registration />} />
                <Route path="schedule" element={<Schedule />} />
                <Route
                  exact
                  path="schedule/selectdoctor/:date"
                  element={<SelectDoctor />}
                />
                <Route
                  exact
                  path="schedule/selectRequest/:date"
                  element={<SelectRequest />}
                />
                <Route
                  exact
                  path="schedule/selectdoctor/"
                  element={<SelectDoctor />}
                />
                <Route
                  exact
                  path="schedule/selectRequest/"
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
