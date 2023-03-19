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
  const [date, setDate] = useState();
  const [month, seTMonth] = useState("March 2023");
  const [bookingColor, seTBookingColor] = useState("");
  const [schedule, setSchdeule] = useState(patient);
  const [confirmPopupToggle, setConfirmPopupToggle] = useState(false);
  const [page, setPage] = useState("main");

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
  const colorPalletes = "#C5E1A5";
  return (
    <>
      <Nav className="cursor-pointer" />
      {page === "main" && (
        <div className="my-auto mt-[70px] h-screen font-kanit">
          <div className="mt-10 h-full">
            <div className="mx-5 mt-10 mb-2 rounded-lg  px-10 shadow-xl ">
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
                {newNumber.map((r, idx) => (
                  <button
                    className={`h-[30px] w-[30px] rounded-full text-center duration-150 hover:bg-[#C5E1A5]
                      ${
                        idx - 1 === date
                          ? `bg-[${colorPalletes}] text-white`
                          : ""
                      }`}
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

            <div className="mx-auto my-7 flex w-[90%] gap-2 text-white">
              <button
                className="w-1/2 rounded-lg bg-[#99B47B] py-3 text-center shadow-lg duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482] "
                onClick={() => {
                  setPage("createrequest");
                }}
              >
                CREATE REQUEST
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
        </div>
      )}
      {page === "createrequest" && (
        <Request
          setPage={setPage}
          setConfirmPopupToggle={setConfirmPopupToggle}
          confirmPopupToggle={confirmPopupToggle}
        />
      )}
    </>
  );
};
export default Home;
