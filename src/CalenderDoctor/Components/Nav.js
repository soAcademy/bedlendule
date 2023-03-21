import { FaAlignJustify } from "react-icons/fa";
import React, { useState } from "react";
const Nav = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <div className="z-50 flex h-[50px] w-full flex-row bg-gradient-to-b from-[#C5E1A5] to-[#C5E1A5] p-2 drop-shadow-md">
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
        className={`fixed left-0 h-screen w-2/3 bg-slate-50 shadow-xl duration-200 p-6
      ${!isSideBarOpen ? "-translate-x-full" : ""}`}
      >
        <ul className="w-full">
          <p className="bg-slate-200 rounded-lg p-2">REQUEST</p>
          <p className="bg-slate-200 rounded-lg p-2">SETTING</p>
          <p className="bg-slate-200rounded-lg p-2">FAQS</p>
        </ul>
      </section>
    </>
  );
};
export default Nav;
