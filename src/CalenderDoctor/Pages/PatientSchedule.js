import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { BiEditAlt } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import usePatientCalendarProps from "../Hooks/usePatientCalendarProps";
import CreateRequest from "../Components/CreateRequest";
import axios from "axios";
import ReviewDoctor from "../Components/ReviewDoctor";

const UserSchedule = ({ setPage }) => {
  const [openCreateRequest, setOpenCreateRequest] = useState();
  const [requests, setRequests] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [requestId, setRequestId] = useState();
  const { date, setDate, dateTemplate, timeSlots } = usePatientCalendarProps();
  useEffect(() => {
    let data = JSON.stringify({
      uuid: "c646e99a-9a64-497a-87fd-6972bd7bf387",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getRequestsByUUID",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updated]);
  return (
    <div className="z-10 mt-[70px] h-full">
      <div className="z-10 flex w-full flex-col items-center justify-center">
        <Calendar
          className="z-0 w-10/12 shadow-lg"
          value={date}
          onChange={(e) => {
            setDate(e.value.toISOString());
          }}
          minDate={new Date()}
          inline
          showOtherMonths={false}
          dateTemplate={dateTemplate}
        />
        <div className="flex p-2 text-sm">
          <div className="mx-auto my-3 flex">
            <div className="mx-2 flex items-center space-x-2 rounded-md px-4 py-1 shadow-md">
              <div className="h-4 w-4 rounded-full bg-[#C5E1A5]"></div>
              <p>DOCTOR</p>
            </div>
            <div className="mx-2 flex items-center space-x-2 rounded-md px-4 py-1 shadow-md">
              <div className="h-4 w-4 rounded-full bg-slate-300"></div>
              <p>NO DOCTOR</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-2 flex w-[90%] justify-center">
        <button
          className="button w-1/2 py-3 text-white"
          onClick={() => {
            setOpenCreateRequest(true);
          }}
        >
          CREATE REQUEST
        </button>
      </div>
      <div>
        <div className="my-5 pl-4 font-bold">INCOMING SCHEDULE</div>

        {requests
          .filter(
            (request) =>
              new Date(request.startTime).getTime() > new Date().getTime()
          )
          .map((request, idx) => (
            <div
              key={idx}
              className="mx-auto my-4 flex w-[90%] flex-col space-y-2 rounded-lg border-2 border-[#36c2f9] p-2 text-slate-600 md:w-1/2"
            >
              <div className="flex justify-between">
                <div className="w-2/3">
                  <div className="flex items-center font-bold">
                    {request.title}
                  </div>
                  <div className="font-bold">
                    <div className="my-auto flex items-center text-center text-sm">
                      <HiLocationMarker className="text-blue-500" />
                      &nbsp;
                      {request.meetingType === "ONLINE" &&
                        request.meetingType + " : "}
                      {request.location}
                    </div>
                  </div>
                  <p>
                    {new Date(request.startTime).toLocaleDateString("TH")} :{" "}
                    {new Date(request.startTime)
                      .toLocaleTimeString("TH")
                      .slice(0, 5)}
                    -
                    {new Date(request.finishTime)
                      .toLocaleTimeString("TH")
                      .slice(0, 5)}
                  </p>
                </div>
                <button
                  onClick={() => {}}
                  className="float-right text-2xl text-slate-500 hover:text-slate-400"
                >
                  <BiEditAlt />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="my-5 pl-4 font-bold">PAST SCHEDULE</div>

        {requests
          .filter(
            (request) =>
              new Date(request.finishTime).getTime() < new Date().getTime()
          )
          .map((request, idx) => (
            <div
              key={idx}
              className={`mx-auto my-4 flex w-[90%] flex-col space-y-2 rounded-lg border-2 border-[#36c2f9]
              bg-slate-100 p-2 text-slate-400 md:w-1/2 ${!request.review && request.doctorTimeslot && "bg-transparent"}`}
            >
              <div className="flex justify-between">
                <div className="w-2/3">
                  <div className="font-bold">{request.title}</div>
                  <div className="font-bold">
                    <div className="my-auto flex items-center text-center text-sm">
                      <HiLocationMarker className="text-blue-500" />
                      &nbsp;
                      {request.meetingType === "ONLINE" &&
                        request.meetingType + " : "}
                      {request.location}
                    </div>
                  </div>
                  <p>
                    {new Date(request.startTime).toLocaleDateString("TH")} :{" "}
                    {new Date(request.startTime)
                      .toLocaleTimeString("TH")
                      .slice(0, 5)}
                    -
                    {new Date(request.finishTime)
                      .toLocaleTimeString("TH")
                      .slice(0, 5)}
                  </p>
                </div>
                {!request.review && request.doctorTimeslot && (
                  <button
                    onClick={() => {
                      setRequestId(request.id);
                      setOpenReview(true);
                    }}
                    className="float-right my-auto h-8 rounded-lg bg-amber-300 px-2 text-xs text-white shadow-md hover:bg-amber-200 active:bg-amber-300"
                  >
                    REVIEW
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
      {
        <div
          className={`fixed top-0 left-0 right-0 z-50 h-full w-full 
        bg-slate-300 bg-opacity-10 backdrop-blur-[2px] duration-200
        ${!openCreateRequest ? "pointer-events-none opacity-0" : ""}`}
        >
          <CreateRequest
            updated={updated}
            setUpdated={setUpdated}
            openCreateRequest={openCreateRequest}
            setOpenCreateRequest={setOpenCreateRequest}
          />
        </div>
      }
      {
        <div
          className={`shader duration-200
      ${!openReview && "pointer-events-none opacity-0"}`}
        >
          <ReviewDoctor
            updated={updated}
            setUpdated={setUpdated}
            openReview={openReview}
            setOpenReview={setOpenReview}
            requestId={requestId}
          />
        </div>
      }
    </div>
  );
};

export default UserSchedule;
