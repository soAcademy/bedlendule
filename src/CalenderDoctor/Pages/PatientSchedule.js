import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import usePatientCalendarProps from "../Hooks/usePatientCalendarProps";
import CreateRequest from "../Components/CreateRequest";
import axios from "axios";
import ReviewDoctor from "../Components/ReviewDoctor";
import SelectDoctor from "../Components/SelectDoctor";
import { ProgressSpinner } from "primereact/progressspinner";
import ConfirmPopup from "../Components/ConfirmPopup";
import useSendingPopup from "../Hooks/useSendingPopup";
import useSubmitResult from "../Hooks/useSubmitResult";
import { MdClose } from "react-icons/md";
import { Rating } from "primereact/rating";

const UserSchedule = ({ setPage, page }) => {
  const [fetching, setFetching] = useState(false);
  const [openRemoveRequest, setOpenRemoveRequest] = useState(false);
  const [openChooseDoctors, setOpenChooseDoctors] = useState(false);
  const [openCreateRequest, setOpenCreateRequest] = useState();
  const [confirmChoosing, setConfirmChoosing] = useState(false);
  const [timeSlotId, setTimeSlotId] = useState();
  const [requests, setRequests] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [requestToExecute, setRequestToExecute] = useState();
  const [insidePage, setInsidePage] = useState("patientSchedule");
  const { date, setDate, dateTemplate, disabledDates } =
    usePatientCalendarProps();
    console.log('disabledDates', disabledDates)
  const { sending, setSending, SendingPopup } = useSendingPopup();
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopUp } =
    useSubmitResult({
      successAction: () => {
        setOpenRemoveRequest(false);
        setOpenChooseDoctors(false)
        setUpdated(!updated);
      },
      failedAction: () => {
        setOpenRemoveRequest(false);
        setOpenChooseDoctors(false)
        setUpdated(!updated);
      },
    });

  const chooseDoctor = () => {
    setConfirmChoosing(false)
    setSending(true)
    let data = JSON.stringify({
      "requestId": requestToExecute.id,
      "timeSlotId": timeSlotId
    });
    console.log('data', data)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://bedlendule-backend.vercel.app/bedlendule/chooseDoctor',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      setSending(false);
      response.status === 200
        ? setSubmitSuccessPopUp(true)
        : setSubmitFailPopUp(true);
        console.log('chooseDoctor Response', response.data)
    })
    .catch((error) => {
      console.log(error);
        setSending(false);
        setSubmitFailPopUp(true);
    });
    
  }
  const deleteRequest = () => {
    setOpenRemoveRequest(false);
    setSending(true);
    let data = JSON.stringify({
      id: requestToExecute.id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/deleteRequest",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setSending(false);
        response.status === 200
          ? setSubmitSuccessPopUp(true)
          : setSubmitFailPopUp(true);
      })
      .catch((error) => {
        console.log(error);
        setSending(false);
        setSubmitFailPopUp(true);
      });
  };
  useEffect(() => {
    setFetching(true);
    setRequests([]);
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
        console.log("response.data", response.data);
        setFetching(false);
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
        setFetching(false);
      });
  }, [updated]);
  return (
    <>
      <div
        className={`mt-[50px] duration-200 ${
          insidePage === "patientSchedule"
            ? "scale-100 opacity-100"
            : "pointer-events-none hidden opacity-0"
        }`}
      >
        <div className="z-10 mt-20 flex w-full flex-col items-center justify-center">
          <Calendar
            className="z-0 w-10/12 shadow-lg"
            value={date}
            onChange={(e) => {
              setDate(e.value.toLocaleDateString());
              setInsidePage("selectDoctor");
            }}
            disabledDates={disabledDates.map((e) => new Date(e))}
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
        {fetching && (
          <div className="mt-10 flex w-full items-center justify-center">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="4"
              animationDuration="0.5s"
            />
          </div>
        )}
        {!fetching && (
          <div>
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
                    className={`mx-auto my-4 flex w-[90%] flex-col space-y-2 rounded-lg border-2 border-[#36c2f9] p-2 text-slate-600 md:w-1/2
                    ${
                      request.doctorTimeslot.length > 0 &&
                      request.status === "CHOSEN" &&
                      "border-[#beda9f] bg-[#f1fae4] text-slate-600"
                    }`}
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
                          {new Date(request.startTime).toLocaleDateString("TH")}{" "}
                          :{" "}
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
                        onClick={() => {
                          setRequestToExecute(request);
                          setOpenRemoveRequest(true);
                        }}
                        className={`float-right text-2xl text-slate-500 hover:text-slate-400 
                        ${request.status !== "OPEN" && "hidden"}`}
                      >
                        <BiTrash />
                      </button>
                      <button
                        onClick={() => {
                          setRequestToExecute(request);
                          console.log(
                            request
                          );
                          setOpenChooseDoctors(true);
                        }}
                        className={`button float-right my-auto h-fit p-2 text-xs text-white
                        ${request.status !== "ACCEPTED" && "hidden"}`}
                      >
                        CHOOSE DOCTOR
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
                    new Date(request.finishTime).getTime() <
                    new Date().getTime()
                )
                .map((request, idx) => (
                  <div
                    key={idx}
                    className={`mx-auto my-4 flex w-[90%] flex-col space-y-2 rounded-lg border-2 border-[#36c2f9]
            bg-slate-100 p-2 text-slate-400 md:w-1/2 ${
              !request.review && request.status === "CHOSEN" && "bg-transparent"
            }`}
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
                          {new Date(request.startTime).toLocaleDateString("TH")}{" "}
                          :{" "}
                          {new Date(request.startTime)
                            .toLocaleTimeString("TH")
                            .slice(0, 5)}
                          -
                          {new Date(request.finishTime)
                            .toLocaleTimeString("TH")
                            .slice(0, 5)}
                        </p>
                      </div>
                      {!request.review && request.status === "CHOSEN" && (
                        <button
                          onClick={() => {
                            setRequestToExecute(request);
                            setTimeSlotId(request.doctorTimeslot[0].id);
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
          </div>
        )}
      </div>
      <div
        className={`shader duration-200
    ${!openReview && "pointer-events-none opacity-0"}`}
      >
        <ReviewDoctor
          updated={updated}
          setUpdated={setUpdated}
          openReview={openReview}
          setOpenReview={setOpenReview}
          requestId={requestToExecute?.id}
          timeSlotId={timeSlotId}
        />
      </div>
      <div
        className={`fixed top-10 w-full duration-200 ${
          insidePage === "selectDoctor"
            ? "scale-100 opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <SelectDoctor
          date={date}
          setInsidePage={setInsidePage}
          setDate={setDate}
          disabledDates={disabledDates}
          dateTemplate={dateTemplate}
        />
      </div>
      <div
        className={`shader duration-200
      ${!openCreateRequest ? "pointer-events-none opacity-0" : ""}`}
      ></div>
      <CreateRequest
        updated={updated}
        setUpdated={setUpdated}
        openCreateRequest={openCreateRequest}
        setOpenCreateRequest={setOpenCreateRequest}
      />
      <ConfirmPopup
        title={"Delete Request"}
        description={"Are you sure to delete this request?"}
        action={deleteRequest}
        state={openRemoveRequest}
        setState={setOpenRemoveRequest}
      />
      {/* )} */}
      
      <div
        className={`shader fixed left-0 z-50 flex w-full
  flex-col font-kanit shadow-xl duration-300
    ${openChooseDoctors ? "" : "pointer-events-none opacity-0"}`}
      >
        <div
          className={`fixed top-1/2 left-1/2 w-11/12 -translate-y-1/2 -translate-x-1/2 rounded-lg
          bg-white p-6 shadow-xl duration-200 ${
            openChooseDoctors ? "" : "scale-95 opacity-0"
          }`}
        >
          <MdClose
            className="absolute right-4 cursor-pointer text-2xl text-slate-500 duration-150 hover:text-slate-300"
            onClick={() => setOpenChooseDoctors(false)}
          />
          <p className="text-center text-3xl font-bold text-slate-600">
            REQUEST
          </p>
          <div className="my-5 flex justify-evenly rounded-xl border bg-slate-50 p-2">
            <p>
              <p>Date</p> {requestToExecute?.startTime.split("T")[0]}
            </p>
            <p>
              <p>From</p>
              {requestToExecute?.startTime.split("T")[1].slice(0, 5)}
            </p>
            <p>
              <p>To</p> {requestToExecute?.finishTime.split("T")[1].slice(0, 5)}
            </p>
          </div>
          <p>Description</p>
          <div className="flex h-40 rounded-xl border bg-slate-50 p-2">
            {requestToExecute?.description}
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="my-5 flex w-1/2 rounded-xl border bg-slate-50 p-2">
              {requestToExecute?.meetingType} : {requestToExecute?.location}
            </div>
            <div className="my-5 flex w-1/2 rounded-xl border bg-slate-50 p-2">
              Price : ฿{requestToExecute?.price}
            </div>
          </div>
          {requestToExecute?.doctorTimeslot.map((e) => (
            <div className="flex items-center justify-between">
              <div className="my-2 w-3/4 rounded-xl border border-[#cfe6eb] p-2 px-3 shadow-md">
                <div className="flex justify-between">
                  <p className="text-lg text-[#3f6fb6]">
                    {e.firstName} {e.lastName}
                  </p>
                  <Rating
                    onIcon={
                      <img
                        src="/rating-icon-active.png"
                        onError={(e) =>
                          (e.target.src =
                            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                        }
                        alt="custom-active"
                        width="12px"
                        height="12px"
                      />
                    }
                    offIcon={
                      <img
                        src="/rating-icon-inactive.png"
                        onError={(e) =>
                          (e.target.src =
                            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                        }
                        alt="custom-inactive"
                        width="12px"
                        height="12px"
                      />
                    }
                    readOnly
                    cancel={false}
                    value={e.reviewScore}
                  />
                </div>
                <p>{e.background}</p>
              </div>
              <button
                onClick={() => {
                  setConfirmChoosing(true);
                  setTimeSlotId(e.id);
                }}
                className="button h-fit p-1 px-2 text-sm"
              >
                choose
              </button>
            </div>
          ))}
        </div>
      </div>
      <ConfirmPopup
        title={"Confirm Choosing Therapist"}
        description={"Would you like to proceed with this therapist?"}
        action={chooseDoctor}
        state={confirmChoosing}
        setState={setConfirmChoosing}
      />
      ;
      <SendingPopup />
      <ResultPopup />
    </>
    
  );
};

export default UserSchedule;
