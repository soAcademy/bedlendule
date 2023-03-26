import axios from "axios";
import { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { ProgressSpinner } from "primereact/progressspinner";
import SelectRequestDetail from "./SelectedRequestDetail";
import { MdClose, MdOutlinePayments } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import { DatePicker } from "./DateTimePicker";
import { Calendar } from "primereact/calendar";

const SelectRequest = ({
  date,
  setInsidePage,
  setDate,
  disabledDates,
  dateTemplate,
}) => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState("requestLists");
  const [fetching, setFetching] = useState(false);
  const acceptRequest = (requestId) => {
    console.log("first", requestId);
  };
  useEffect(() => {
    setRequests([]);
    setFetching(true);
    const data = JSON.stringify({ date: date });
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
        console.log("response.data", response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [date]);

  return (
    <>
      {page === "requestLists" && (
        <div
          className={`p-2 duration-200  ${
            page === "requestLists" ? "opacity-100" : "opacity-0"
          } `}
        >
          <button
            className="fixed right-5 z-40 w-10 rounded-lg border px-1 text-2xl font-light text-slate-400 shadow-md hover:bg-slate-100"
            onClick={() => setInsidePage("doctorSchedule")}
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
                setDate(e.value.toISOString());
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
                <p>Available : {request.startTime.split("T")[0]}</p>
                <p>
                  From: {request.startTime.split("T")[1].slice(0, 5)} -{" "}
                  {request.finishTime.split("T")[1].slice(0, 5)}
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
                    acceptRequest(request.id);
                  }}
                  className="button w-20 bg-[#666CFF] hover:bg-[#666bffc0] active:bg-[#666CFF] p-1"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {
        <div
          className={`opacity-0 duration-200 ${
            page === "requestDetail" && "opacity-100"
          } `}
        >
          <SelectRequestDetail
            setPage={setPage}
            selectedRequest={selectedRequest}
          />
        </div>
      } */}
    </>
  );
};
export default SelectRequest;
