import { useContext } from "react";
import { ConfirmPopupContext } from "../home";

const ConfirmPopup = ({ title, description, action }) => {
  const { confirmPopupToggle, setConfirmPopupToggle } =
    useContext(ConfirmPopupContext);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 h-full w-full 
        bg-slate-300 bg-opacity-10 backdrop-blur-[2px]
        ${!confirmPopupToggle ? "scale-0" : "scale-1"}`}
    >
      <div
        className={`relative top-1/3 mx-auto w-[80%] rounded-lg bg-white 
      p-6 text-center shadow-md duration-200
      ${confirmPopupToggle ? "scale-1" : "translate-y-1/4 scale-0"}`}
      >
        <div>
          <p className="text-2xl font-bold text-[#4C4E64DE] ">{title}</p>
          <p className="text-[#4C4E64AD]">{description}</p>
        </div>
        <div className="mt-4 flex flex-col space-y-2">
          <button
          type="button"
            className="text-md mx-auto w-24 rounded-md bg-[#99B47B] py-1 text-white duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]"
            onClick={action}
          >
            CONFIRM
          </button>
          <button
            type="button"
            onClick={() => {
              setConfirmPopupToggle(false);
            }}
            className="text-md mx-auto w-24 rounded-md bg-slate-400 py-1 text-white duration-200 hover:bg-slate-300 active:bg-slate-400"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmPopup;
