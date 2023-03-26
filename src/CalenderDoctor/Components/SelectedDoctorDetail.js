import { Rating } from "primereact/rating";
import { GiAlarmClock } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";

const SelectDoctorDetail = ({ setPage, selectedDoctor }) => {
  const [chooseTimeSlot, setChooseTimeSlot] = useState([]);
  const [insidePage, setInsidePage] = useState("selectDoctorDetail");
  console.log("chooseTimeslot", chooseTimeSlot);
  const doctorDetails = {
    firstName: "Marry",
    lastName: "Wakage",
    review: 5,
    licenseID: "123514788",
    userName: "Marry@",
    email: "Marry@gmail.com",
    contact: "(+66)92-597-5877",
    pictureUrl:
      "https://thumbs.dreamstime.com/b/beautiful-young-doctor-9927050.jpg",
    timeslots: [
      {
        startTime: "15:00",
        FinishTime: "16:00",
        rate: 1500,
      },
      {
        startTime: "18:00",
        FinishTime: "19:30",
        rate: 2000,
      },
      {
        startTime: "20:00",
        FinishTime: "20:30",
        rate: 1000,
      },
    ],
  };

  return (
    <>
      {insidePage === "selectDoctorDetail" && (
        <div className="fixed top-10 flex w-full flex-col ">
          <button
            className="fixed right-5 top-7 rounded-lg text-2xl font-light text-slate-400 hover:bg-slate-50 hover:text-slate-300"
            onClick={() => setPage("doctorLists")}
          >
            <MdClose />
          </button>
          <div className="w-full text-center text-2xl">
            {doctorDetails.firstName} &nbsp; {doctorDetails.lastName}
            <div
              className="backButton absolute top-0 right-0  text-xl"
              onClick={() => setPage("doctorLists")}
            >
              &lt;
            </div>
          </div>

          <div className="mx-auto  pt-2">
            <Rating
              readOnly
              value={doctorDetails.review}
              cancel={false}
              className=""
            />
          </div>
          <div className="mx-auto my-2">
            <img
              src="https://thumbs.dreamstime.com/b/beautiful-young-doctor-9927050.jpg"
              className="h-[200px] rounded-lg"
            />
          </div>
          <div className=" mx-auto my-5 w-[80%] rounded-lg border-2  border-slate-400 pt-2">
            <div className="text-center text-xl">Details</div>

            <ul className="p-[20px] text-slate-600">
              <li>
                Username:
                <span className="text-slate-500 underline underline-offset-2">
                  {" "}
                  {doctorDetails.userName}
                </span>
              </li>
              <li>
                Email:
                <span className="text-slate-500 underline underline-offset-2">
                  {doctorDetails.email}
                </span>
              </li>
              <li>
                License ID:
                <span className="text-slate-500 underline underline-offset-2">
                  {" "}
                  {doctorDetails.licenseID}
                </span>
              </li>
              <li>
                Contact :
                <span className="text-slate-500 underline underline-offset-2">
                  {" "}
                  {doctorDetails.contact}
                </span>
              </li>
            </ul>
          </div>
          <div className=" mx-auto w-[95%]">
            {doctorDetails.timeslots.map((timeslots) => (
              <ul
                className="w-[90%] mx-auto my-4 flex cursor-pointer flex-row gap-2 hover:bg-[#C5E1A5] "
                onClick={() => {
                  setChooseTimeSlot(timeslots);
                  setInsidePage("Appointment");
                }}
              >
                <li className="  relative flex w-[25%] rounded-lg border-2 border-slate-400 p-2 text-center text-sm ">
                  <div className="absolute top-[-10px] w-[50px] bg-white px-1 text-slate-400">
                    From
                  </div>
                  <div className="mx-auto flex">
                    <div className="underline underline-offset-2 ">
                      {timeslots.startTime}
                    </div>
                    <div className="px-1">
                      <GiAlarmClock className="text-base" />
                    </div>
                  </div>
                </li>
                <li className="  relative flex w-[25%]  rounded-lg border-2 border-slate-400 p-2 text-center text-sm">
                  <div className="absolute top-[-10px] bg-white px-1 text-slate-400">
                    To
                  </div>
                  <div className="mx-auto flex">
                    <div className="underline underline-offset-2">
                      {timeslots.FinishTime}
                    </div>
                    <div className="px-1">
                      <GiAlarmClock className="text-base" />
                    </div>
                  </div>
                </li>
                <li className=" relative flex w-[50%]  rounded-lg border-2 border-slate-400 p-2 text-center text-sm">
                  <div className="absolute top-[-10px] bg-white px-1 text-slate-400">
                    Rate
                  </div>
                  <div className=" mx-auto flex">
                    <div className="underline underline-offset-2">
                      {timeslots.rate} THB/Hour
                    </div>
                    <div className="px-1">
                      <AiFillDollarCircle className="my-auto text-base" />
                    </div>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
      )}
      {insidePage === "Appointment" && <Appointment setInsidePage={setInsidePage} chooseTimeSlot={chooseTimeSlot} />}
    </>
  );
};
export default SelectDoctorDetail;
