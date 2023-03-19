import React, { useState, useEffect } from "react";

const Calendar = (second) => {
  const [month, seTMonth] = useState("March 2023");
  const [date, setDate] = useState();
  const number = [...Array(32).keys()].slice(1);
  const newNumber = [...number, [], []].sort((a, b) => a - b);
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
  const colorPalletes = "#C5E1A5";
  return (
    <>
      <div className="mx-5 mt-10 mb-2 rounded-lg px-10 shadow-xl ">
        <div className="flex text-slate-500">
          <div className="w-[250px] rounded-lg  p-2">
            {" "}
            <select value={month} onChange={(e) => seTMonth(e.target.value)}>
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
          {newNumber.map((r, idx) => (
            <button
              className={`h-[30px] w-[30px] rounded-full text-center duration-150 hover:bg-[#C5E1A5]
            ${idx - 1 === date ? `bg-[${colorPalletes}] text-white` : ""}`}
              onClick={() => {
                setDate(r);
              }}
            >
              {r}
            </button>
          ))}
        </div>

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
    </>
  );
};

export default Calendar