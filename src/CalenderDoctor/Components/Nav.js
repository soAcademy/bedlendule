import { FaAlignJustify } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useContext } from "react";
import { FetchContext } from "../home";
import { useEffect } from "react";
const Nav = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const location = useLocation();
  const { fetch,setFetch } = useContext(FetchContext);
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    console.log("fetching");
    const _newUserProfile = JSON.parse(localStorage.getItem("userprofile"));
    setUserProfile(_newUserProfile);
  }, [fetch]);
  return (
    <div className="z-[9999] w-full">
      <div className="fixed top-0 z-50 flex h-[50px] w-full flex-row bg-[#C5E1A5] px-2 drop-shadow-md">
        <button
          onClick={() => {
            setIsSideBarOpen(!isSideBarOpen);
          }}
          className="p-2 text-xl text-slate-400"
        >
          <FaAlignJustify className="cursor-pointer" />
        </button>
        <div className="fixed right-3 float-right">
          <img className="h-[50px]" src="doctorLogo.png" alt="logo" />
        </div>
      </div>
      <backdrop
        onClick={() => setIsSideBarOpen(false)}
        className={isSideBarOpen && `shader z-40`}
      ></backdrop>
      <section
        className={`fixed top-[50px] left-0 z-40 h-full w-2/3 bg-slate-50 py-6 px-3 shadow-xl duration-200
      ${!isSideBarOpen && "-translate-x-full"}`}
      >
        {userProfile && (
          <>
            <img
              className={`mx-auto mt-4 h-28 w-28 items-center rounded-full object-contain text-center text-white ${
                !userProfile?.profilePictureUrl && "bg-slate-300"
              }`}
              src={userProfile?.profilePictureUrl || null}
              alt=""
            />
            <p className="m-2 border-b p-4 text-center">
              {userProfile?.firstName} {userProfile?.lastName}
            </p>
          </>
        )}

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
            to="signup"
            onClick={() => {
              setIsSideBarOpen(false);
            }}
            className={`+ cursor-pointer rounded-lg p-2 hover:bg-slate-200 
            ${
              location.pathname === "/signup" &&
              "pointer-events-none bg-slate-200"
            }
            ${localStorage.getItem("uuid") && "hidden"}`}
          >
            SIGN UP
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
            ${!localStorage.getItem("uuid") && "hidden"}
            ${
              location.pathname === "/setting" &&
              "pointer-events-none bg-slate-200"
            }`}
          >
            SETTING
          </Link>
          {/* <Link
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
          </Link> */}
          <Link
            to={"login"}
            onClick={() => {
              setIsSideBarOpen(false);
              localStorage.removeItem("uuid");
              localStorage.removeItem("userprofile");
              localStorage.removeItem("access-token");
              setFetch(!fetch)
            }}
            className={`cursor-pointer rounded-lg p-2 hover:bg-slate-200
              ${!localStorage.getItem("uuid") && "hidden"}`}
          >
            LOGOUT
          </Link>
        </ul>
      </section>
    </div>
  );
};
export default Nav;
