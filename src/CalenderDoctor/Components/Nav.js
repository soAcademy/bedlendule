import { FaAlignJustify } from "react-icons/fa";
import React, { useState } from "react";
const Nav = ({ page, setPage, type, setType }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <div className="relative z-[9999] h-full">
      <div className="fixed top-0 z-50 flex h-[50px] w-full flex-row bg-[#C5E1A5] px-2 drop-shadow-md">
        <button
          onClick={() => {
            console.log(!isSideBarOpen);
            setIsSideBarOpen(!isSideBarOpen);
          }}
          className="p-2 text-xl text-slate-400"
        >
          <FaAlignJustify className="cursor-pointer" />
        </button>
        <div className="fixed top-[-5%] right-3 float-right">
          <img className="h-[50px]" src="doctorLogo.png" alt="logo" />
        </div>
      </div>
      <section
        className={`fixed top-[50px] left-0 z-40 h-screen w-2/3 bg-slate-50 py-6 px-3 shadow-xl duration-200
      ${!isSideBarOpen && "-translate-x-full"}`}
      >
        <ul className="w-full space-y-2">
          <li
            onClick={() => {
              setIsSideBarOpen(false);
              setPage("home");
            }}
            className={`+ cursor-pointer rounded-lg p-2 hover:bg-slate-200 
            ${page === "patientSchedule" && "bg-slate-200"}`}
          >
            HOME
          </li>
          <li
            onClick={() => {
              setIsSideBarOpen(false);
              setPage("setting");
            }}
            className={`cursor-pointer rounded-lg p-2 hover:bg-slate-200
              ${page === "setting" && "bg-slate-200"}`}
          >
            SETTING
          </li>
          <li
            onClick={() => {
              setIsSideBarOpen(false);
              setPage("FAQS");
            }}
            className={`+ cursor-pointer rounded-lg p-2 hover:bg-slate-200
              ${page === "FAQS" && "bg-slate-200"}`}
          >
            FAQS
          </li>
          <li
            onClick={() => {
              setIsSideBarOpen(false);
              setType("doctor");
              setPage("home");
            }}
            className={`+ cursor-pointer rounded-lg p-2 hover:bg-slate-200
              ${type === "doctor" && "bg-slate-200"}`}
          >
            Doctor
          </li> 
          <li
            onClick={() => {
              setIsSideBarOpen(false);
              setType("patient");
              setPage("home");
            }}
            className={`+ cursor-pointer rounded-lg p-2 hover:bg-slate-200
              ${type === "patient" && "bg-slate-200"}`}
          >
            Patient
          </li>
        </ul>
      </section>
    </div>
  );
};
export default Nav;
