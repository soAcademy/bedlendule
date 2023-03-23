import React from "react";
import { Button, Checkbox } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Registration() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-center">
        <img src="/doctorLogo.png" alt="Logo" className="h-64" />
      </div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-blue-600">WELCOME BACK</h2>
        <p className="text-gray-600">YOUR MENTAL HEALTH MATTERS</p>
      </div>

      <form>
        <div className="flex flex-wrap justify-center">
          <div className="my-2 flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            <input
              type="text"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="username"
              placeholder="Username"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            <input
              type="password"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="password"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="my-2 flex flex-wrap justify-center">
          <div className="flex h-[40px] w-3/5 items-center rounded-lg">
            <label>
              <input type="checkbox" /> Remember your password?
            </label>
            <div className="mx-6 font-bold">
            <a href="#"> Forget Password? </a>
            </div>
          </div>
        </div>

        <div className="my-4 flex flex-wrap justify-center">
          <Button
            label="Login"
            icon="pi pi-check"
            iconPos="right"
            size="large"
          />
        </div>
      </form>
      <div className="already-have-account">
        <div className="my-4 flex flex-wrap justify-center">
          <p>
            Don't have an account?{" "}
            <a className="font-bold underline underline-offset-1" href="#">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;

// import { useState, useEffect } from "react";
// import Nav from "./Components/Nav";
// import CreateRequest from "./Components/CreateRequest";
// import "primereact/resources/themes/saga-green/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
// import Landing from "./Pages/Landing";
// import Registration from "./Pages/Registration";
// import PatientSchedule from "./Pages/PatientSchedule";
// import DoctorSchedule from "./Pages/DoctorSchedule";
// import Request from "./Components/Request";
// import { BsArrowLeft } from "react-icons/bs";

// const Home = () => {
//   const [confirmPopupToggle, setConfirmPopupToggle] = useState(false);
//   const [registration, setRegistration] = useState("registration");
//   const [page, setPage] = useState("landing");
//   const [type, setType] = useState("patient"); //อย่าลืมเปลี่ยนเป็น doctor

//   return (
//     <div className="h-full font-kanit">
//       <Nav
//         registration={registration}
//         setRegistration={setRegistration}
//         className="cursor-pointer"
//       />
//       {page === "registration" && (
//         <Registration setRegistration={setRegistration} type={type} />
//       )}
//       {page === "landing" && <Landing setPage={setPage} />}
//       {page === "patientSchedule" && <PatientSchedule setPage={setPage} />}
//       {page === "doctorSchedule" && <DoctorSchedule setPage={setPage} />}
//       {page === "createRequest" && (
//         <CreateRequest
//           setPage={setPage}
//           setConfirmPopupToggle={setConfirmPopupToggle}
//           confirmPopupToggle={confirmPopupToggle}
//         />
//       )}
//       {page === "request" && <Request setPage={setPage} />}
//       {page === "setting" && (
//         <button
//           onClick={() => setPage("landing")}
//           className="fixed top-20 right-5 z-40 rounded-lg border-2 p-4 shadow-xl hover:bg-slate-50 active:bg-slate-100"
//         >
//           <BsArrowLeft />
//         </button>
//       )}
//     </div>
//   );
// };
// export default Home;
