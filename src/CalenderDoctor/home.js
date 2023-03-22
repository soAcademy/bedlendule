import React from "react";

function Registration() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-center">
        <img src="/doctorLogo.png" alt="Logo" className="h-64" />
      </div>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-medium text-blue-600">REGISTER</h2>
        <p className="text-gray-600">Create your account</p>
      </div>

      <form>
        <div className="flex flex-wrap justify-center">
          <div className="flex h-[45px] w-1/4 items-center rounded-lg border-2 border-slate-500">
            <input
              type="text"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="first-name"
              placeholder="First name"
            />
          </div>
          <div className="mx-1 flex h-[45px] w-1/3 items-center rounded-lg border-2 border-slate-500">
            <input
              type="text"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="last-name"
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="my-2 flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            {/* <label htmlFor="phone-number">Phone Number</label> */}
            <input
              type="text"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="phone-number"
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            <input
              type="text"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="username"
              placeholder="Username"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="my-2 flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            <input
              type="password"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="password"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            <input
              type="password"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="confirm-password"
              placeholder="Confirm your password"
            />
          </div>
        </div>


        <div className="my-4 flex flex-wrap justify-center">
          <div className="h-[45px] items-center rounded-lg">
          {/* <label htmlFor="account-type">Account Type</label> */}
          <div>
            <label className="radio-inline">
              <input
                type="radio"
                name="account-type"
                id="psychologist"
                value="psychologist"
              />{" "}
              Psychologist
            </label>
            <label className="mx-2 radio-inline">
              <input
                type="radio"
                name="account-type"
                id="client"
                value="client"
              />{" "}
              Client
            </label>
          </div>
        </div>
        </div>





        <div className="form-group">
          <div className="checkbox">
            <label>
              <input type="checkbox" /> By registering, you are agreeing to our
              Terms of use and Privacy Policy
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <div className="already-have-account">
        <p>
          Already have an account? <a href="#">Login</a>
        </p>
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
