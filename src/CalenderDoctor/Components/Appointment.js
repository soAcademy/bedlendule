import { AiFillDollarCircle } from "react-icons/ai";
import { GiAlarmClock } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import useRedirect from "../Hooks/useRedirect";
import { useNavigate } from "react-router-dom";

const useProcess = () => {
  const [processing, setProcessing] = useState(false);
  return {
    processing,
    setProcessing,
  };
};
const useSuccess = () => {
  const [success, setSuccess] = useState(false);
  return {
    success,
    setSuccess,
  };
};
const usePatientInfo = () => {
  const [patientInfo, setPatientInfo] = useState([]);
  useEffect(() => {
    const patientUUID = localStorage.getItem("uuid");
    // console.log("patientUUID", patientUUID);

    const _data = JSON.stringify({
      uuid: patientUUID,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getUserDetailByUUID",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("access-token"),
      },
      data: _data,
    };

    axios(config).then((response) => {
      console.log("PatientInfo response.data...", response.data);
      setPatientInfo(response.data);
    });
  }, []);

  return {
    patientInfo,
    setPatientInfo,
  };
};

const Appointment = ({
  appointmentPopup,
  setAppointmentPopup,
  chooseTimeSlot,
  doctorName,
  setFetch,
  fetch,
  setOpenDoctorDetail,
}) => {
  const { processing, setProcessing } = useProcess(false);
  const { success, setSuccess } = useSuccess(false);
  const { redirectToLogin } = useRedirect();
  const { patientInfo } = usePatientInfo();
  const redirect = useNavigate();

  const bookSlot = (chooseTimeSlot) => {
    const _result = {
      price: chooseTimeSlot[1]?.price,
      startTime: chooseTimeSlot[1]?.startTime,
      finishTime: chooseTimeSlot[1]?.finishTime,
      timeslotId: chooseTimeSlot[1]?.id,
      meetingType: chooseTimeSlot[0]?.meetingType,
      location: chooseTimeSlot[0]?.location,
    };

    const _data = JSON.stringify({
      price: _result.price,
      startTime: _result.startTime,
      finishTime: _result.finishTime,
      timeslotId: _result.timeslotId,
      meetingType: _result.meetingType,
      location: _result.location,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/bookTimeSlot",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("access-token"),
      },
      data: _data,
    };
    setProcessing(true);
    axios(config)
      .then((response) => {
        console.log("booking response.data", response.data);
      })
      .then(() => {
        console.log("booking is successful!");
        setSuccess(true);
      })
      .then(() => {
        // console.log("fetch");
        setFetch(!fetch);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          redirectToLogin();
        }
      });

    return;
  };
console.log("doctorName",doctorName);
  return (
    <>
      <div className="fixed top-0 z-30 h-screen w-screen backdrop-blur-[2px]">
        <div className="fixed top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-2 shadow-lg">
          <div className="relative flex flex-col text-center">
            <div className=" my-2 text-2xl font-bold">APPPOINTMENT</div>
            <div
              className="absolute right-0 cursor-pointer rounded-full p-2 text-2xl text-slate-400 opacity-50 duration-100 hover:bg-red-500 hover:text-slate-50"
              onClick={() => setAppointmentPopup(!appointmentPopup)}
            >
              <MdClose className="hover:text-white" />
            </div>
            <div className=" text-xl ">
              Patient : {patientInfo?.firstName}&nbsp;{patientInfo?.lastName}
            </div>
            <div className="mx-auto w-[150px] rounded-lg bg-green-200 text-slate-700">
              Doctor : {doctorName?.firstName} {doctorName?.lastName}
            </div>
            <ul className="mx-auto my-4 flex  flex-row gap-2 ">
              <li className="  relative flex w-[25%] rounded-lg border-2 border-slate-400 p-2 text-center text-sm ">
                <div className="absolute top-[-10px] w-[50px] rounded-lg bg-white px-1 text-slate-400">
                  From
                </div>
                <div className="mx-auto flex">
                  <div className="underline underline-offset-2 ">
                    {chooseTimeSlot[1].startTime.substring(11, 16)}
                  </div>
                  <div className="px-1">
                    <GiAlarmClock className="text-base" />
                  </div>
                </div>
              </li>
              <li className="  relative flex w-[25%]  rounded-lg border-2 border-slate-400 p-2 text-center text-sm">
                <div className="absolute top-[-10px] rounded-lg bg-white px-1 text-slate-400">
                  To
                </div>
                <div className="mx-auto flex">
                  <div className="underline underline-offset-2">
                    {chooseTimeSlot[1].finishTime.substring(11, 16)}
                  </div>
                  <div className="px-1">
                    <GiAlarmClock className="text-base" />
                  </div>
                </div>
              </li>
              <li className=" relative flex w-[50%]  rounded-lg border-2 border-slate-400 p-2 text-center text-sm">
                <div className="absolute top-[-10px] rounded-lg bg-white px-1 text-slate-400">
                  Rate
                </div>
                <div className=" mx-auto flex">
                  <div className="underline underline-offset-2">
                    {chooseTimeSlot[1].price} THB/Hour
                  </div>
                  <div className="px-1">
                    <AiFillDollarCircle className="my-auto text-base text-yellow-500" />
                  </div>
                </div>
              </li>
            </ul>
            <div className="mx-3 rounded-lg border-2 border-slate-400 p-2 text-left indent-8 text-sm text-slate-500">
              &nbsp;&nbsp;&nbsp;{chooseTimeSlot[0].description}
            </div>
            <button
              className="button my-2 mx-auto w-[50%] py-2"
              onClick={() => {
                bookSlot(chooseTimeSlot);
                setFetch(!fetch);
                // loading();
              }}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
      {processing && (
        <div className="fixed top-0 z-40 flex h-screen w-screen ">
          <div className="relative mx-auto my-auto flex h-[15%] w-[40%] flex-col  rounded-lg bg-white  shadow-lg ">
            <div className="w-full pt-4 text-center text-slate-600 ">
              {" "}
              {success === false ? (
                "Processing..."
              ) : (
                <span className="">
                  <p className="text-xl text-[#99B47B]">Success</p>
                  <p>Your booking is succesfull</p>
                </span>
              )}
            </div>

            {!success && (
              <div className="my-auto mx-auto">
                <ProgressSpinner
                  style={{ width: "50px", height: "50px" }}
                  strokeWidth="8"
                  animationDuration="2.5"
                  className=""
                />
              </div>
            )}

            {success && (
              <div
                className="button my-auto mx-auto cursor-pointer px-5 py-1"
                onClick={() => {
                  setProcessing(false);
                  setAppointmentPopup(false);
                  setFetch(!fetch);
                  setOpenDoctorDetail(false);
                  redirect("/schedule/");
                }}
              >
                OK
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Appointment;
