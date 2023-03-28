import { AiFillDollarCircle } from "react-icons/ai";
import { GiAlarmClock } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const Appointment = ({ appointmentPopup,setAppointmentPopup, chooseTimeSlot, doctorName }) => {
  console.log("chooseTimeSlot>>>", chooseTimeSlot);
  console.log("appointmentPopup>>>>",appointmentPopup)
  const description =
    "You may not feel like it right now but thats my job. I want to hear every bit of what's going wrong and how it's impacting you now. At the same time we'll work on developing your belief in yourself in order to actually use the coping skills you probably already have.";

  return (
    <>
    <div className="h-screen w-screen backdrop-blur-md fixed top-0">
      <div className="fixed top-[20%] right-[5%] w-[90%] rounded-lg p-2 shadow-lg bg-white">
        <div className="relative flex flex-col text-center ">
          <div className=" my-2 text-2xl font-bold">APPPOINTMENT</div>
          <div
            className="absolute right-0 p-2 text-xl opacity-50 cursor-pointer rounded-full hover:bg-red-500"
            onClick={() =>setAppointmentPopup(!appointmentPopup)}
          >
            <MdClose className="hover:text-white"/>
          </div>
          <div className=" text-xl ">Patient : Jone Smith</div>
          <div className="text-slate-700 bg-green-200 rounded-lg w-[150px] mx-auto">Doctor : {doctorName.firstName} {doctorName.lastName}</div>
          <ul className="mx-auto my-4 flex cursor-pointer flex-row gap-2 ">
            <li className="  relative flex w-[25%] rounded-lg border-2 border-slate-400 p-2 text-center text-sm ">
              <div className="absolute top-[-10px] w-[50px] bg-white px-1 text-slate-400 rounded-lg">
                From
              </div>
              <div className="mx-auto flex">
                <div className="underline underline-offset-2 ">
                  {chooseTimeSlot.startTime}
                </div>
                <div className="px-1">
                  <GiAlarmClock className="text-base" />
                </div>
              </div>
            </li>
            <li className="  relative flex w-[25%]  rounded-lg border-2 border-slate-400 p-2 text-center text-sm">
              <div className="absolute top-[-10px] bg-white px-1 text-slate-400 rounded-lg">
                To
              </div>
              <div className="mx-auto flex">
                <div className="underline underline-offset-2">
                  {chooseTimeSlot.finishTime}
                </div>
                <div className="px-1">
                  <GiAlarmClock className="text-base" />
                </div>
              </div>
            </li>
            <li className=" relative flex w-[50%]  rounded-lg border-2 border-slate-400 p-2 text-center text-sm">
              <div className="absolute top-[-10px] bg-white px-1 text-slate-400 rounded-lg">
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
          <div className="mx-3 rounded-lg border-2 border-slate-400 p-2 text-left text-sm text-slate-500 indent-8">
            &nbsp;&nbsp;&nbsp;{description}
          </div>
          <button className="button my-2 mx-auto w-[50%] py-2">CONFIRM</button>
        </div>
      </div>
      </div>
    </>
  );
};
export default Appointment;
