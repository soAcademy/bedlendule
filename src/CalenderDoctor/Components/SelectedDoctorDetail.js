import { Rating } from "primereact/rating";
import { GiAlarmClock } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { IoIosReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const useChooseTimeSlot = ({
  findFreeTimeSlot,
  selectDate,
  selectedDoctor,
  setLoading,
}) => {
  const [chooseTimeSlot, setChooseTimeSlot] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    // console.log("scheduleBy UUID and Date...");
    // console.log("scheduleBy fetch ", fetch);
    setLoading(true);
    const data = JSON.stringify({
      uuid: selectedDoctor.doctor?.uuid,
      date: selectDate,
    });
    console.log("dataForApi", data);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getScheduleByDateAndUUID",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config).then((response) => {
      console.log("UUID and Date response.data:", response.data);
      console.log("selectDate",selectDate);
      setLoading(false);
      const _freetimeSlots = findFreeTimeSlot(response.data);
      setTimeSlots(_freetimeSlots);
    });
  }, [selectedDoctor, fetch]);

  return {
    chooseTimeSlot,
    setChooseTimeSlot,
    fetch,
    setFetch,
    timeSlots,
    setTimeSlots,
  };
};

const useFetch = ({ selectedDoctor, setDoctorDetail, setDoctorName }) => {
  const [fetch, setFetch] = useState(false);
  useEffect(() => {
    const _data = JSON.stringify({
      uuid: selectedDoctor.doctor?.uuid,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getUserDetailByUUID",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("access-token"),
      },
      data: _data,
    };

    axios(config).then((response) => {
      // console.log("getUserDetailByUUID:", response.data);
      setDoctorDetail(response.data);
      setDoctorName(selectedDoctor?.doctor);
    });
  }, [selectedDoctor, fetch]);

  return {
    fetch,
    setFetch,
  };
};

const useDoctorInfo = () => {
  const [doctorDetail, setDoctorDetail] = useState([]);
  const [doctorName, setDoctorName] = useState([]);
  return {
    doctorDetail,
    setDoctorDetail,
    doctorName,
    setDoctorName,
  };
};

const useToggle = () => {
  const [loading, setLoading] = useState(false);
  const [appointmentPopup, setAppointmentPopup] = useState(false);
  return {
    loading,
    setLoading,
    appointmentPopup,
    setAppointmentPopup,
  };
};

const SelectDoctorDetail = ({
  selectedDoctor,
  setOpenDoctorDetail,
  selectDate,
  openDoctorDetail,
}) => {
  const findFreeTimeSlot = (timeSlots) => {
    // console.log("findFreeTimeSlot working...", timeSlots);
    const findRequestNull = timeSlots.map((r) =>
      r.timeslots.filter((timeslots) => timeslots.request === null)
    );
    // console.log("findRequestNull", findRequestNull);

    const filtertimeSlot = findRequestNull.map((r) =>
      r.filter((c) => {
        let tomorrow = new Date(selectDate);
        tomorrow.setHours(tomorrow.getHours() + 24);

        return (
          new Date(c.startTime) >= new Date(selectDate) &&
          new Date(c.startTime) < tomorrow
        );
      })
    );
    // console.log("filtertimeSlot", filtertimeSlot);
    const filterEmptyArray = filtertimeSlot.filter((r) => r.length > 0);
    // console.log("filteremptyArray", filterEmptyArray);

    const IndexLocation = filtertimeSlot
      .map((r, idx) => (r.length !== 0 ? idx : -1))
      .filter((r) => r >= 0);
    // console.log("IndexLocation", IndexLocation);

    const mapLocation = IndexLocation.map((index) => timeSlots[index]).map(
      (r) => {
        return {
          location: r.location,
          meetingType: r.meetingType,
          description: r.description,
          title: r.title,
        };
      }
    );
    console.log("mapLocation", mapLocation);

    const result = filterEmptyArray.map((r, idx) => {
      return { ...[mapLocation[idx]], freeTimeslots: r };
    });

    console.log("result", result);

    const finalResult = result.map((r) => {
      return {
        location: r[0].location,
        meetingType: r[0].meetingType,
        description: r[0].description,
        title: r[0].title,
        freetime: r.freeTimeslots,
      };
    });
    // console.log("finalResult", finalResult);
    return finalResult;
  };
  const { doctorDetail, setDoctorDetail, doctorName, setDoctorName } =
    useDoctorInfo();
  const { loading, setLoading, appointmentPopup, setAppointmentPopup } =
    useToggle();
  const { fetch, setFetch } = useFetch({
    selectedDoctor,
    setDoctorDetail,
    setDoctorName,
  });
  const { chooseTimeSlot, setChooseTimeSlot, timeSlots } = useChooseTimeSlot({
    findFreeTimeSlot,
    selectDate,
    selectedDoctor,
    setLoading,
  });
  const redirect = useNavigate();
  const scoreFromReview =
    selectedDoctor?.doctor?.reviews?.reduce((acc, r) => acc + r.score, 0) /
    selectedDoctor?.doctor?.reviews?.map((r) => r.score).length;


  return (
    <>
      <shader
        onClick={() => setOpenDoctorDetail(false)}
        className={`shader
    ${!openDoctorDetail && "pointer-events-none opacity-0"}`}
      ></shader>
      <div
        className={`popup flex w-full flex-col duration-300 
    ${
      openDoctorDetail
        ? "scale-100 opacity-100"
        : "pointer-events-none scale-95 opacity-0"
    }`}
      >
        <button
          className=" absolute top-0 right-0 m-2 rounded-full p-2 text-2xl font-light text-slate-400 
          opacity-50 duration-100  hover:bg-red-500 hover:text-slate-50"
          onClick={() => setOpenDoctorDetail(false)}
        >
          <MdClose className="" />
        </button>
        <div className="w-full text-center text-2xl">
          {selectedDoctor.doctor?.firstName} &nbsp;{" "}
          {selectedDoctor.doctor?.lastName}
        </div>

        <div className="mx-auto pt-2">
          <Rating
            readOnly
            value={scoreFromReview}
            cancel={false}
            style={{ color: "var(--text-yellow)" }}
          />
        </div>

        <div className="mx-auto my-2  flex w-full items-center justify-center  ">
          {loading && (
            <div className="absolute  ">
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="8"
              />
            </div>
          )}
          <img
            src={doctorDetail?.profilePictureUrl}
            className="h-[200px] rounded-lg"
            alt="doctorURL"
          />
        </div>
        <div className=" mx-auto my-5 w-[80%] rounded-lg border-2  border-slate-400 pt-2 text-left ">
          <div className="text-center text-xl">Details</div>

          <ul className="p-[20px] text-slate-600">
            <li className="">
              Email:
              <span className="text-slate-700 ">
                &nbsp;&nbsp;&nbsp;
                {doctorDetail.email}
              </span>
            </li>
            <li className="bg-teal-100">
              License ID:
              <span className="text-sm  text-slate-700">
                {" "}
                &nbsp;&nbsp; {doctorDetail.licenseId}
              </span>
            </li>
            <li className="">
              Contact :
              <span className="text-sm   text-slate-700">
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {doctorDetail.phoneNumber}
              </span>
            </li>
          </ul>
        </div>
        <div className=" mx-auto w-[350px] md:w-3/4 ">
          {timeSlots?.map((c) =>
            c?.freetime.map((r) => (
              <ul
                className="mx-auto my-4 flex w-[90%] cursor-pointer flex-row gap-2 hover:bg-[#C5E1A5] "
                onClick={() => {
                  setChooseTimeSlot([c, r]);
                  setAppointmentPopup(true);
                }}
              >
                <li className="  relative flex w-[25%] rounded-lg border-2 border-slate-400 p-2 text-center text-sm ">
                  <div className="absolute top-[-10px] w-[50px] rounded-lg bg-white px-1 text-slate-400">
                    From
                  </div>
                  <div className="mx-auto flex">
                    <div className="underline underline-offset-2 ">
                      {r.startTime.substring(11, 16)}
                    </div>
                    <div className="px-1">
                      <GiAlarmClock className="text-base" />
                    </div>
                  </div>
                </li>
                <li className="  relative flex w-[25%]  rounded-lg border-2 border-slate-400 p-2 text-center text-sm">
                  <div className="absolute top-[-10px] rounded-lg bg-white px-1 text-slate-400">
                    To
                  </div>
                  <div className="mx-auto flex">
                    <div className="underline underline-offset-2">
                      {r.finishTime.substring(11, 16)}
                    </div>
                    <div className="px-1">
                      <GiAlarmClock className="text-base" />
                    </div>
                  </div>
                </li>
                <li className=" relative flex w-[50%]  rounded-lg border-2 border-slate-400 p-2 text-center text-sm">
                  <div className="absolute top-[-10px] rounded-lg bg-white px-1 text-slate-400">
                    Rate
                  </div>
                  <div className=" mx-auto flex">
                    <div className="underline underline-offset-2">
                      {r.price} THB/Hour
                    </div>
                    <div className="px-1">
                      <AiFillDollarCircle className="my-auto text-base text-yellow-500" />
                    </div>
                  </div>
                </li>
              </ul>
            ))
          )}
        </div>
      </div>

      {appointmentPopup && (
        <Appointment
          chooseTimeSlot={chooseTimeSlot}
          doctorName={doctorName}
          setAppointmentPopup={setAppointmentPopup}
          appointmentPopup={appointmentPopup}
          setFetch={setFetch}
          fetch={fetch}
          setOpenDoctorDetail={setOpenDoctorDetail}
        />
      )}
    </>
  );
};
export default SelectDoctorDetail;
