import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { FaHome } from "react-icons/fa";
import usePatientCalendarProps from "../Hooks/usePatientCalendarProps";

const UserSchedule = ({ setPage }) => {
  const patient = [
    {
      name: "Bond Rungot",
      time: "19/02/2023 (8am - 9am)",
      location: "Tu hospital",
    },
    {
      name: "Thanapon Bunchot",
      time: "20/02/2023 (8am - 9am)",
      location: "Home office",
    },
  ];
  const [schedule, setSchedule] = useState(patient);
  const { date, setDate, dateTemplate } = usePatientCalendarProps();
  return (
    <div className="z-10 mt-[70px] h-full">
      <div className="z-10 flex w-full flex-col items-center justify-center">
        <Calendar
          className="z-0 w-10/12 shadow-lg"
          value={date}
          onChange={(e) => {
            console.log(e.value.toISOString());
            setDate(e.value.toISOString());
          }}
          minDate={new Date()}
          inline
          showOtherMonths={false}
          dateTemplate={dateTemplate}
        />
        <div className="flex p-2 text-sm">
          <div className="mx-auto my-3 flex">
            <div className="mx-2 flex items-center space-x-2 rounded-md px-4 py-1 shadow-md">
              <div className="h-4 w-4 rounded-full bg-[#C5E1A5]"></div>
              <p>DOCTOR</p>
            </div>
            <div className="mx-2 flex items-center space-x-2 rounded-md px-4 py-1 shadow-md">
              <div className="h-4 w-4 rounded-full bg-[#E1A5BB]"></div>
              <p>NO DOCTOR</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-2 flex w-[90%] justify-center">
        <button
          className="button w-1/2 py-3 text-white"
          onClick={() => {
            setPage("createRequest");
          }}
        >
          CREATE REQUEST
        </button>
      </div>
      <div>
        <div className="pl-4 font-bold my-5">INCOMING SCHEDULE</div>

        {schedule.map((schedule) => (
          <div className="mx-5 my-4 flex w-[90%] rounded-lg border-2 border-sky-500 bg-slate-200 p-2 text-blue-400">
            <div className="w-2/3">
              <div className="font-bold">{schedule.name}</div>
              <div className="text-sm">{schedule.time}</div>
            </div>
            <div className=" flex text-center ">
              <div className="my-auto  text-center">
                <FaHome className="text-blue-500" />
              </div>
              <div className="  my-auto">{schedule.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSchedule;
