import { FaAlignJustify } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
const Nav = ({ page, setPage, type, setType }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="z-[9999] w-full">
      <div className="z-50 flex h-[50px] w-full flex-row bg-[#C5E1A5] px-2 drop-shadow-md">
        <button
          onClick={() => {
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
        className={`fixed top-[50px] left-0 z-40 h-full w-2/3 bg-slate-50 py-6 px-3 shadow-xl duration-200
      ${!isSideBarOpen && "-translate-x-full"}`}
      >
        <ul className="flex w-full flex-col space-y-2">
          <Link
            to="login"
            onClick={() => {
              setIsSideBarOpen(false);
            }}
            className={`+ cursor-pointer rounded-lg p-2 hover:bg-slate-200 
            ${
              location.pathname === "/login" &&
              "pointer-events-none bg-slate-200"
            }
            ${localStorage.getItem("uuid") && "hidden"}`}
          >
            LOGIN
          </Link>
          <Link
            to={"schedule"}
            onClick={() => {
              setIsSideBarOpen(false);
            }}
            className={`cursor-pointer rounded-lg p-2 hover:bg-slate-200
            ${
              location.pathname === "/schedule" &&
              "pointer-events-none bg-slate-200"
            }
            ${!localStorage.getItem("uuid") && "hidden"}`}
          >
            SCHEDULE
          </Link>
          <Link
            to={"setting"}
            onClick={() => {
              setIsSideBarOpen(false);
            }}
            className={`cursor-pointer rounded-lg p-2 hover:bg-slate-200
            ${
              location.pathname === "/setting" &&
              "pointer-events-none bg-slate-200"
            }`}
          >
            SETTING
          </Link>
          <Link
            to={"faqs"}
            onClick={() => {
              setIsSideBarOpen(false);
            }}
            className={`cursor-pointer rounded-lg p-2 hover:bg-slate-200
            ${
              location.pathname === "/faqs" &&
              "pointer-events-none bg-slate-200"
            }
            `}
          >
            FAQS
          </Link>
          <Link
            to={"login"}
            onClick={() => {
              setIsSideBarOpen(false);
              localStorage.removeItem("uuid");
              localStorage.removeItem("type")
              localStorage.removeItem("access-token")
            }}
            className={`cursor-pointer rounded-lg p-2 hover:bg-slate-200
              ${!localStorage.getItem("uuid") && "hidden"}`}
          >
            Log out
          </Link>
        </ul>
      </section>
    </div>
  );
};
export default Nav;
