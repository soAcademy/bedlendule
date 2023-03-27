import React, { useState } from "react";

const useSubmitResult = ({ successAction, failedAction }) => {
  const [submitSuccessPopUp, setSubmitSuccessPopUp] = useState();
  const [submitFailPopUp, setSubmitFailPopUp] = useState();
  const ResultPopup = () => (
    <>
      <div
        className={`shader duration-200
    ${submitSuccessPopUp ? "scale-100" : "scale-0"}`}
      >
        <div
          className={`popup duration-100
        ${submitSuccessPopUp ? "scale-100" : "scale-95"}`}
        >
          <div>
            <p className="text-2xl font-bold text-[#4C4E64DE] ">Success</p>
            <p className="text-[#4C4E64AD]">
              Your request has been successfully submitted
            </p>
          </div>
          <div className="mt-4 flex space-y-2">
            <button
              type="button"
              className="text-md button mx-auto w-24 rounded-md py-1"
              onClick={() => {
                setSubmitSuccessPopUp(false);
                successAction();
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-full w-full 
    bg-slate-300 bg-opacity-10 backdrop-blur-[2px]
    ${submitFailPopUp ? "scale-100" : "scale-0"}`}
      >
        <div
          className={`relative top-1/3 mx-auto w-[80%] rounded-lg bg-white 
  p-6 text-center shadow-md duration-200
  ${submitFailPopUp ? "scale-100" : "scale-95"}`}
        >
          <div>
            <p className="text-2xl font-bold text-[#4C4E64DE] ">Request Failed</p>
            <p className="text-[#4C4E64AD]">Your request has been denied. Please review the requirements and try again.</p>
          </div>
          <div className="mt-4 flex space-y-2">
            <button
              type="button"
              className="text-md button mx-auto w-24 rounded-md py-1"
              onClick={() => {
                setSubmitFailPopUp(false);
                failedAction();
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
  return {
    ResultPopup,
    submitFailPopUp,
    setSubmitFailPopUp,
    submitSuccessPopUp,
    setSubmitSuccessPopUp,
  };
};

export default useSubmitResult;
