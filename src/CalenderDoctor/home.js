import { useState, useEffect } from "react";
import { FaRegCheckCircle, FaHome } from "react-icons/fa";
import axios from "axios";
import Nav from "./Component/Nav";
import Request from "./Component/Request";

const Home = () => {
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
  const [date, setDate] = useState(1);
  const [month, seTMonth] = useState("March 2023");
  const [bookingColor, seTBookingColor] = useState("");
  const [schedule, setSchdeule] = useState(patient);
  const [calenderToggle, setCalenderToggle] = useState(true);
  const [requestToggle, setRequestToggle] = useState(false);

 
  const number = [...Array(32).keys()].slice(1);
  console.log(number);
  const newNumber = [...number, [], []].sort((a, b) => a - b);
  console.log(">>>>>>", newNumber);
  console.log(month);
  const mondayLists = [
    { day: "S" },
    { day: "M" },
    { day: "T" },
    { day: "W" },
    { day: "T" },
    { day: "F" },
    { day: "S" },
  ];
  const listOfMonths = [
    { month: "January 2023" },
    { month: "Febuary 2023" },
    { month: "March 2023" },
    { month: "April 2023" },
    { month: "May 2023" },
    { month: "June 2023" },
    { month: "July 2023" },
    { month: "August 2023" },
    { month: "September 2023" },
    { month: "October 2023" },
    { month: "November 2023" },
    { month: "December 2023" },
  ];
  const colorPalletes = ["#b3e5aa"];
  return (
    <>
      <Nav className="cursor-pointer" />
      {calenderToggle &&
      <div className="mt-5 h-screen w-screen">
      <div className=" h-[20px]"></div>
      <div className="my-auto h-screen w-screen  font-kanit">
        <div className="mt-10 h-full">
          <div className="mx-5 mt-10 mb-2 rounded-lg  px-10 shadow-2xl ">
            <div className="flex text-slate-500">
              <div className="w-[250px] rounded-lg  p-2">
                {" "}
                <select
                  value={month}
                  onChange={(e) => seTMonth(e.target.value)}
                >
                  {listOfMonths.map((r, idx) => (
                    <option
                      className="rounded-lg"
                      onClick={() => seTMonth(r.month)}
                    >
                      {r.month}
                    </option>
                  ))}
                </select>
              </div>
              <button className="px-2 text-sm"> &lt; </button>
              <button className="pl-1 text-sm"> &gt; </button>
            </div>
            <div className="grid grid-cols-7 gap-6 pl-3 text-slate-300">
              {mondayLists.map((r) => (
                <div className="w-[30px] ">{r.day}</div>
              ))}
            </div>
            <div className=" grid grid-cols-7 gap-4 pb-1 text-slate-500">
              {newNumber.map((r) => (
                <button
                  className="h-[30px] w-[30px] rounded-full text-center hover:bg-teal-200"
                  style={{ backgroundColor: bookingColor }}
                  onClick={() => {
                    setDate(r);
                    seTBookingColor(colorPalletes);
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="flex p-2 text-sm ">
              <div className="mx-auto flex">
                <div>
                  <div className="text-center text-slate-400">Actios</div>
                  <button className=" mx-2 my-auto flex rounded-lg   border-2  bg-gradient-to-b from-teal-200 to-teal-400 px-2 py-1 text-white shadow-lg ">
                    DOCTOR
                  </button>
                </div>
                <div>
                  <div className="text-center text-slate-400">Actios</div>
                  <button className="mx-2 my-auto flex gap-2 rounded-lg  border-2  bg-gradient-to-b from-red-200 to-red-300 px-4 py-1 text-white shadow-lg">
                    NO DOCTOR
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className=" mx-auto flex  w-[90%] gap-2 text-white">
            <div
              className="my-auto   w-1/2 cursor-pointer rounded-lg bg-gradient-to-b from-teal-300 to-teal-500 py-3 text-center shadow-lg "
              onClick={() => {setCalenderToggle(false);setRequestToggle(true)}}
            >
              CREATE REQUEST
            </div>
            <div
              className=" mx-auto my-5 w-1/2 cursor-pointer  rounded-lg bg-gradient-to-b from-teal-300 to-teal-500 px-1 py-3 text-center shadow-lg"
              onClick={() => []}
            >
              REQUEST
            </div>
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
      </div>
     
    </div>
    
      }
      {requestToggle &&
      <div className="">
        <div className="h-[70px]"></div>
        <div>  <Request /></div>
        
        </div> }
      
    </>
  );
};
export default Home;
