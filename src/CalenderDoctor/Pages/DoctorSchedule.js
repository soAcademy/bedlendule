import React, { useState, useEffect } from 'react';
import { Calendar } from "primereact/calendar";
import { FaHome } from "react-icons/fa";
import useDoctorCalendarProps from '../Hooks/useDoctorCalendarProps';
const DoctorSchedule = ({setPage}) => {  
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
  const { date, setDate, dateTemplate } = useDoctorCalendarProps();
  return (
    <div className="mt-[70px] h-full">
      <div className="flex w-full flex-col items-center justify-center">
        <Calendar
          className="z-0 w-10/12"
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
            <div className="mx-2 rounded-lg bg-[#C5E1A5] px-4 py-1 text-white shadow-lg ">
              DOCTOR
            </div>
            <div className="mx-2 gap-2 rounded-lg bg-[#E1A5BB] px-4 py-1 text-white shadow-lg">
              NO DOCTOR
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-7 flex w-[90%] gap-2 text-white">
        <button
          className="w-1/2 rounded-lg bg-[#99B47B] py-3 text-center shadow-lg duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482] "
          onClick={() => {
            setPage("createSchedule");
          }}
        >
          CREATE SCHEDULE
        </button>
        <button
          className="w-1/2 rounded-lg bg-[#99B47B] py-3 text-center shadow-lg duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]"
          onClick={() => []}
        >
          REQUEST
        </button>
      </div>
      <div>
        <div className="pl-4 font-bold">INCOMING SCHEDULE</div>

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
  )
}

export default DoctorSchedule