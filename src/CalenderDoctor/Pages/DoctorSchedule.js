import React, { useState, useEffect, useContext } from "react";
import { Calendar } from "primereact/calendar";
import { FaHome } from "react-icons/fa";
import { BiEditAlt, BiTrash, BiCheckCircle } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import useDoctorCalendarProps from "../Hooks/useDoctorCalendarProps";
import axios from "axios";
import ConfirmPopup from "../Components/ConfirmPopup";
import { ConfirmPopupContext } from "../home";
const DoctorSchedule = ({ setPage }) => {
  const [schedules, setSchedules] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState([]);
  const { date, setDate, dateTemplate } = useDoctorCalendarProps();
  const [removingTimeSlotIds, setRemovingTimeSlotIds] = useState([]);
  const [addingTimeSlot, setAddingTimeSlot] = useState(false);
  const { setConfirmPopupToggle } = useContext(ConfirmPopupContext);

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
          })
          .catch((error) => {
            console.log(error);
          }),
      50
    );
  }, []);
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

        {schedules.map((schedule, idx, schedules) => {
          const timeslots = schedule.timeslots;
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
                      "border-[#beda9f] bg-[#f5fbec] text-slate-600"
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
                    {scheduleToEdit.timeslots?.map(
                      (timeslot, jdx, timeslots) => {
                        return (
                          <div key={jdx} className="flex">
                            <div
                              className={`flex w-10/12 items-center justify-between rounded-lg border-2 bg-slate-100 p-2 text-slate-400 ${
                                timeslot.request &&
                                "border-[#beda9f] bg-[#f5fbec] text-slate-600"
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
                                  // const _schedule = {
                                  //   ...schedule,
                                  //   timeslots: [
                                  //     ...timeslots.filter((e, idx) => idx !== jdx),
                                  //   ],
                                  // };
                                  // schedules[idx] = _schedule;
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
                                  // const _schedule = {
                                  //   ...schedule,
                                  //   timeslots: [
                                  //     ...timeslots.filter(
                                  //       (e, idx) => idx !== jdx
                                  //     ),
                                  //   ],
                                  // };
                                  // scheduleToEdit.timeslots = [
                                  //   ...timeslots.filter(
                                  //     (e, idx) => idx !== jdx
                                  //   ),
                                  // ];
                                  const newScheduleToEdit = {
                                    ...scheduleToEdit,
                                    timeslots: timeslots.filter(
                                      (e, idx) => idx !== jdx
                                    ),
                                  };
                                  setRemovingTimeSlotIds([
                                    ...new Set([
                                      ...removingTimeSlotIds,
                                      timeslot.id,
                                    ]),
                                  ]);
                                  console.log(removingTimeSlotIds);
                                  setScheduleToEdit(newScheduleToEdit);
                                  // schedules[idx] = _schedule;
                                  setConfirmPopupToggle(false);
                                }}
                              />
                            }
                          </div>
                        );
                      }
                    )}
                    {addingTimeSlot && (
                      <div className="flex w-full">
                        <div className="flex w-10/12 justify-center space-x-4 ">
                          <div>
                            <Calendar
                              placeholder="Start"
                              stepMinute={30}
                              timeOnly
                            />
                          </div>
                          <div>
                            <Calendar
                              className="w-full"
                              placeholder="Finish"
                              stepMinute={30}
                              timeOnly
                            />
                          </div>
                        </div>
                        <button className="text-3xl text-slate-400 hover:text-slate-500 ">
                          <BiCheckCircle className="border-slate-300" />
                        </button>
                      </div>
                    )}
                    {!addingTimeSlot && (
                      <button
                        onClick={() => {
                          setAddingTimeSlot(true);
                        }}
                        className="pt-4 text-3xl text-slate-500"
                      >
                        <IoIosAddCircleOutline />
                      </button>
                    )}
                    <div className="flex justify-center gap-2 pt-20">
                      <button
                        className="text-md button w-24 p-2 text-white"
                        onClick={() => {}}
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
    </div>
  );
};

export default DoctorSchedule;
