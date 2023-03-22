import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import DateTimePickerForm from "./DateTimePickerForm";
import useCreateRequest from "../Hooks/useCreateRequestForm";
import useSubmitResult from "../Hooks/useSubmitResult";
import useSendingPopup from "../Hooks/useSendingPopup";
import ConfirmPopup from "./ConfirmPopup";

const CreateRequest = ({ setOpenCreateRequest, openCreateRequest }) => {
  const [fromTime, setFromTime] = useState(
    new Date(new Date().toLocaleDateString())
  );
  const [toTime, setToTime] = useState(
    new Date(new Date(new Date().toLocaleDateString()).getTime() + 3600000)
  );
  const [popupState, setPopupState] = useState(false);
  const { setSending, SendingPopup } = useSendingPopup();
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopup } =
    useSubmitResult({
      successAction: setOpenCreateRequest,
    });
  const { handleSubmit, submitForm } = useCreateRequest({
    popupState,
    setPopupState,
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
    <div
      className={`fixed top-0 left-0 right-0 z-50 h-full w-full duration-300
      ${!openCreateRequest && "translate-y-full"}`}
    >
      <form id="create-request" onSubmit={handleSubmit}>
        <div className="mx-auto mt-36 h-screen  w-full rounded-lg bg-white p-6 font-kanit shadow-xl">
          <BsChevronDown
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
          <ConfirmPopup
            title={"CREATE REQUEST"}
            description={"Do you want to create request?"}
            action={submitForm}
            state={popupState}
            setState={setPopupState}
          />
        }
      </form>
      <SendingPopup />
      <ResultPopup />
    </div>
  );
};
export default CreateRequest;
