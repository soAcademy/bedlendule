import ConfirmPopup from "./ConfirmPopup";
import { MdClose } from "react-icons/md";

const Request = ({ setConfirmPopupToggle, confirmPopupToggle, setPage }) => {
  return (
    <>
      <div className="min-h-11/12 relative mx-auto mt-[70px] w-[95%] rounded-lg bg-white p-6 font-kanit shadow-xl">
        <MdClose
          className="absolute right-4 cursor-pointer text-2xl text-slate-400 duration-150 hover:text-slate-300"
          onClick={() => setPage("patientSchedule")}
        />
        <p className="pt-4 text-center text-3xl font-bold text-slate-500">
          CREATE REQUEST
        </p>
        <div className="flex">
          <button
            onClick={() => setConfirmPopupToggle(true)}
            className="mx-auto rounded-md bg-[#99B47B] p-2 px-4 text-xs text-white duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]"
          >
            CREATE REQUEST
          </button>
        </div>
      </div>
      {
        <div
          className={`fixed top-0 left-0 right-0 z-50 h-full w-full 
        bg-slate-300 bg-opacity-10 backdrop-blur-[2px]
        ${!confirmPopupToggle ? "scale-0" : "scale-1"}`}
        >
          <ConfirmPopup
            title={"CREATE REQUEST"}
            description={"Do you want to create request?"}
            setConfirmPopupToggle={setConfirmPopupToggle}
            confirmPopupToggle={confirmPopupToggle}
          />
        </div>
      }
    </>
  );
};
export default Request;
