import { FaAlignJustify } from "react-icons/fa";
import React, { useState } from "react";
const Nav = ({ page, setPage }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <div className="z-[9999]">
      <div className="flex h-[50px] w-full flex-row bg-gradient-to-b from-[#C5E1A5] to-[#C5E1A5] p-2 drop-shadow-md">
        <button
          onClick={() => {
            console.log(!isSideBarOpen);
            setIsSideBarOpen(!isSideBarOpen);
          }}
          className="p-2 text-xl text-slate-400"
        >
          <FaAlignJustify className="cursor-pointer" />
        </button>
        <div className="fixed top-[-50%] right-0 float-right">
          <img className="h-24" src="Memind2.png" alt="logo" />
        </div>
      </div>

      <section
        className={`fixed left-0 z-50 h-screen w-2/3 bg-slate-50 py-6 px-3 shadow-xl duration-200
      ${!isSideBarOpen && "-translate-x-full"}`}
      >
        <ul className="w-full space-y-2">
          <li
            onClick={() => setPage("patientSchedule")}
            className={`+ cursor-pointer rounded-lg p-2 hover:bg-slate-200 
            ${page === "patientSchedule" && "bg-slate-200"}`}
          >
            REQUEST
          </li>
          <li
            onClick={() => setPage("setting")}
            className={`cursor-pointer rounded-lg p-2 hover:bg-slate-200
              ${page === "setting" && "bg-slate-200"}`}
          >
            SETTING
          </li>
          <li
            onClick={() => setPage("FAQS")}
            className={`+ cursor-pointer rounded-lg p-2 hover:bg-slate-200
              ${page === "FAQS" && "bg-slate-200"}`}
          >
            FAQS
          </li>
        </ul>
      </section>
    </div>
  );
};
export default Nav;
