import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { FaHome } from "react-icons/fa";
import {
  BiEditAlt,
  BiTrash,
  BiCheckCircle,
  BiPlusCircle,
  BiXCircle,
} from "react-icons/bi";
import useDoctorCalendarProps from "../Hooks/useDoctorCalendarProps";
import axios from "axios";
import useUpdateSchedule from "../Hooks/useUpdateSchedule";
import ConfirmPopup from "../Components/ConfirmPopup";
import { BsChevronDown } from "react-icons/bs";
import CreateSchedule from "../Components/CreateSchedule";
import {
  FinishTimePicker,
  StartTimePicker,
} from "../Components/DateTimePicker";
import useDateTimepicker from "../Hooks/useDateTimePicker";
import { ProgressSpinner } from "primereact/progressspinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DisabledatesContext } from "../home";
import useRedirect from "../Hooks/useRedirect";

const DoctorSchedule = () => {
  useDoctorCalendarProps();
  const [fetching, setFetching] = useState(false);
  const [price, setPrice] = useState();
  const [idxToDelete, setIdxToDelete] = useState();
  const [schedules, setSchedules] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [scheduleToEdit, setScheduleToEdit] = useState([]);
  const [scheduleToDelete, setScheduleToDelete] = useState([]);
  const [newTimeSlots, setNewTimeSlots] = useState([]);
  const [openTimeSlotForm, setOpenTimeSlotForm] = useState(false);
  const [updated, setUpdated] = useState();
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreateSchedule, setOpenCreateSchedule] = useState(false);
  const [insidePage, setInsidePage] = useState("doctorSchedule");
  const { redirect, redirectToLogin } = useRedirect();
  const { disabledDates, dateTemplate } = useContext(DisabledatesContext);
  const {
    handleStartTimeChange,
    handleFinishTimeChange,
    startTime,
    finishTime,
    date,
  } = useDateTimepicker();
  const {
    removeTimeslot,
    addTimeSlot,
    updateSchedule,
    duplicatedTime,
    SendingPopup,
    openEdit,
    setOpenEdit,
    ResultPopup,
    confirmSubmit,
    setConfirmSubmit,
    deleteSchedule,
  } = useUpdateSchedule({
    timeSlots,
    setPrice,
    idxToDelete,
    newTimeSlots,
    setNewTimeSlots,
    setConfirmRemove,
    finishTime,
    startTime,
    scheduleToEdit,
    scheduleToDelete,
    setScheduleToDelete,
    price,
    setOpenTimeSlotForm,
    setOpenDelete,
    updated,
    setUpdated,
  });

  useEffect(() => {
    setFetching(true);
    setSchedules([]);
    let data = JSON.stringify({
      uuid: localStorage.getItem("uuid"),
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getScheduleByUUID",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("access-token"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const _schedules = response.data.sort(
          (a, b) =>
            new Date(a.timeslots.at(-1).startTime).getTime() -
            new Date(b.timeslots.at(-1).startTime).getTime()
        );
        console.log(_schedules);
        setFetching(false);
        setSchedules(_schedules);
        setTimeSlots(_schedules.map((e) => e.timeslots).flat());
      })
      .catch((error) => {
        console.log(error);
        setFetching(false);
        if (error.response.status === 401) {
          redirectToLogin();
        }
      });
  }, [updated]);

  return (
    <>
      {insidePage === "doctorSchedule" && (
        <div
          className={`duration-200 ${
            insidePage === "doctorSchedule"
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Calendar
              className="z-0 mt-20 w-10/12 md:w-8/12"
              value={date}
              disabledDates={disabledDates.map((e) => new Date(e))}
              onChange={(e) => {
                redirect(
                  `selectrequest/${e.value
                    .toLocaleDateString("en")
                    .replace(/\//g, "-")}`
                );
              }}
              showOtherMonths={false}
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
                  <div className="h-4 w-4 rounded-full bg-slate-300"></div>
                  <p>NO REQUEST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="my-2 flex w-full justify-center gap-2 px-6 text-white md:mx-auto md:gap-10">
            <button
              className="button w-1/2 py-3 md:w-1/4"
              onClick={() => {
                setOpenCreateSchedule(true);
              }}
            >
              CREATE SCHEDULE
            </button>
            <Link
              className="button w-1/2 py-3 md:w-1/4"
              to="/schedule/selectrequest/"
            >
              REQUEST
            </Link>
          </div>
          {!fetching && (
            <div className="my-4 ml-4 font-bold text-slate-700 md:w-1/2">
              INCOMING SCHEDULE
            </div>
          )}
          {fetching && (
            <div className="mt-10 flex w-full items-center justify-center">
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="4"
                animationDuration="0.5s"
              />
            </div>
          )}
          {schedules?.map((schedule, idx) => {
            const scheduleStartTime = new Date(
              schedule.timeslots.at(-1)?.startTime
            ).getTime();
            return (
              scheduleStartTime > new Date().getTime() && (
                <>
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
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setScheduleToEdit(schedule);
                            setNewTimeSlots(schedule.timeslots);
                            setOpenEdit(true);
                          }}
                          className={`float-right text-2xl text-slate-500 hover:text-slate-400
                        ${schedule.title === "Patient Request" && "hidden"}`}
                        >
                          <BiEditAlt />
                        </button>
                        <button
                          onClick={() => {
                            setOpenDelete(true);
                            setScheduleToDelete(schedule.id);
                            console.log(schedule.timeslots);
                          }}
                          className={`float-right text-2xl text-slate-500 hover:text-slate-400
                        ${
                          schedule.timeslots.findIndex(
                            (timeslot) => timeslot.request
                          ) !== -1 && "hidden"
                        }`}
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </div>
                    {schedule.timeslots?.map((timeslot, idx) => {
                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between rounded-lg border-2 bg-slate-100 p-2 text-slate-400 
                          ${
                            timeslot.request?.status === "CHOSEN" &&
                            "border-[#beda9f] bg-[#e0f2e6] text-slate-600"
                          } 
                          ${
                            timeslot.request?.status === "ACCEPTED" &&
                            "border-sky-400 bg-sky-200"
                          }`}
                        >
                          <div className="w-3/4">
                            <p>
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
                          <div className="w-1/5 text-end">
                            ฿ {timeslot.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={`shader fixed top-0 z-50
      ${
        openEdit && scheduleToEdit.id === schedule.id
          ? ""
          : "pointer-events-none opacity-0"
      }`}
                  >
                    <div
                      className={`fixed top-1/4 z-50 h-full w-full
    space-y-2 rounded-lg bg-white p-6 shadow-lg transition-all duration-300
    ${
      openEdit && scheduleToEdit.id === schedule.id
        ? ""
        : "pointer-events-none translate-y-full opacity-0"
    }
`}
                    >
                      <div className="flex flex-col">
                        <BsChevronDown
                          className="absolute right-4 cursor-pointer text-2xl text-slate-400 duration-150 hover:text-slate-300"
                          onClick={() => setOpenEdit(false)}
                        />
                        <div>
                          <p className="text-2xl font-bold text-[#4C4E64DE] ">
                            {idx} {schedule.title}
                          </p>
                          <p className="text-start text-[#4C4E64AD]">
                            {schedule.description}
                          </p>
                        </div>
                        <div className="no-scrollbar max-h-[230px] overflow-scroll">
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
                                    title={"Remove Timeslot"}
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
                          <div className="flex w-full flex-col space-y-2 rounded-lg py-2 duration-200">
                            <div className="flex items-center justify-between space-x-2">
                              <StartTimePicker
                                startTime={startTime}
                                handleStartTimeChange={handleStartTimeChange}
                              />
                              <div className="">
                                <FinishTimePicker
                                  finishTime={finishTime}
                                  handleFinishTimeChange={
                                    handleFinishTimeChange
                                  }
                                />
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
                            <div className="flex justify-center text-6xl ">
                              <button
                                disabled={
                                  startTime && finishTime && price
                                    ? false
                                    : true
                                }
                                onClick={() => addTimeSlot()}
                                className={` text-green-600 opacity-60 hover:text-green-500 disabled:text-slate-300`}
                              >
                                <BiCheckCircle className="border-slate-300" />
                              </button>
                              <button
                                onClick={() => setOpenTimeSlotForm(false)}
                                className={` text-red-600 opacity-60 hover:text-red-500`}
                              >
                                <BiXCircle className="border-slate-300" />
                              </button>
                            </div>
                          </div>
                        )}
                        {openTimeSlotForm && (
                          <p
                            className={`text-center text-red-400 opacity-0 
                            ${duplicatedTime && "animate-pulse opacity-100"} 
                            `}
                          >
                            The selected time slot is not available
                          </p>
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
                        <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 justify-center space-x-2 py-2">
                          <button
                            className="text-md button w-24 p-2 text-white"
                            onClick={() => setConfirmSubmit(true)}
                          >
                            CONFIRM
                          </button>
                          <button
                            onClick={() => {
                              setOpenTimeSlotForm(false);
                              setOpenEdit(false);
                            }}
                            className="text-md button w-24 bg-slate-400 p-2 text-white hover:bg-slate-300 active:bg-slate-500"
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            );
          })}
          {schedules.findIndex(
            (schedule) =>
              new Date(schedule.timeslots.at(-1).startTime).getTime() >
              new Date().getTime()
          ) === -1 &&
            !fetching && (
              <div className="mx-auto my-4 pl-4 text-slate-700 md:w-1/2">
                No incoming schedule
              </div>
            )}
        </div>
      )}
      <div
        className={`shader duration-200
        ${!openCreateSchedule ? "pointer-events-none opacity-0 " : ""}`}
      ></div>
      <CreateSchedule
        timeSlots={timeSlots}
        updated={updated}
        setUpdated={setUpdated}
        openCreateSchedule={openCreateSchedule}
        setOpenCreateSchedule={setOpenCreateSchedule}
      />
      <ConfirmPopup
        title={"SUBMIT REQUEST"}
        description={"Do you want to submit request?"}
        action={updateSchedule}
        state={confirmSubmit}
        setState={setConfirmSubmit}
      />
      <ConfirmPopup
        title={"DELETE SCHEDULE"}
        description={"Are you sure to delete this schedule?"}
        action={deleteSchedule}
        state={openDelete}
        setState={setOpenDelete}
      />
      <SendingPopup />
      <ResultPopup />
    </>
  );
};

export default DoctorSchedule;
