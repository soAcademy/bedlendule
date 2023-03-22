import { ProgressSpinner } from "primereact/progressspinner";
import React, { useState } from "react";

const useSendingPopup = () => {
  const [sending, setSending] = useState(false);
  const SendingPopup = () => (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-full w-full 
    bg-slate-300 bg-opacity-10 backdrop-blur-[2px]
    ${!sending ? "scale-0" : "scale-1"}`}
      >
        <div
          className={`relative top-1/3 mx-auto w-[80%] rounded-lg bg-white 
  p-6 text-center shadow-md duration-200
  ${sending ? "scale-1" : "scale-0"}`}
        >
          <div>
            <p className="text-2xl font-bold text-[#4C4E64DE] ">Submitting</p>
            <p className="text-[#4C4E64AD]">Your request is being submitted</p>
          </div>
          <div className="card justify-content-center my-6 flex">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="4"
              animationDuration="1.5s"
            />
          </div>
        </div>
      </div>
    </>
  );
  return { sending, setSending, SendingPopup };
};

export default useSendingPopup