import { ProgressSpinner } from "primereact/progressspinner";
import React, { useState } from "react";

const useSendingPopup = () => {
  const [sending, setSending] = useState(false);
  const SendingPopup = () => (
    <>
      <div
        className={`shader duration-200
        ${!sending && "pointer-events-none opacity-0"}`}
      >
        <div
          className={`popup duration-100
        ${sending ? "scale-100" : "scale-0"}`}
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

export default useSendingPopup;
