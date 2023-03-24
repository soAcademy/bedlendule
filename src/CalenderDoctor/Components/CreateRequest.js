import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import useCreateRequest from "../Hooks/useCreateRequest";
import useSubmitResult from "../Hooks/useSubmitResult";
import useSendingPopup from "../Hooks/useSendingPopup";
import ConfirmPopup from "./ConfirmPopup";
import useDateTimepicker from "../Hooks/useDateTimePicker";
import {
  DatePicker,
  FinishTimePicker,
  StartTimePicker,
} from "./DateTimePicker";

const CreateRequest = ({
  setOpenCreateRequest,
  openCreateRequest,
  setUpdated,
  updated,
}) => {
  const {
    date,
    isDateAvailable,
    startTime,
    setStartTime,
    finishTime,
    setFinishTime,
    handleDateChange,
    handleStartTimeChange,
    handleFinishTimeChange,
  } = useDateTimepicker();
  const [popupState, setPopupState] = useState(false);
  const { setSending, SendingPopup } = useSendingPopup();
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopup } =
    useSubmitResult({
      successAction: () => {
        setOpenCreateRequest(false);
        setUpdated(!updated);
      },
      failedAction: () => {
        setOpenCreateRequest(false);
        setUpdated(!updated);
      },
    });
  const { handleSubmit, submitForm } = useCreateRequest({
    popupState,
    setPopupState,
    setSending,
    setStartTime,
    setFinishTime,
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
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 w-full duration-300
      ${!openCreateRequest && "translate-y-full"}`}
    >
      <form id="create-request" onSubmit={handleSubmit}>
        <div className="mt-36 w-full rounded-lg bg-white p-6 font-kanit shadow-xl">
          <BsChevronDown
            className="absolute right-4 cursor-pointer text-2xl text-slate-500 duration-150 hover:text-slate-300"
            onClick={() => setOpenCreateRequest(false)}
          />
          <p className="pt-4 text-center text-3xl font-bold text-slate-500">
            CREATE REQUEST
          </p>
          <div className="mx-auto my-6 flex w-full justify-center p-2 text-center text-slate-500">
            <div className="">
              <DatePicker
                className={"w-[120px]"}
                date={date}
                handleDateChange={handleDateChange}
              />
            </div>
            <div className="mx-2">
              <StartTimePicker
                startTime={startTime}
                handleStartTimeChange={handleStartTimeChange}
              />
            </div>
            <div>
              <FinishTimePicker
                finishTime={finishTime}
                handleFinishTimeChange={handleFinishTimeChange}
              />
            </div>
          </div>
          <div className="my-6 flex w-full items-center gap-2 text-slate-500">
            <div className="w-1/2">
              <p className="headingColor text-center text-slate-500">Title</p>
              <input
                id="title"
                className="h-[40px] w-full rounded-lg border-2 border-slate-400 px-2"
                placeholder="Need Therapy"
              />
            </div>
            <div className="w-1/2">
              <p className="headingColor text-center text-slate-500">ประเภท</p>
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
          <div className="my-4 flex items-center justify-center gap-2 text-slate-500">
            <label for="online">ONLINE</label>
            <input
              required
              type="radio"
              id="online"
              value="ONLINE"
              name="meetingType"
              className="mr-3"
            />
            <label for="offline">OFFLINE</label>
            <input
              required
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
              placeholder="Price"
              type="number"
              required
            />
          </div>
          <p
            className={`pt-5 text-center text-red-400 opacity-0 ${
              !isDateAvailable && "animate-pulse opacity-100"
            }`}
          >
            The selected time is not available
          </p>
          <div className="mt-6 flex">
            <button
              disabled={isDateAvailable ? false : true}
              className={`button mx-auto p-4 disabled:bg-slate-300`}
              type="submit"
            >
              CREATE REQUEST
            </button>
          </div>
        </div>
        <ConfirmPopup
          title={"CREATE REQUEST"}
          description={"Do you want to create request?"}
          action={submitForm}
          state={popupState}
          setState={setPopupState}
        />
      </form>
      <SendingPopup />
      <ResultPopup />
    </div>
  );
};
export default CreateRequest;
