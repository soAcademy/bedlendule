import React, { useState } from "react";

const useSubmitResult = ({ successAction, failedAction }) => {
  const [submitSuccessPopUp, setSubmitSuccessPopUp] = useState();
  const [submitFailPopUp, setSubmitFailPopUp] = useState();
  const ResultPopup = () => (
    <>
      <div
        className={`shader duration-200 z-20
    ${submitSuccessPopUp ? "scale-100" : "scale-0"}`}
      >
        <div
          className={`popup duration-100 z-30
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
            autoFocus={submitSuccessPopUp}
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
        className={`shader duration-200 z-20
    ${submitFailPopUp ? "scale-100" : "scale-0"}`}
      >
        <div
          className={`popup duration-100 z-30
  ${submitFailPopUp ? "scale-100" : "scale-95"}`}
        >
          <div>
            <p className="text-2xl font-bold text-[#4C4E64DE] ">Request Failed</p>
            <p className="text-[#4C4E64AD]">Your request has been denied. Please review the requirements and try again.</p>
          </div>
          <div className="mt-4 flex space-y-2">
            <button
            autoFocus={submitFailPopUp}
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
