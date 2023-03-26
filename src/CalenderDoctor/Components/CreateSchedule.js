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
  useSubmitSchedule,
} from "../Hooks/useCreateSchedule";

const CreateSchedule = ({
  setOpenCreateSchedule,
  openCreateSchedule,
  setUpdated,
  updated,
}) => {
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
  const { setSending, SendingPopup } = useSendingPopup();
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopup } =
    useSubmitResult({
      successAction: () => {
        setOpenCreateSchedule(false);
        setUpdated(!updated);
      },
      failedAction: () => {},
    });
  const { handleSubmit, submitForm } = useSubmitSchedule({
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
    setSubmitSuccessPopup,
  });

  const {
    addTimeSlot,
    removeTimeslot,
    datePickerDisabled,
    setConfirmRemove,
    confirmRemove,
    duplicatedTime,
  } = useAddOrRemoveTimeSlot({
    newTimeSlots,
    idxToDelete,
    setNewTimeSlots,
    finishTime,
    startTime,
    date,
    price,
    setPrice,
    setOpenTimeSlotForm,
  });

  return (
    <div
      className={`fixed left-0 z-50 flex w-full flex-col
    font-kanit shadow-xl duration-300
      ${openCreateSchedule ? "" : "pointer-events-none opacity-0"}`}
    >
      <div
        className={`fixed top-24 left-0 h-screen w-full bg-white p-6 duration-200 ${
          openCreateSchedule ? "" : "translate-y-full"
        }`}
      >
        <div className="">
          <CreateScheduleForm
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            setPopupState={setPopupState}
            setOpenCreateSchedule={setOpenCreateSchedule}
            newTimeSlots={newTimeSlots}
          />
        </div>
        <div className=" flex flex-col">
          <div className="no-scrollbar h-[130px] space-y-2 overflow-scroll">
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
                        {new Date(timeslot.startTime).toLocaleDateString("TH")}{" "}
                        :{" "}
                        {new Date(timeslot.startTime)
                          .toLocaleTimeString("TH")
                          .slice(0, 5)}
                        -
                        {new Date(timeslot.finishTime)
                          .toLocaleTimeString("TH")
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
                        console.log(newTimeSlots);
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
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={handleFinishTimeChange}
              />
            </div>
            <div className="flex justify-center space-x-2 text-4xl">
              <button
                type="button"
                disabled={
                  isDateAvailable && startTime && finishTime && price
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
                onClick={() => setOpenTimeSlotForm(false)}
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
          <p
            className={`text-center text-red-400 opacity-0 
                ${
                  (!isDateAvailable || duplicatedTime) &&
                  "animate-pulse opacity-100"
                } 
                `}
          >
            The selected time is not available
          </p>
        </div>
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 flex ">
          <button
            disabled={newTimeSlots.length > 0 ? false : true}
            className={`button mx-auto p-4 disabled:bg-slate-300`}
            type="submit"
          >
            CREATE SCHEDULE
          </button>
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
    </div>
  );
};
export default CreateSchedule;
