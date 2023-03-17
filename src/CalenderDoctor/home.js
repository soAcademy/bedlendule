import { useState, useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import axios from "axios";
import Nav from "./Component/Nav";

const Home = () => {
  const [date, setDate] = useState(1);
  const [month, seTMonth] = useState("March");
  const [bookingColor, seTBookingColor] = useState("");
  // console.log(date);

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
    { month: "January" },
    { month: "Febuary" },
    { month: "March" },
    { month: "April" },
    { month: "May" },
    { month: "June" },
    { month: "July" },
    { month: "August" },
    { month: "September" },
    { month: "October" },
    { month: "November" },
    { month: "December" },
  ];
  const colorPalletes = ["#b3e5aa"];
  return (
    <>
      <Nav className="cursor-pointer" />
      <div className="mt-5 h-screen w-screen">
        <div className=" h-[20px]"></div>
        <div className="my-auto h-screen w-screen  font-kanit">
          <div className="mt-10 h-full">
            <div className="my-10 mx-5 rounded-lg  px-10 shadow-2xl ">
              <div className="flex">
                {/* {months.map((r,idx)=><option key={idx} value={r}>{r.month()}</option>)} */}
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
              <div className="grid grid-cols-7 gap-6 pl-3 text-slate-400">
                {mondayLists.map((r) => (
                  <div className="w-[30px] ">{r.day}</div>
                ))}
              </div>
              <div className=" grid grid-cols-7 gap-4 pb-4">
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
            </div>
            <div className="flex h-[50px] w-screen  p-2 text-sm text-white">
              <div className="mx-auto flex">
                <button className="mx-2 my-auto flex gap-2  rounded-lg  border-2 bg-gradient-to-b from-teal-200 to-teal-400 px-5 py-3 shadow-lg ">
                  <FaRegCheckCircle className="my-auto " onClick={() => []} />
                  Available
                </button>
                <button className="mx-2 my-auto flex gap-2  rounded-lg  border-2 bg-gradient-to-b from-red-200 to-red-400 px-4 py-3 shadow-lg">
                  <FaRegCheckCircle className="my-auto " onClick={() => []} />
                  Unavailable
                </button>
              </div>
            </div>
            <div className="mx-auto my-5 w-full text-xl  text-white">
              <div
                className="mx-auto w-1/2 cursor-pointer rounded-lg bg-gradient-to-b from-teal-300 to-teal-500 py-3 text-center shadow-lg "
                onClick={() => []}
              >
                CREATE REQUEST
              </div>
              <div
                className="mx-auto my-5 w-1/2 cursor-pointer rounded-lg bg-gradient-to-b from-teal-300 to-teal-500 py-3 text-center shadow-lg"
                onClick={() => []}
              >
                FIND THERAPISTS
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
