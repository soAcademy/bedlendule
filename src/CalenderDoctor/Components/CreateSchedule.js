import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import useCreateRequest from "../Hooks/useCreateRequestForm";
import useSubmitResult from "../Hooks/useSubmitResult";
import useSendingPopup from "../Hooks/useSendingPopup";
import ConfirmPopup from "./ConfirmPopup";
import {
  BiCheckCircle,
  BiPlusCircle,
  BiTrash,
  BiXCircle,
} from "react-icons/bi";
import { Calendar } from "primereact/calendar";
import axios from "axios";

const CreateSchedule = ({
  setOpenCreateSchedule,
  openCreateSchedule,
  setUpdated,
  updated,
}) => {
  const [startTime, setStartTime] = useState(
    new Date(
      new Date(new Date().toLocaleDateString()).getTime() +
        1800000 * Math.ceil(new Date().getMinutes() / 30) +
        3600000 * (new Date().getHours() + 1)
    )
  );
  const [finishTime, setFinishTime] = useState(
    new Date(new Date(new Date().toLocaleDateString()).getTime() + 3600000)
  );
  const [date, setDate] = useState(new Date());
  const [duplicatedTime, setDuplicatedTime] = useState(false);
  const [price, setPrice] = useState();
  const [popupState, setPopupState] = useState(false);
  const [isDateAvailable, setIsDateAvailable] = useState(true);
  const [openTimeSlotForm, setOpenTimeSlotForm] = useState(false);
  const [newTimeSlots, setNewTimeSlots] = useState([]);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [idxToDelete, setIdxToDelete] = useState();
  const { setSending, SendingPopup } = useSendingPopup();
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopup } =
    useSubmitResult({
      successAction: () => {
        setOpenCreateSchedule(false);
        setUpdated(!updated);
      },
      failedAction: () => {
        setOpenCreateSchedule(false);
        setUpdated(!updated);
      },
    });
  const [formData, setFormData] = useState();
  const doctorUUID = "7ecf8aa7-0fe9-45da-b73b-6d6369dd29b0";
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      uuid: doctorUUID,
      title: form["title"].value,
      description: form["description"].value,
      meetingType: form["online"].checked ? "ONLINE" : "OFFLINE",
      location: form["location"].value,
      timeslots: newTimeSlots,
    };
    setFormData(data);
    setPopupState(true);
  };
  const submitForm = () => {
    setPopupState(false);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/createSchedule",
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };
    setSending(true);

    axios
      .request(config)
      .then((response) => {
        document.querySelector("#create-schedule").reset();
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
        setDate();
        setNewTimeSlots([]);
        setSending(false);
        response.status === 200
          ? setSubmitSuccessPopup(true)
          : setSubmitFailPopUp(true);
      })
      .catch((error) => {
        setSending(false);
        setSubmitFailPopUp(true);
      });
  };

  const removeTimeslot = (timeslot) => {
    const _newTimeSlots = newTimeSlots.filter((e, edx) => idxToDelete !== edx);
    setNewTimeSlots(_newTimeSlots);
    setConfirmRemove(false);
  };

  const addTimeSlot = () => {
    const duration = finishTime.getTime() - startTime.getTime();
    const _date = date.toLocaleDateString();
    const _startTime = new Date(
      _date +
        " " +
        startTime.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
    );
    const _finishTime = new Date(_startTime.getTime() + duration);
    const newAddingTimeSlot = {
      startTime: _startTime.toISOString(),
      finishTime: _finishTime.toISOString(),
      price: Number(price),
    };
    if (
      newTimeSlots.findIndex(
        (timeslot) => timeslot.startTime === _startTime.toISOString()
      ) === -1
    ) {
      console.log("newTimeSlots[0].startTime", newTimeSlots[0]);
      const _timeslots = [
        ...new Map([
          ...newTimeSlots.map((item) => [item["startTime"], item]),
          [newAddingTimeSlot["startTime"], newAddingTimeSlot],
        ]).values(),
      ];
      setNewTimeSlots(_timeslots);
      setOpenTimeSlotForm(false);
    } else {
      setDuplicatedTime(true);
      setTimeout(() => setDuplicatedTime(false), 5000);
    }
  };

  const handleStartTimeChange = (e) => {
    if (e.value) {
      const _date =
        date?.toLocaleDateString() || new Date().toLocaleDateString();
      const _startTime = new Date(
        _date +
          " " +
          e.value.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
      );
      const _finishTime =
        finishTime &&
        new Date(
          _date +
            " " +
            finishTime.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
        );
      setStartTime(_startTime);
      (_startTime >= _finishTime || (!_finishTime && e.value)) &&
        setFinishTime(new Date(_startTime?.getTime() + 1800000));
      if (_startTime > new Date().getTime() + 3600000 || !date) {
        setIsDateAvailable(true);
      } else {
        setIsDateAvailable(false);
      }
    } else {
      setIsDateAvailable(true);
      setStartTime(e.value);
    }
  };

  const handleFinishTimeChange = (e) => {
    if (e.value) {
      const _date =
        date?.toLocaleDateString() || new Date().toLocaleDateString();
      const _startTime =
        startTime &&
        new Date(
          _date +
            " " +
            startTime.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
        );
      const _finishTime = new Date(
        _date +
          " " +
          e.value.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
      );
      setFinishTime(_finishTime);
      (_startTime >= _finishTime || (!_startTime && e.value)) &&
        setStartTime(new Date(_finishTime?.getTime() - 1800000));
      if (_startTime > new Date().getTime() + 3600000 || !date) {
        setIsDateAvailable(true);
      } else {
        setIsDateAvailable(false);
      }
    } else {
      setIsDateAvailable(true);
      setFinishTime(e.value);
    }
  };

  const handleDateChange = (e) => {
    if (e.value) {
      setDate(e.value);
      const _date = e.value?.toLocaleDateString();
      const _startTime = new Date(
        _date +
          " " +
          startTime?.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
      );
      if (_startTime > new Date().getTime() + 3600000 || !startTime) {
        setIsDateAvailable(true);
      } else {
        setIsDateAvailable(false);
      }
    } else {
      setIsDateAvailable(true);
      setDate(e.value);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-full duration-300
      ${openCreateSchedule ? "" : "translate-y-full"}`}
    >
      <form className="" id="create-schedule" onSubmit={handleSubmit}>
        <div className="mt-[50px] flex h-screen w-full flex-col rounded-lg bg-white p-6 font-kanit shadow-xl">
          <BsChevronDown
            className="absolute right-4 cursor-pointer text-2xl text-slate-400 duration-150 hover:text-slate-300"
            onClick={() => setOpenCreateSchedule(false)}
          />
          <p className="pt-4 text-center text-3xl font-bold text-slate-500">
            CREATE SCHEDULE
          </p>

          <div className="my-2 w-full items-center gap-2">
            Title:
            <input
              required
              id="title"
              className="h-[40px] w-full rounded-lg border-2 border-slate-400 px-2 text-center"
              placeholder="Title"
            />
          </div>
          <div className="">
            Description
            <textarea
              required
              id="description"
              className="h-[100px] w-full rounded-lg border-2 border-slate-500 p-2"
              placeholder="Description"
            ></textarea>
          </div>
          <div className="flex w-full items-center justify-between ">
            <div className="my-4 flex flex-col text-slate-500">
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="online"
                  value="ONLINE"
                  name="meetingType"
                  className=""
                />
                <label for="online">ONLINE</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="offline"
                  value="OFFLINE"
                  name="meetingType"
                />
                <label for="offline">OFFLINE</label>
              </div>
            </div>
            <input
              id="location"
              name="location"
              className="h-10 rounded-lg border-2 border-slate-400 px-2"
              placeholder="Location"
              type=""
              required
            />
          </div>
          <div className=" flex flex-col">
            <div className="h-[170px] space-y-2 overflow-scroll">
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
                            "TH"
                          )}{" "}
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
                        action={() => removeTimeslot(timeslot)}
                        state={confirmRemove}
                        setState={setConfirmRemove}
                      />
                    }
                  </div>
                );
              })}
            </div>

            {openTimeSlotForm && (
              <div className="mt-4 flex w-full flex-col space-y-2 rounded-lg text-slate-400">
                <div className="mx-auto flex items-center space-x-2">
                  <Calendar
                    readOnlyInput
                    minDate={new Date()}
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                    showButtonBar
                    className="w-2/3 rounded-lg border-2 border-slate-200 text-center"
                    placeholder="Date"
                  ></Calendar>
                  <input
                    id="price"
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    className="mx-auto h-11 w-1/3 items-center rounded-md border-2 border-double text-center drop-shadow"
                  ></input>
                </div>
                <div className="mx-auto flex items-center justify-center space-x-2">
                  <Calendar
                    id="startTime"
                    inputId="start-time"
                    readOnlyInput
                    timeOnly
                    showButtonBar
                    // hourFormat="12"
                    stepMinute={30}
                    value={startTime}
                    appendTo={"self"}
                    onChange={handleStartTimeChange}
                    className="w-1/2 rounded-lg border-2 bg-slate-900 text-center "
                    placeholder="From"
                  ></Calendar>
                  <Calendar
                    id="toTime"
                    inputId="finish-time"
                    readOnlyInput
                    timeOnly
                    showButtonBar
                    // hourFormat="12"
                    stepMinute={30}
                    value={finishTime}
                    // minDate={new Date(new Date(startTime)?.getTime() + 1800000)}
                    onChange={handleFinishTimeChange}
                    className="w-1/2 rounded-lg border-2 bg-slate-900 text-center"
                    placeholder="To"
                  ></Calendar>
                </div>
                <div className="flex justify-center space-x-2 text-4xl">
                  <button
                    type="button"
                    disabled={
                      isDateAvailable && startTime && finishTime && price
                        ? false
                        : true
                    }
                    onClick={() => addTimeSlot()}
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
            )}

            {!openTimeSlotForm && (
              <button
                onClick={() => {
                  setOpenTimeSlotForm(true);
                }}
                className="mx-auto pt-4 text-3xl text-slate-500"
              >
                <BiPlusCircle />
              </button>
            )}
            {openTimeSlotForm && (
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
            )}
          </div>
          <button
            className={`button fixed bottom-5 left-1/2 -translate-x-1/2 p-4 disabled:bg-slate-300`}
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
      </form>
      <SendingPopup />
      <ResultPopup />
    </div>
  );
};
export default CreateSchedule;
