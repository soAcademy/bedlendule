import React, { useState, useEffect, useContext } from "react";
import { Calendar } from "primereact/calendar";
import { BiTrash } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import usePatientCalendarProps from "../Hooks/usePatientCalendarProps";
import CreateRequest from "../Components/CreateRequest";
import axios from "axios";
import ReviewDoctor from "../Components/ReviewDoctor";
import { ProgressSpinner } from "primereact/progressspinner";
import ConfirmPopup from "../Components/ConfirmPopup";
import useSendingPopup from "../Hooks/useSendingPopup";
import useSubmitResult from "../Hooks/useSubmitResult";
import { MdClose, MdDone } from "react-icons/md";
import { Rating } from "primereact/rating";
import { AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { DisabledatesContext } from "../home";
import useRedirect from "../Hooks/useRedirect";

const UserSchedule = () => {
  usePatientCalendarProps();
  const [fetching, setFetching] = useState(false);
  const [doctorUUID, setDoctorUUID] = useState();
  const [doctorDetail, setDoctorDetail] = useState();
  const [openDoctorDetail, setOpenDoctorDetail] = useState(false);
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
  const { disabledDates, dateTemplate, date, setDate } =
    useContext(DisabledatesContext);
  const { redirectToLogin, redirect } = useRedirect();
  const { setSending, SendingPopup } = useSendingPopup();
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopUp } =
    useSubmitResult({
      successAction: () => {
        setOpenRemoveRequest(false);
        setOpenChooseDoctors(false);
        setUpdated(!updated);
      },
      failedAction: () => {
        setOpenRemoveRequest(false);
        setOpenChooseDoctors(false);
        setUpdated(!updated);
      },
    });

  const chooseDoctor = () => {
    setConfirmChoosing(false);
    setSending(true);
    let data = JSON.stringify({
      requestId: requestToExecute.id,
      timeSlotId: timeSlotId,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/chooseDoctor",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("access-token"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setSending(false);
        console.log("response", response);
        response.status === 200
          ? setSubmitSuccessPopUp(true)
          : setSubmitFailPopUp(true);
      })
      .catch((error) => {
        console.log(error);
        setSending(false);
        setSubmitFailPopUp(true);
        if (error.response.status === 401) {
          redirectToLogin();
        }
      });
  };
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
        authorization: localStorage.getItem("access-token"),
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
        if (error.response.status === 401) {
          redirectToLogin();
        }
      });
  };
  useEffect(() => {
    setFetching(true);
    setRequests([]);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getRequestsByUUID",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("access-token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
        setFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setFetching(false);
        if (error.response.status === 401) {
          redirectToLogin();
        }
      });
  }, [updated]);

  useEffect(() => {
    if (doctorUUID) {
      let data = JSON.stringify({
        uuid: doctorUUID,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://bedlendule-backend.vercel.app/bedlendule/getUserDetailByUUID",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("access-token"),
        },
        data: data,
      };
      setFetching(true);

      axios
        .request(config)
        .then((response) => {
          setDoctorDetail(response.data);
          setFetching(false);
        })
        .catch((error) => {
          console.log(error);
          setFetching(false);
          if (error.response.status === 401) {
            redirectToLogin();
          }
        });
    }
  }, [doctorUUID]);

  // console.log("testDate",testDate);
  return (
    <>
      <div
        className={`duration-200 ${
          insidePage === "patientSchedule"
            ? "scale-100 opacity-100"
            : "pointer-events-none hidden opacity-0"
        }`}
      >
        <div className="z-10 mt-10 flex w-full flex-col items-center justify-center">
          <Calendar
            className="z-0 w-10/12 shadow-lg md:w-8/12"
            value={date}
            onChange={(e) => {
              redirect(
                `selectDoctor/${e.value
                  .toLocaleDateString("en")
                  .replace(/\//g, "-")}`
              );
            }}
            disabledDates={disabledDates?.map((e) => new Date(e))}
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
          <div className="flex flex-col space-y-2 pl-4">
            <div className="mt-5 font-bold">UPCOMING SCHEDULE</div>
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
                        {new Date(request.startTime).toLocaleDateString(
                          "en-GB"
                        )}{" "}
                        :{" "}
                        {new Date(request.startTime)
                          .toLocaleTimeString("en-GB")
                          .slice(0, 5)}
                        -
                        {new Date(request.finishTime)
                          .toLocaleTimeString("en-GB")
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
                        setOpenChooseDoctors(true);
                      }}
                      className={`button float-right my-auto h-fit p-2 text-xs text-white
                        ${
                          (request.status !== "ACCEPTED" ||
                            request.doctorTimeslot.length === 0) &&
                          "hidden"
                        }`}
                    >
                      CHOOSE DOCTOR
                    </button>
                  </div>
                </div>
              ))}
            {requests.filter(
              (request) =>
                new Date(request.startTime).getTime() > new Date().getTime()
            ).length === 0 && (
              <p className="pl-4 text-slate-700 md:w-1/2">
                No incoming schedule
              </p>
            )}
            <div>
              <div className="font-bold">PAST SCHEDULE</div>

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
                        <p className="font-bold">{request.title}</p>
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
                          {new Date(request.startTime).toLocaleDateString(
                            "en-GB"
                          )}{" "}
                          :{" "}
                          {new Date(request.startTime)
                            .toLocaleTimeString("en-GB")
                            .slice(0, 5)}
                          -
                          {new Date(request.finishTime)
                            .toLocaleTimeString("en-GB")
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
                    <p className="text-end">
                      {request.doctorTimeslot[0]?.firstName}{" "}
                      {request.doctorTimeslot[0]?.lastName}
                    </p>
                  </div>
                ))}
              {requests.filter(
                (request) =>
                  new Date(request.finishTime).getTime() < new Date().getTime()
              ).length === 0 && (
                <div className="mb-4 mt-2 pl-4 text-slate-700 md:w-1/2">
                  No history
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ReviewDoctor
        updated={updated}
        setUpdated={setUpdated}
        openReview={openReview}
        setOpenReview={setOpenReview}
        requestId={requestToExecute?.id}
        timeSlotId={timeSlotId}
      />
      <div
        className={`fixed top-10 w-full duration-200 ${
          insidePage === "selectDoctor"
            ? "scale-100 opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      ></div>
      <CreateRequest
        requests={requests}
        updated={updated}
        setUpdated={setUpdated}
        openCreateRequest={openCreateRequest}
        setOpenCreateRequest={setOpenCreateRequest}
      />

      {/* )} */}
      <div
        className={`fixed top-6 left-0 h-full w-full
      ${openChooseDoctors ? "" : "pointer-events-none opacity-0"}`}
      >
        <div
          onClick={() => setOpenChooseDoctors(false)}
          className={`shader
    ${openChooseDoctors ? "" : "opacity-0"}`}
        ></div>
        <div
          className={`popup w-11/12 ${
            openChooseDoctors ? "" : "scale-95 opacity-0"
          }`}
        >
          <button
            className="absolute top-0 right-0 m-2 rounded-full p-2 text-2xl font-light text-slate-400 
          opacity-50 duration-100  hover:bg-red-500 hover:text-slate-50"
            onClick={() => setOpenChooseDoctors(false)}
          >
            <MdClose />
          </button>
          <p className="text-center text-3xl font-bold text-slate-600">
            REQUEST
          </p>
          <div className="my-5 flex justify-evenly rounded-xl border bg-slate-50 p-2">
            <p>
              <p>Date</p> {requestToExecute?.startTime.split("T")[0]}
            </p>
            <p>
              <p>From</p>
              {new Date(requestToExecute?.startTime)
                .toLocaleTimeString("en-GB")
                .slice(0, 5)}
            </p>
            <p>
              <p>To</p>{" "}
              {new Date(requestToExecute?.finishTime)
                .toLocaleTimeString("en-GB")
                .slice(0, 5)}
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
          {requestToExecute?.doctorTimeslot.map((e) => {
            console.log(e);
            return (
              <div className="flex items-center justify-between">
                <div
                  onClick={() => {
                    setOpenDoctorDetail(true);
                    setDoctorUUID(e.doctorUUID);
                  }}
                  className="my-2 min-h-[80px] w-3/4 cursor-pointer rounded-xl border border-[#cfe6eb] p-2 px-3 shadow-md"
                >
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
            );
          })}
        </div>
      </div>
      {openDoctorDetail && (
        <div className="shader top-6 z-30 ">
          <div className="popup w-11/12">
            <button
              className=" absolute top-0 right-0 m-2 rounded-full p-2 text-2xl font-light text-slate-400 
                          opacity-50 duration-100  hover:bg-red-500 hover:text-slate-50"
              onClick={() => setOpenDoctorDetail(false)}
            >
              <MdClose />
            </button>
            {fetching ? (
              <div className="flex w-full items-center justify-center">
                <ProgressSpinner
                  style={{ width: "50px", height: "50px" }}
                  strokeWidth="8"
                  animationDuration="0.7s"
                />
              </div>
            ) : (
              doctorDetail && (
                <div className="flex w-full flex-col text-slate-600">
                  <img
                    src={doctorDetail.profilePictureUrl}
                    className="mx-auto h-[150px] rounded-lg object-contain"
                    alt="doctor-profile"
                  />
                  <p className="text-center text-2xl">
                    {doctorDetail.firstName} &nbsp; {doctorDetail.lastName}
                  </p>
                  <p className="mx-auto w-fit rounded-lg bg-red-50 p-1 px-2 text-sm text-red-400">
                    {doctorDetail.licenseId}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <div className="my-2 flex items-center justify-center gap-3">
                      <div className="rounded-lg border bg-indigo-100 p-2 text-2xl font-bold text-blue-600 ">
                        <MdDone />
                      </div>{" "}
                      <div className="">
                        <p className="text-start text-xl">
                          {doctorDetail.schedules.reduce(
                            (acc, e) =>
                              acc +
                              e.timeslots.filter(
                                (timeslot) =>
                                  new Date(timeslot.finishTime) < new Date() &&
                                  timeslot.request?.status === "CHOSEN"
                              ).length,
                            0
                          ) || 0}
                        </p>
                        <p className="text-sm text-slate-500">Cases Done</p>
                      </div>
                    </div>
                    <div className="my-2 flex items-center justify-center gap-3">
                      <div className="rounded-lg border bg-indigo-100 p-2 text-2xl font-bold text-blue-600 ">
                        <AiOutlineStar />
                      </div>{" "}
                      <div className="">
                        <p className="text-start text-xl">
                          {doctorDetail.reviews.reduce(
                            (acc, e) => acc + e.score,
                            0
                          ) / doctorDetail.reviews.length || 0}
                        </p>
                        <p className="text-sm text-slate-500">Rate Given</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-start text-xl text-slate-600">
                    About
                  </p>
                  <div className="mx-auto h-40 w-full rounded-lg border-2 border-slate-400 p-2 text-start">
                    {doctorDetail.background}
                  </div>
                  <p className="mt-4 text-start text-xl text-slate-600">
                    Review
                  </p>
                  <div className="no-scrollbar h-52 overflow-scroll">
                    {doctorDetail.reviews.map((e) => (
                      <>
                        <div
                          className="my-2 flex flex-col rounded-lg border border-slate-200 p-4 px-4
                      text-sm shadow-md"
                        >
                          <div className="no-scrollbar my-2 mx-auto max-h-24 w-full overflow-scroll text-start text-sm">
                            {e.review}
                          </div>
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
                            className="mb-2 self-end"
                            value={e.score}
                            readOnly
                            cancel={false}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
      <div
        className={`fixed top-0 left-0 h-full w-full ${
          !confirmChoosing && "pointer-events-none opacity-0"
        }`}
      >
        <ConfirmPopup
          title={"Confirm Choosing Therapist"}
          description={"Would you like to proceed with this therapist?"}
          action={chooseDoctor}
          state={confirmChoosing}
          setState={setConfirmChoosing}
        />
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-full ${
          !openRemoveRequest && "pointer-events-none opacity-0"
        }`}
      >
        <ConfirmPopup
          title={"Delete Request"}
          description={"Are you sure to delete this request?"}
          action={deleteRequest}
          state={openRemoveRequest}
          setState={setOpenRemoveRequest}
        />
      </div>
      <SendingPopup />
      <ResultPopup />
    </>
  );
};

export default UserSchedule;
