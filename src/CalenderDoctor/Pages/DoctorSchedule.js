import React, { useState, useEffect, useContext } from "react";
import { Calendar } from "primereact/calendar";
import { FaHome } from "react-icons/fa";
import { BiEditAlt, BiTrash, BiCheckCircle } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import useDoctorCalendarProps from "../Hooks/useDoctorCalendarProps";
import axios from "axios";
import ConfirmPopup from "../Components/ConfirmPopup";
import { ConfirmPopupContext } from "../home";
import useSendingPopup from "../Hooks/useSendingPopup";
import useSubmitResult from "../Hooks/useSubmitResult";
const DoctorSchedule = ({ setPage }) => {
  const [fromTime, setFromTime] = useState(
    new Date(new Date().toLocaleDateString())
  );
  const [toTime, setToTime] = useState(
    new Date(new Date(new Date().toLocaleDateString()).getTime() + 3600000)
  );
  const [price, setPrice] = useState();
  const [idxToDelete, setIdxToDelete] = useState();
  const [schedules, setSchedules] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState([]);
  const [newTimeSlots, setNewTimeSlots] = useState([]);
  const [removingTimeSlotIds, setRemovingTimeSlotIds] = useState([]);
  const [openTimeSlotForm, setOpenTimeSlotForm] = useState(false);
  const [updated, setUpdated] = useState();
  const [duplicatedTime, setDuplicatedTime] = useState(false);
  const { setConfirmPopupToggle } = useContext(ConfirmPopupContext);
  const { date, setDate, dateTemplate } = useDoctorCalendarProps();
  const { sending, setSending, SendingPopup } = useSendingPopup();
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopup } =
    useSubmitResult({
      successAction: setIsEditOpen,
      failedAction: setIsEditOpen,
    });
  const removeTimeslot = (timeslot) => {
    console.log("removingTimeSlotIds", removingTimeSlotIds);
    console.log("timeslot", timeslot);

    const _newTimeSlots = newTimeSlots.filter((e, edx) => idxToDelete !== edx);
    setRemovingTimeSlotIds([...new Set([...removingTimeSlotIds, timeslot.id])]);
    setNewTimeSlots(_newTimeSlots);
    setConfirmPopupToggle(false);
  };

  const addTimeSlot = () => {
    const duration = toTime.getTime() - fromTime.getTime();
    const date = scheduleToEdit.timeslots[0].startTime.split("T")[0];
    const _startTime = new Date(
      date +
        " " +
        fromTime.toLocaleTimeString().split(" ")[0].slice(0, 6) +
        "00 " +
        fromTime.toLocaleTimeString().split(" ")[1]
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
      setTimeout(() => setDuplicatedTime(false), 3000);
    }
  };

  const updateSchedule = () => {
    let data = JSON.stringify({
      scheduleId: scheduleToEdit.id,
      addingTimeSlots: newTimeSlots.filter((timeslot) => !timeslot.id),
      removingTimeSlots: removingTimeSlotIds.filter((e) => !!e),
      title: scheduleToEdit.title,
      meetingType: scheduleToEdit.meetingType,
      location: scheduleToEdit.location,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/updateSchedule",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    setSending(true);
    axios
      .request(config)
      .then((response) => {
        setRemovingTimeSlotIds([]);
        setUpdated(true);
        setSending(false);
        setSubmitSuccessPopup(true);
      })
      .catch((error) => {
        setSending(false);
        setSubmitFailPopUp(true);
      });
  };

  useEffect(() => {
    let data = JSON.stringify({
      uuid: "7ecf8aa7-0fe9-45da-b73b-6d6369dd29b0",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getScheduleByUUID",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    setTimeout(
      () =>
        axios
          .request(config)
          .then((response) => {
            const data = response.data;
            setSchedules(data);
            console.log("data", data);
          })
          .catch((error) => {
            console.log(error);
          }),
      50
    );
  }, [updated]);

  return (
    <div className="mt-[70px] h-full">
      <div className="flex w-full flex-col items-center justify-center">
        <Calendar
          className="z-0 w-10/12 md:w-8/12"
          value={date}
          onChange={(e) => {
            setDate(e.value.toISOString());
          }}
          minDate={new Date()}
          inline
          locale="en"
          dateTemplate={dateTemplate}
        />
        <div className="flex p-2 text-sm">
          <div className="mx-auto my-3 flex">
            <div className="mx-2 flex items-center gap-2 rounded-md px-4 py-1 shadow-md">
              <div className="h-4 w-4 rounded-full bg-[#C5E1A5]"></div>
              <p>REQUEST</p>
            </div>
            <div className="mx-2 flex items-center gap-2 rounded-md px-4 py-1 shadow-md">
              <div className="h-4 w-4 rounded-full bg-[#E1A5BB]"></div>
              <p>NO REQUEST</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-2 flex w-full justify-center gap-2 px-6 text-white md:mx-auto md:gap-10">
        <button
          className="button w-1/2 py-3 md:w-1/4"
          onClick={() => {
            setPage("createSchedule");
          }}
        >
          CREATE SCHEDULE
        </button>
        <button className="button w-1/2 py-3 md:w-1/4" onClick={() => []}>
          REQUEST
        </button>
      </div>
      <div>
        <div className="mx-auto my-4 pl-4 font-bold text-slate-700 md:w-1/2">
          INCOMING SCHEDULE
        </div>

        {schedules?.map((schedule, idx) => {
          return (
            <div
              key={idx}
              className="mx-auto my-4 flex w-[90%] flex-col space-y-2 rounded-lg border-2 border-[#36c2f9] p-2 text-slate-600 md:w-1/2"
            >
              <div className="flex justify-between">
                <div className="w-2/3">
                  <div className="font-bold">{schedule.title}</div>
                  <div className="flex text-center">
                    <div className="my-auto flex items-center text-center text-xs">
                      <FaHome className="text-blue-500" />
                      &nbsp;
                      {schedule.meetingType === "ONLINE" &&
                        schedule.meetingType + " : "}
                      {schedule.location}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setScheduleToEdit(schedule);
                    setNewTimeSlots(schedule.timeslots);
                    setIsEditOpen(true);
                  }}
                  className="float-right text-2xl text-slate-500 hover:text-slate-400"
                >
                  <BiEditAlt />
                </button>
              </div>
              {schedule.timeslots?.map((timeslot, idx) => {
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between rounded-lg border-2 bg-slate-100 p-2 text-slate-400 ${
                      timeslot.request &&
                      "border-[#beda9f] bg-[#f1fae4] text-slate-600"
                    }`}
                  >
                    <div>
                      <p>
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
                );
              })}
              {
                <div
                  className={`fixed top-0 left-0 right-0 z-50 h-full w-full 
      bg-slate-300 bg-opacity-10 backdrop-blur-[2px]
      ${
        isEditOpen && scheduleToEdit.id === schedule.id ? "scale-1" : "scale-0"
      }`}
                >
                  <div
                    className={`relative top-1/2 left-1/2 w-11/12 -translate-x-[50%] -translate-y-[50%] space-y-2 rounded-lg bg-white 
    p-6 text-center shadow-md duration-200
    ${isEditOpen && scheduleToEdit.id === schedule.id ? "scale-1" : "scale-0"}`}
                  >
                    <div>
                      <p className="text-2xl font-bold text-[#4C4E64DE] ">
                        {idx} {schedule.title}
                      </p>
                      <p className="text-start text-[#4C4E64AD]">
                        {schedule.description}
                      </p>
                    </div>
                    {newTimeSlots?.map((timeslot, jdx) => {
                      return (
                        <div key={jdx} className="flex">
                          <div
                            className={`flex w-10/12 items-center justify-between rounded-lg border-2 bg-slate-100 p-2 text-slate-400 ${
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
                                {new Date(
                                  timeslot.startTime
                                ).toLocaleDateString("TH")}{" "}
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
                              onClick={() => {
                                setConfirmPopupToggle(true);
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
                            />
                          }
                        </div>
                      );
                    })}
                    {openTimeSlotForm && (
                      <div className="flex w-full flex-col space-y-2 py-2">
                        <div className="flex items-center justify-between space-x-2">
                          <div className="">
                            <Calendar
                              id="fromTime"
                              inputId="start-time"
                              readOnlyInput
                              timeOnly
                              showButtonBar
                              hourFormat="12"
                              stepMinute={30}
                              value={fromTime}
                              appendTo={"self"}
                              onChange={(e) => {
                                (e.value?.getTime() >= toTime?.getTime() ||
                                  (!toTime && e.value)) &&
                                  setToTime(
                                    new Date(e.value.getTime() + 1800000)
                                  );
                                setFromTime(e.value);
                              }}
                              className="w-[100px] rounded-lg border-2 bg-slate-900 text-center "
                              placeholder="From"
                            ></Calendar>
                          </div>
                          <div className="">
                            <Calendar
                              id="toTime"
                              inputId="finish-time"
                              readOnlyInput
                              timeOnly
                              showButtonBar
                              hourFormat="12"
                              stepMinute={30}
                              value={toTime}
                              minDate={fromTime}
                              onChange={(e) => setToTime(e.value)}
                              className="w-[100px] rounded-lg border-2 bg-slate-900 text-center"
                              placeholder="To"
                            ></Calendar>
                          </div>
                          <input
                            id="price"
                            type="number"
                            placeholder="Price"
                            onChange={(e) => {
                              setPrice(e.target.value);
                            }}
                            className="mx-auto h-11 w-20 items-center rounded-md border-2 border-double text-center drop-shadow"
                          ></input>
                        </div>
                        <p
                          className={`text-red-500 duration-300 ${
                            duplicatedTime ? "visible" : "opacity-0"
                          }`}
                        >
                          This time slot is already exist
                        </p>
                        <button
                          disabled={fromTime && toTime && price ? false : true}
                          onClick={() => addTimeSlot()}
                          className={`mx-auto text-3xl text-green-600 opacity-60 hover:text-green-500 disabled:text-slate-100`}
                        >
                          <BiCheckCircle className="border-slate-300" />
                        </button>
                      </div>
                    )}
                    {!openTimeSlotForm && (
                      <button
                        onClick={() => {
                          setOpenTimeSlotForm(true);
                        }}
                        className="pt-4 text-3xl text-slate-500"
                      >
                        <IoIosAddCircleOutline />
                      </button>
                    )}
                    <div className="flex justify-center gap-2 py-2">
                      <button
                        className="text-md button w-24 p-2 text-white"
                        onClick={updateSchedule}
                      >
                        CONFIRM
                      </button>
                      <button
                        onClick={() => setIsEditOpen(false)}
                        className="text-md button w-24 p-2 text-white"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          );
        })}
      </div>
      <SendingPopup />
      <ResultPopup />
    </div>
  );
};

export default DoctorSchedule;
