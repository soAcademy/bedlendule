import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
const Request = ({ setPage }) => {
  const timeRange = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];

  console.log(">>>>",Number(timeRange[13].slice(0,2)));
  const [fromTime, setFromTime] = useState("15:00");
  const [toTime, setToTime] = useState("16:00");
  return (
    <>
      <div className=" mx-auto mt-[70px] mb-5 h-screen w-[90%] rounded-lg bg-slate-100 shadow-lg">
        <div
          className=" px-2  text-right text-xl text-slate-500"
          onClick={() => setPage("landing")}
        >
          x
        </div>
        <div className="flex text-center  text-3xl ">
          <div className="w-full font-bold text-slate-500">REQUEST</div>
        </div>
        <div className=" mx-auto my-4 flex gap-3  text-center text-slate-400 ">
          <div className="mx-auto flex gap-4">
            <div className="relative flex  gap-2 rounded-lg border-2 border-slate-500 py-3 px-2">
              <div className="absolute top-[-15px] bg-white px-1">DATE</div>
              20/03/2023
              <AiOutlineSchedule className="my-auto text-xl " />
            </div>
            
            <div className="relative">
              <div className="absolute top-[-12px] ml-4 px-2 bg-white">From</div>
            <select
              className="flex gap-2  rounded-lg border-2 border-slate-500 py-3 px-2 "
              value={fromTime}
              onChange={(e) => {
                // console.log(e.target.value);
                setFromTime(e.target.value)}}
            >
              
              {timeRange
                ?.filter((time) => time !== toTime)
                ?.map((r) => (
                  <option value={r}>{r}</option>
                ))}

              <FaClock className="my-auto" />
            </select>
            </div>
            <div className="relative">
            <div className="absolute top-[-12px] ml-4 px-2 bg-white">To</div>
            <select
              className="flex gap-2  rounded-lg border-2 border-slate-500 py-3 px-2"
              value={toTime}
              onChange={(e) => {
                // console.log(e.target.value);
                setToTime(e.target.value)}}
            >
              {timeRange
                ?.filter((time,idx) => time !== fromTime &&  (time.slice(0,2) > fromTime.slice(0,2)))
                ?.map((r) => (
                  <option value={r}>{r}</option>
                ))}

              <FaClock className="my-auto" />
            </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Request;
