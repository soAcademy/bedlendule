import { useState } from "react";
import useSubmitResult from "../Hooks/useSubmitResult";
import useSendingPopup from "../Hooks/useSendingPopup";
import ConfirmPopup from "./ConfirmPopup";
import {
  BiCheckCircle,
  BiPlusCircle,
  BiTrash,
  BiXCircle,
} from "react-icons/bi";
import {
  DatePicker,
  FinishTimePicker,
  StartTimePicker,
} from "./DateTimePicker";
import useDateTimepicker from "../Hooks/useDateTimePicker";
import CreateScheduleForm from "./CreateScheduleForm";
import {
  useAddOrRemoveTimeSlot,
  useCreateSchedule,
} from "../Hooks/useCreateSchedule";
import { BsChevronDown } from "react-icons/bs";

const CreateSchedule = ({
  timeSlots,
  setOpenCreateSchedule,
  openCreateSchedule,
  setUpdated,
  updated,
}) => {
  const [datePickerDisabled, setDatePickerDisabled] = useState(false);
  const [price, setPrice] = useState();
  const [popupState, setPopupState] = useState(false);
  const [openTimeSlotForm, setOpenTimeSlotForm] = useState(false);
  const [newTimeSlots, setNewTimeSlots] = useState([]);
  const [idxToDelete, setIdxToDelete] = useState();
  const [formData, setFormData] = useState();
  const {
    date,
    setDate,
    startTime,
    setStartTime,
    finishTime,
    setFinishTime,
    isDateAvailable,
    handleDateChange,
    handleStartTimeChange,
    handleFinishTimeChange,
  } = useDateTimepicker();
  const clearTimeslotInput = () => {
    setDate(new Date());
    setStartTime(
      new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          1800000 * Math.ceil(new Date().getMinutes() / 30) +
          3600000 * (new Date().getHours() + 1)
      )
    );
    setFinishTime(
      new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          1800000 * (1 + Math.ceil(new Date().getMinutes() / 30)) +
          3600000 * (new Date().getHours() + 1)
      )
    );
    setPrice();
  };
  const { setSending, SendingPopup } = useSendingPopup();
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopUp } =
    useSubmitResult({
      successAction: () => {
        setOpenCreateSchedule(false);
        setUpdated(!updated);
      },
      failedAction: () => {},
    });
  const { handleSubmit, submitForm } = useCreateSchedule({
    setOpenCreateSchedule,
    newTimeSlots,
    setPopupState,
    formData,
    setFormData,
    setSending,
    setStartTime,
    setFinishTime,
    setPrice,
    setDate,
    setNewTimeSlots,
    setSubmitFailPopUp,
    setSubmitSuccessPopUp,
    setDatePickerDisabled,
    clearTimeslotInput,
  });

  const {
    addTimeSlot,
    removeTimeslot,
    setConfirmRemove,
    confirmRemove,
    duplicatedTime,
  } = useAddOrRemoveTimeSlot({
    timeSlots,
    newTimeSlots,
    idxToDelete,
    setNewTimeSlots,
    finishTime,
    startTime,
    date,
    price,
    setPrice,
    setOpenTimeSlotForm,
    setDatePickerDisabled,
  });

  return (
    <div
      className={`fixed top-6 left-0 h-full w-full
  ${openCreateSchedule ? "" : "pointer-events-none opacity-0"}`}
    >
      <shader
        onClick={() => setOpenCreateSchedule(false)}
        className={`shader 
    ${!openCreateSchedule && "pointer-events-none opacity-0"}`}
      ></shader>
      <div
        className={`fixed top-24 left-0 z-20 h-screen w-full bg-white p-6 duration-300 ${
          openCreateSchedule
            ? ""
            : "pointer-events-none translate-y-1/2 opacity-0"
        }`}
      >
        <div>
          <BsChevronDown
            className="absolute right-4 cursor-pointer text-2xl text-slate-400 duration-150 hover:text-slate-300"
            onClick={() => {
              document.querySelector("#create-schedule").reset();
              clearTimeslotInput();
              setOpenTimeSlotForm(false);
              setDatePickerDisabled(false);
              setNewTimeSlots([]);
              setOpenCreateSchedule(false);
            }}
          />
          <CreateScheduleForm
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            setPopupState={setPopupState}
            setOpenCreateSchedule={setOpenCreateSchedule}
            newTimeSlots={newTimeSlots}
          />
        </div>
        <div className=" flex flex-col">
          <div className="no-scrollbar h-[100px] space-y-2 overflow-scroll">
            {newTimeSlots?.map((timeslot, jdx) => {
              return (
                <div key={jdx} className="mx-auto flex">
                  <div
                    className={`flex w-full items-center justify-between rounded-lg border-2 bg-slate-50 p-2 text-slate-400 ${
                      timeslot.request &&
                      "border-[#beda9f] bg-[#f1fae4] text-slate-600"
                    }`}
                  >
                    <div>
                      <p className="text-left">
                        {timeslot.request
                          ? timeslot.request?.patient.firstName +
                            " " +
                            timeslot.request?.patient.lastName
                          : "No Booking"}
                      </p>
                      <p>
                        {new Date(timeslot.startTime).toLocaleDateString(
                          "en-GB"
                        )}{" "}
                        :{" "}
                        {new Date(timeslot.startTime)
                          .toLocaleTimeString("en-GB")
                          .slice(0, 5)}
                        -
                        {new Date(timeslot.finishTime)
                          .toLocaleTimeString("en-GB")
                          .slice(0, 5)}
                      </p>
                    </div>
                    <div>฿ {timeslot.price}</div>
                  </div>
                  {!timeslot.request && (
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmRemove(true);
                        setIdxToDelete(jdx);
                      }}
                      className="ml-6 text-2xl text-slate-600"
                    >
                      <BiTrash />
                    </button>
                  )}
                  {
                    <ConfirmPopup
                      title={"Removing Timeslot"}
                      description={"Confirm Removal"}
                      action={() => {
                        removeTimeslot();
                      }}
                      state={confirmRemove}
                      setState={setConfirmRemove}
                    />
                  }
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div
            className={`absolute top-0 mt-4 flex w-full flex-col space-y-2 rounded-lg text-slate-400
        ${openTimeSlotForm ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <div className="mx-auto flex items-center space-x-2">
              <DatePicker
                disabled={datePickerDisabled}
                date={date}
                handleDateChange={handleDateChange}
                className={"w-2/3"}
              />
              <input
                id="price"
                type="number"
                placeholder="Price"
                tabIndex={-1}
                value={price ?? ""}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="mx-auto h-11 w-1/3 items-center rounded-md border-2 border-double text-center drop-shadow"
              ></input>
            </div>
            <div className="mx-auto flex items-center justify-center space-x-2">
              <StartTimePicker
                startTime={startTime}
                handleStartTimeChange={handleStartTimeChange}
              />
              <FinishTimePicker
                finishTime={finishTime}
                handleFinishTimeChange={handleFinishTimeChange}
              />
            </div>
            <div className="flex justify-center space-x-2 text-4xl">
              <button
                type="button"
                tabIndex={-1}
                disabled={
                  isDateAvailable && startTime && finishTime && price && date
                    ? false
                    : true
                }
                onClick={addTimeSlot}
                className={`text-green-600 opacity-60 hover:text-green-500 disabled:text-slate-300`}
              >
                <BiCheckCircle className="border-slate-300" />
              </button>
              <button
                type="button"
                tabIndex={-1}
                onClick={() => {
                  clearTimeslotInput();
                  setOpenTimeSlotForm(false);
                }}
                className={`text-red-600 opacity-60 hover:text-red-500`}
              >
                <BiXCircle className="border-slate-300" />
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setOpenTimeSlotForm(true);
            }}
            className={`mx-auto flex items-center pt-4 text-xl text-slate-500 duration-200 
          hover:text-slate-400 active:text-slate-500
          ${
            openTimeSlotForm ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          >
            <BiPlusCircle className="text-3xl" /> Add Time slot
          </button>
        </div>
        <div className="fixed bottom-20 left-1/2 flex w-full -translate-x-1/2 flex-col">
          <p
            className={`pointer-events-none text-center text-red-400 opacity-0
                ${
                  (!isDateAvailable || duplicatedTime) &&
                  openTimeSlotForm &&
                  "animate-pulse opacity-100"
                } 
                `}
          >
            The selected time is not available
          </p>
        </div>
      </div>
      <ConfirmPopup
        title={"CREATE SCHEDULE"}
        description={"Do you want to create schedule?"}
        action={submitForm}
        state={popupState}
        setState={setPopupState}
      />
      <SendingPopup />
      <ResultPopup />
    </div>
  );
};
export default CreateSchedule;
