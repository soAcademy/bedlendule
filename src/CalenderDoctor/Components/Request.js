import { Calendar } from "primereact/calendar";
import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
const Request = ({ setPage }) => {
  const [fromTime, setFromTime] = useState("15:00");
  const [toTime, setToTime] = useState("16:00");
  const [date, setDate] = useState("20/03/2023");
  const [contact, setContact] = useState("093-xxx-xxxx");
  const [hourRate,setHourRate] = useState(1000);
  const [text,setText] = useState("")
  console.log("fromtime", fromTime);
  console.log("totime", toTime);
  console.log("date", date);
  console.log("contact", contact);
  console.log("hourRate",hourRate);
  console.log("text", text);
  return (
    <>
      <div className=" mx-auto mt-[70px] mb-5 pb-5 w-[90%]  rounded-lg shadow-xl  ">
        <div
          className=" px-2  text-right text-xl text-slate-500"
          onClick={() => setPage("landing")}
        >
          x
        </div>
        <div className="flex text-center  text-3xl ">
          <div className="w-full font-bold text-slate-500">REQUEST</div>
        </div>
        <div className=" mx-auto my-4 flex  p-2 text-center text-slate-400">
          <div className="mx-auto flex gap-4 ">
            <div className="mx-auto  flex w-full  flex-col ">
              <div className="pl-2">DATE</div>
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                showButtonBar
                className="mx-auto w-[120px] rounded-lg border-2 border-slate-200"
                placeholder="dd/mm/yyyy"
              ></Calendar>
            </div>

            <div className="mx-1">
              <div className="">
                From
                <Calendar
                  timeOnly
                  stepMinute={30}
                  value={fromTime}
                  onChange={(e) => setFromTime(e.value)}
                  showButtonBar
                  className="w-[80px] rounded-lg  border-2 bg-slate-900 text-center "
                  placeholder="  15:00"
                ></Calendar>
              </div>
            </div>
            <div className="mx-1">
              <div className="">
                To
                <Calendar
                  timeOnly
                  stepMinute={30}
                  value={toTime}
                  onChange={(e) => setToTime(e.value)}
                  showButtonBar
                  className="w-[80px] rounded-lg  border-2 bg-slate-900 text-center "
                  placeholder="  16:00"
                ></Calendar>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full pl-8">
          <textarea
            className="mx-auto h-[180px] w-[90%] rounded-lg border-2 border-slate-500 p-2"
            placeholder="What happen?"
            onChange={(e)=>setText(e.target.value)}
            value={text}
          ></textarea>
        </div>
        <div className="mx-auto flex  p-2">
          <div className="  mx-auto space-x-8 text-sm text-white">
            <button className="rounded-lg bg-primary  px-2 py-1 drop-shadow-lg">
              Online
            </button>
            <button className="rounded-lg bg-secondary px-2  py-1 drop-shadow-lg">
              Offline
            </button>
          </div>
        </div>
        <div className="mx-auto  space-x-4 w-full">
          <div className="mx-auto  p-2 space-x-4 flex">
          <input
            className="h-[40px] w-1/2 rounded-lg border-2 border-slate-500 "
            placeholder="   Contact"
            onChange={(e) => setContact(e.target.value)}
            type="number"
          />
          <input
            className="h-[40px] w-1/2 rounded-lg border-2 border-slate-500 "
            placeholder="   Hour rate"
            onChange={(e) => setHourRate(e.target.value)}
            type="number"
          />
          </div>
        </div>
      </div>
    </>
  );
};
export default Request;
