import { AiFillDollarCircle } from "react-icons/ai";
import { GiAlarmClock } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";

const Appointment = ({
  appointmentPopup,
  setAppointmentPopup,
  chooseTimeSlot,
  doctorName,
}) => {
  const [booktimeSlot, setBooktimeSlot] = useState([]);

  console.log("chooseTimeSlot>>>", chooseTimeSlot);
  console.log("booktimeSlot",booktimeSlot);

  const tranformData = (chooseTimeSlot) => {
    const _result = {
      price: chooseTimeSlot.price,
      startTime: chooseTimeSlot.startTime,
      finishTime: chooseTimeSlot.finishTime,
      patientUUID: chooseTimeSlot.patientUUID,
      timeslotId: chooseTimeSlot.timeslotId,
      meetingType: chooseTimeSlot.meetingType,
      location: chooseTimeSlot.location,
    };
    setBooktimeSlot(_result);
  };

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
              onClick={() => tranformData(chooseTimeSlot)}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Appointment;
