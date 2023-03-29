import { AiFillDollarCircle } from "react-icons/ai";
import { GiAlarmClock } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { AiFillCheckCircle } from "react-icons/ai";

const Appointment = ({
  appointmentPopup,
  setAppointmentPopup,
  chooseTimeSlot,
  doctorName,
}) => {
  const [booktimeSlot, setBooktimeSlot] = useState([]);
  const [processing, setProcessing] = useState(false);

  console.log("processing",processing)
  console.log("booktimeSlot", booktimeSlot);

  const tranformData = (selectTimeSlot) => {
    const _result = {
      price: selectTimeSlot?.price,
      startTime: selectTimeSlot?.startTime,
      finishTime: selectTimeSlot?.finishTime,
      patientUUID: selectTimeSlot?.patientUUID,
      timeslotId: selectTimeSlot?.timeslotId,
      meetingType: selectTimeSlot?.meetingType,
      location: selectTimeSlot?.location,
    };
     return setBooktimeSlot(_result);
  };

  useEffect(() => {
    console.log("useEffect working...");
  
    const _data = JSON.stringify({
      price: booktimeSlot.price,
      startTime: booktimeSlot.startTime,
      finishTime: booktimeSlot.finishTime,
      patientUUID: booktimeSlot.patientUUID,
      timeslotId: booktimeSlot.timeslotId,
      meetingType: booktimeSlot.meetingType,
      location: booktimeSlot.location,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/bookTimeSlot",
      headers: {
        "Content-Type": "application/json",
      },
      data: _data,
    };
    // setProcessing(true);
    axios(config).then((response) => {
      // setProcessing(false);
      console.log(response.data);
    });
   
  }, [booktimeSlot]);
  return (
    <>
      <div className="fixed top-0 h-screen w-screen backdrop-blur-md">
        <div className="fixed top-[20%] right-[5%] w-[90%] rounded-lg bg-white p-2 shadow-lg">
          <div className="relative flex flex-col text-center ">
            <div className=" my-2 text-2xl font-bold">APPPOINTMENT</div>
            <div
              className="absolute right-0 cursor-pointer rounded-full p-2 text-xl opacity-50 hover:bg-red-500"
              onClick={() => setAppointmentPopup(!appointmentPopup)}
            >
              <MdClose className="hover:text-white" />
            </div>
            <div className=" text-xl ">Patient : Jone Smith</div>
            <div className="mx-auto w-[150px] rounded-lg bg-green-200 text-slate-700">
              Doctor : {doctorName.firstName} {doctorName.lastName}
            </div>
            <ul className="mx-auto my-4 flex  flex-row gap-2 ">
              <li className="  relative flex w-[25%] rounded-lg border-2 border-slate-400 p-2 text-center text-sm ">
                <div className="absolute top-[-10px] w-[50px] rounded-lg bg-white px-1 text-slate-400">
                  From
                </div>
                <div className="mx-auto flex">
                  <div className="underline underline-offset-2 ">
                    {chooseTimeSlot.startTime.substring(11, 16)}
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
                    {chooseTimeSlot.finishTime.substring(11, 16)}
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
                    {chooseTimeSlot.price} THB/Hour
                  </div>
                  <div className="px-1">
                    <AiFillDollarCircle className="my-auto text-base" />
                  </div>
                </div>
              </li>
            </ul>
            <div className="mx-3 rounded-lg border-2 border-slate-400 p-2 text-left indent-8 text-sm text-slate-500">
              &nbsp;&nbsp;&nbsp;{chooseTimeSlot.description}
            </div>
            <button
              className="button my-2 mx-auto w-[50%] py-2"
              onClick={() =>{tranformData(chooseTimeSlot);setAppointmentPopup(false)}}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
      {processing && (
        <div className="fixed top-0 flex h-screen w-screen backdrop-blur-sm">
          <div className="mx-auto my-auto flex h-[20%] w-[30%] rounded-lg  bg-white shadow-lg ">
            <div className="my-auto mx-auto">
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="8"
                animationDuration="2.5"
                className=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Appointment;
