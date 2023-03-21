import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { FaHome } from "react-icons/fa";
import useDoctorCalendarProps from "../Hooks/useDoctorCalendarProps";
import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
const DoctorSchedule = ({ setPage }) => {
  const [schedule, setSchedule] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState();
  const { date, setDate, dateTemplate } = useDoctorCalendarProps();
  useEffect(() => {
    let data = JSON.stringify({
      uuid: "ba797dc5-75d1-4a48-bc54-f5e45d53c02b",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getScheduleByUUID",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setSchedule(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="mt-[70px] h-full">
      <div className="flex w-full flex-col items-center justify-center">
        <Calendar
          className="z-0 w-10/12 md:w-8/12"
          value={date}
          onChange={(e) => {
            console.log(e.value.toISOString());
            setDate(e.value.toISOString());
          }}
          minDate={new Date()}
          inline
          locale="en"
          dateTemplate={dateTemplate}
        />
        <div className="flex p-2 text-sm">
          <div className="mx-auto my-3 flex">
            <div className="mx-2 flex items-center gap-2 rounded-md px-4 py-1 shadow-md">
              <div className="h-4 w-4 rounded-full bg-[#C5E1A5]"></div>
              <p>REQUEST</p>
            </div>
            <div className="mx-2 flex items-center gap-2 rounded-md px-4 py-1 shadow-md">
              <div className="h-4 w-4 rounded-full bg-[#E1A5BB]"></div>
              <p>NO REQUEST</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-2 flex w-full justify-center gap-2 px-6 text-white md:mx-auto md:gap-10">
        <button
          className="button w-1/2 py-3 md:w-1/4"
          onClick={() => {
            setPage("createSchedule");
          }}
        >
          CREATE SCHEDULE
        </button>
        <button className="button w-1/2 py-3 md:w-1/4" onClick={() => []}>
          REQUEST
        </button>
      </div>
      <div>
        <div className="mx-auto my-4 pl-4 font-bold text-slate-700 md:w-1/2">
          INCOMING SCHEDULE
        </div>

        {schedule.map((schedule, idx) => (
          <div
            key={idx}
            className="mx-auto my-4 flex w-[90%] flex-col space-y-2 rounded-lg border-2 border-[#36c2f9] p-2 text-slate-600 md:w-1/2"
          >
            <div className="flex justify-between">
              <div className="w-2/3">
                <div className="font-bold">{schedule.specialistInfo}</div>
                <div className="flex text-center">
                  <div className="my-auto flex text-center text-xs">
                    <FaHome className="text-blue-500" />
                    {schedule.location}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setScheduleToEdit(idx);
                  setIsEditOpen(true);
                }}
                className="float-right text-2xl text-slate-500 hover:text-slate-400"
              >
                <BiEditAlt />
              </button>
            </div>

            {schedule.timeslots?.map((e) => {
              return (
                <div
                  className={`flex items-center justify-between rounded-lg border-2 bg-slate-100 p-2 text-slate-400 ${
                    e.requestId &&
                    "border-[#beda9f] bg-[#f5fbec] text-slate-600"
                  }`}
                >
                  <div>
                    <p>{e.requestId ? "Patient Name" : "No Booking"}</p>
                    <p>
                      {new Date(e.startTime).toLocaleDateString("TH")} :{" "}
                      {new Date(e.startTime)
                        .toLocaleTimeString("TH")
                        .slice(0, 5)}
                      -
                      {new Date(e.finishTIme)
                        .toLocaleTimeString("TH")
                        .slice(0, 5)}
                    </p>
                  </div>
                  <div>฿ {e.price}</div>
                </div>
              );
            })}
            {
              <div
                className={`fixed top-0 left-0 right-0 z-50 h-full w-full 
      bg-slate-300 bg-opacity-10 backdrop-blur-[2px]
      ${isEditOpen && scheduleToEdit === idx ? "scale-1" : "scale-0"}`}
              >
                <div
                  className={`relative top-1/2 left-1/2 w-11/12 -translate-x-[50%] -translate-y-[50%] rounded-lg bg-white 
    p-6 text-center shadow-md duration-200
    ${isEditOpen && scheduleToEdit === idx ? "scale-1" : "scale-0"}`}
                >
                  <div>
                    <p className="text-2xl font-bold text-[#4C4E64DE] ">
                      {idx} {schedule.specialistInfo}
                    </p>
                    <p className="text-[#4C4E64AD]">description</p>
                  </div>
                  <div className="mt-4 flex flex-col space-y-2">
                    <button
                      className="text-md mx-auto w-24 rounded-md bg-[#99B47B] py-1 text-white duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]"
                      onClick={() => {}}
                    >
                      CONFIRM
                    </button>
                    <button
                      onClick={() => setIsEditOpen(false)}
                      className="text-md mx-auto w-24 rounded-md bg-[#99B47B] py-1 text-white duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSchedule;
