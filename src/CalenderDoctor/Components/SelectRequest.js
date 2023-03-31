import axios from "axios";
import { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { MdClose, MdOutlinePayments } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import { Calendar } from "primereact/calendar";
import ConfirmPopup from "./ConfirmPopup";
import useSendingPopup from "../Hooks/useSendingPopup";
import useSubmitResult from "../Hooks/useSubmitResult";
import useDoctorCalendarProps from "../Hooks/useDoctorCalendarProps";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DisabledatesContext } from "../home";
import useRedirect from "../Hooks/useRedirect";

const SelectRequest = () => {
  useDoctorCalendarProps();
  const [requests, setRequests] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [requestId, setRequestId] = useState();
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [timeSlot, setTimeSlot] = useState({});
  const [updated, setUpdated] = useState(false);
  const { setSending, SendingPopup } = useSendingPopup();
  const { date } = useParams();
  const { disabledDates, dateTemplate } = useContext(DisabledatesContext);
  const { redirectToLogin, redirect } = useRedirect();
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopUp } =
    useSubmitResult({
      successAction: () => {
        setUpdated(!updated);
      },
      failedAction: () => {
        setUpdated(!updated);
      },
    });
  const doctorUUID = localStorage.getItem("doctorUUID");
  const acceptRequest = () => {
    setConfirmPopup(false);
    let data = JSON.stringify({
      requestId: requestId,
      startTime: timeSlot.startTime,
      finishTime: timeSlot.finishTime,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/acceptRequest",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("access-token"),
      },
      data: data,
    };
    setSending(true);

    axios
      .request(config)
      .then((response) => {
        setSending(false);
        console.log(response.data)
        response.status === 200
          ? setSubmitSuccessPopUp(true)
          : setSubmitFailPopUp(true);
      })
      .catch((error) => {
        setSending(false);
        setSubmitFailPopUp(true);
        console.log(error);
        if (error.response.status === 401) {
          redirectToLogin()
        }
      });
  };
  useEffect(() => {
    setRequests([]);
    setFetching(true);
    if (date) {
      const data = JSON.stringify({ date: new Date(date) });
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://bedlendule-backend.vercel.app/bedlendule/getOpeningRequestsByDate",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          setFetching(false);
          const _requests = response.data.filter(
            (e) =>
              e.doctorTimeslot.findIndex(
                (timeslot) => timeslot.schedule.uuid === doctorUUID
              ) === -1 && new Date(e.startTime) > new Date()
          );
          setRequests(_requests);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://bedlendule-backend.vercel.app/bedlendule/getOpeningRequests",
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          setFetching(false);
          const _requests = response.data.filter(
            (e) =>
              e.doctorTimeslot.findIndex(
                (timeslot) => timeslot.schedule.uuid === doctorUUID
              ) === -1
          );
          setRequests(_requests);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [date, updated]);

  return (
    <>
      <button
        className="top-13 absolute right-4 z-40 w-10 rounded-md border px-1 text-2xl font-light text-slate-400 shadow-md hover:bg-slate-100"
        onClick={() => redirect("/schedule")}
      >
        <IoIosReturnLeft />
      </button>
      <div className="headingColor relative mt-8 text-center text-3xl font-bold ">
        SELECT REQUEST
      </div>
      <div className="m-4">
        <p>FILTER DATE</p>
        <Calendar
          placeholder="Select date"
          className="z-0 w-1/2 rounded-lg border-2 md:w-8/12"
          value={date}
          disabledDates={disabledDates.map((e) => new Date(e))}
          onChange={(e) => {
            redirect(
              `../schedule/selectrequest/${e.value
                .toLocaleDateString()
                .replace(/\//g, "-")}`
            );
          }}
          minDate={new Date()}
          locale="en"
          dateTemplate={dateTemplate}
        />
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
      {requests.map((request) => (
        <div className="mx-auto my-4 flex w-11/12 flex-col rounded-md border border-slate-400 bg-[#F0F3EC] p-4">
          <div className="flex ">
            <p className="rounded-lg bg-[#f0ffe7d5] px-1 text-[#72E128]">
              {request.problemType.charAt(0) +
                request.problemType.slice(1).toLowerCase()}
            </p>
          </div>
          <div className="text-[#4C4E64]">
            <p className="my-2 text-xl font-bold">{request.title}</p>
            <p>
              Available : {new Date(request.startTime).toLocaleDateString()}
            </p>
            <p>
              From:{" "}
              {new Date(request.startTime)
                .toLocaleString("TH")
                .split(" ")[1]
                .slice(0, 5)}{" "}
              -{" "}
              {new Date(request.finishTime)
                .toLocaleString("TH")
                .split(" ")[1]
                .slice(0, 5)}
            </p>
            <p>
              Location : {request.meetingType} ({request.location})
            </p>
            <p className="my-3 text-sm">{request.description}</p>
            <p className="flex items-center">
              <MdOutlinePayments />
              &nbsp; ฿{request.price}
            </p>
          </div>
          <div className="mt-5 flex w-full justify-center space-x-2">
            <button className="button w-20 p-1">Chat</button>
            <button
              onClick={() => {
                // acceptRequest(request.id);
                setConfirmPopup(true);
                setRequestId(request.id);
                setTimeSlot({
                  startTime: request.startTime,
                  finishTime: request.finishTime,
                });
              }}
              className="button w-20 bg-[#666CFF] p-1 hover:bg-[#666bffc0] active:bg-[#666CFF]"
            >
              Accept
            </button>
          </div>
        </div>
      ))}
      {requests.length === 0 && !fetching && (
        <div className="text-center">No open request for you</div>
      )}
      <ConfirmPopup
        title={"Accept Request"}
        description={"Do you want to accept this request"}
        action={acceptRequest}
        state={confirmPopup}
        setState={setConfirmPopup}
      />
      <SendingPopup />
      <ResultPopup />
    </>
  );
};
export default SelectRequest;
