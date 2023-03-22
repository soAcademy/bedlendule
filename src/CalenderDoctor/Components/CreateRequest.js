import { useContext } from "react";
import ConfirmPopup from "./ConfirmPopup";
import { MdClose } from "react-icons/md";
import { ConfirmPopupContext } from "../home";
import { useState } from "react";
import DateTimePickerForm from "./DateTimePickerForm";
import { ProgressSpinner } from "primereact/progressspinner";
import useCreateRequest from "../Hooks/useCreateRequestForm";

const CreateRequest = ({ setOpenCreateRequest }) => {
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [submitSuccessPopUp, setSubmitSuccessPopup] = useState();
  const [submitFailPopUp, setSubmitFailPopUp] = useState();
  const [sending, setSending] = useState(false);
  const { confirmPopupToggle } =
    useContext(ConfirmPopupContext);
  const { handleSubmit, submitForm } = useCreateRequest({
    setSending,
    setFromTime,
    setToTime,
    setSubmitFailPopUp,
    setSubmitSuccessPopup,
  });

  const problemTypes = [
    "DEPRESSION",
    "PANIC DISORDER",
    "SCHIZOPHRENIA",
    "POST TRAUMATIC STRESS DISORDER",
    "BIPOLAR_DISORDER",
    "DEMENTIA",
    "PHOBIAS",
  ];

  return (
    <>
      <form id="create-request" onSubmit={handleSubmit}>
        <div className="min-h-11/12 relative mx-auto mt-[70px] w-[95%] rounded-lg bg-white p-6 font-kanit shadow-xl">
          <MdClose
            className="absolute right-4 cursor-pointer text-2xl text-slate-400 duration-150 hover:text-slate-300"
            onClick={() => setOpenCreateRequest(false)}
          />
          <p className="pt-4 text-center text-3xl font-bold text-slate-500">
            CREATE REQUEST
          </p>
          <div className="mx-auto my-6 flex gap-4 p-2 text-center text-slate-400">
            <DateTimePickerForm
              fromTime={fromTime}
              toTime={toTime}
              setFromTime={setFromTime}
              setToTime={setToTime}
            />
          </div>
          <div className="my-6 flex w-full items-center gap-2">
            <div className="w-1/2">
              <p className="headingColor text-center">Title</p>
              <input
                id="title"
                className="h-[40px] w-full rounded-lg border-2 border-slate-400 px-2"
                placeholder="Need Therapy"
              />
            </div>
            <div className="w-1/2">
              <p className="headingColor text-center">ประเภท</p>
              <select
                id="problemType"
                className="h-[40px] w-full rounded-lg border-2 border-slate-400 text-center text-[15px]"
              >
                {problemTypes.map((cause, idx) => (
                  <option className="" key={idx} value={cause}>
                    {cause}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <textarea
              id="description"
              className="h-[180px] w-[90%] rounded-lg border-2 border-slate-500 p-2"
              placeholder="What happen?"
            ></textarea>
          </div>
          <div className="my-4 flex items-center justify-center gap-2">
            <label for="online">ONLINE</label>
            <input
              type="radio"
              id="online"
              value="ONLINE"
              name="meetingType"
              className="mr-3"
            />
            <label for="offline">OFFLINE</label>
            <input
              type="radio"
              id="offline"
              value="OFFLINE"
              name="meetingType"
            />
          </div>
          <div className="flex w-full gap-4">
            <input
              id="location"
              name="location"
              className="h-[40px] w-1/2 rounded-lg border-2 border-slate-500 px-2"
              placeholder="Location"
              type=""
              required
            />
            <input
              id="hourRate"
              className="h-[40px] w-1/2 rounded-lg border-2 border-slate-500 px-2"
              placeholder="Hour rate"
              type="number"
              required
            />
          </div>
          <div className="mt-6 mb-2 flex">
            <button className="button mx-auto p-4 " type="submit">
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
              action={submitForm}
            />
          </div>
        }
      </form>
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
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-full w-full 
        bg-slate-300 bg-opacity-10 backdrop-blur-[2px]
        ${!submitSuccessPopUp ? "scale-0" : "scale-1"}`}
      >
        <div
          className={`relative top-1/3 mx-auto w-[80%] rounded-lg bg-white 
      p-6 text-center shadow-md duration-200
      ${submitSuccessPopUp ? "scale-1" : "scale-0"}`}
        >
          <div>
            <p className="text-2xl font-bold text-[#4C4E64DE] ">Successful</p>
            <p className="text-[#4C4E64AD]">
              Your request was successfully created
            </p>
          </div>
          <div className="mt-4 flex space-y-2">
            <button
              type="button"
              className="text-md button mx-auto w-24 rounded-md py-1"
              onClick={() => {
                setSubmitSuccessPopup(false);
                setOpenCreateRequest(false);
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
        ${!submitFailPopUp ? "scale-0" : "scale-1"}`}
      >
        <div
          className={`relative top-1/3 mx-auto w-[80%] rounded-lg bg-white 
      p-6 text-center shadow-md duration-200
      ${submitFailPopUp ? "scale-1" : "scale-0"}`}
        >
          <div>
            <p className="text-2xl font-bold text-[#4C4E64DE] ">Failed</p>
            <p className="text-[#4C4E64AD]">Failed to create request</p>
          </div>
          <div className="mt-4 flex space-y-2">
            <button
              type="button"
              className="text-md button mx-auto w-24 rounded-md py-1"
              onClick={() => {
                setSubmitFailPopUp(false);
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateRequest;
