import { Rating } from "primereact/rating";
import { GiAlarmClock } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { IoIosReturnLeft } from "react-icons/io";

const SelectDoctorDetail = ({ setPage, selectedDoctor }) => {
  const [chooseTimeSlot, setChooseTimeSlot] = useState([]);
  const [appointmentPopup, setAppointmentPopup] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState([]);
  const [loading, setLoading] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [doctorName, setDoctorName] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [location, setLocation] = useState([]);

  console.log("selectedDoctor555", selectedDoctor);

  const scoreFromReview =
    selectedDoctor?.doctorUUID?.reviews?.reduce((acc, r) => acc + r.score, 0) /
    selectedDoctor?.doctorUUID?.reviews?.map((r) => r.score).length;

  // get doctor detail by UUID
  useEffect(() => {
    const _data = JSON.stringify({
      uuid: selectedDoctor.doctorUUID?.uuid,
    });
    // console.log("_data", _data);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getUserDetailByUUID",
      headers: {
        "Content-Type": "application/json",
      },
      data: _data,
    };
    setLoading(true);

    axios(config).then((response) => {
      setLoading(false);
      console.log("SelectDoctorData", response.data);
      setDoctorDetail(response.data);
      setDoctorName(selectedDoctor.doctorUUID);
    });
  }, [selectedDoctor]);

  // get ScheduleBy UUID
  useEffect(() => {
    const _data = JSON.stringify({
      uuid: selectedDoctor.doctorUUID?.uuid,
    });
    // console.log("_data", _data);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getScheduleByUUID",
      headers: {
        "Content-Type": "application/json",
      },
      data: _data,
    };
    axios(config).then((response) => {
      console.log("getScheduleByUUID", response.data);
      setSchedules(response.data);
      findTimeslot(response.data);
      findindexOfSchedules(response.data);
    });
  }, [selectedDoctor]);

  //get doctor Id for requestnull
  const findTimeslot = (schedules) => {
    console.log("schedulesfindslot", schedules);
    const findRequestNull = selectedDoctor.timeslots?.filter(
      (timeslots) => timeslots.requestId === null
    );
    const idRequestNull = findRequestNull?.map((r) => r.id);
    const times = idRequestNull?.map((a) =>
      schedules?.map((r) => r.timeslots?.filter((c) => c.id === a))
    );
    const _arrayTimes = times?.map((r) => r?.filter((c) => c.length > 0));

    const _doctorTimeslots = _arrayTimes?.map((r) =>
      r.map((c) =>
        c.map((r) => {
          return {
            startTime: r.startTime.substring(11, 16),
            finishTime: r.finishTime.substring(11, 16),
            price: r.price,
          };
        })
      )
    );
    return setCurrentTime(_doctorTimeslots);
  };
  //find index of scheduled which has timeslot(requestNull)
  const findindexOfSchedules = (schedules) => {
    console.log("schedules888", schedules);

    const findRequestNull = selectedDoctor.timeslots
      ?.filter((timeslots) => timeslots.requestId === null)
      .map((r) => r.id);
    console.log("requestNull", findRequestNull);
    const filter = schedules.map((r) =>
      r.timeslots.map((r, idx) => (r.id === findRequestNull[0] ? r : []))
    );

    const boolean = filter.map((r) => r.map((a) => a.length === undefined));
    const onlyTrue = boolean.map((r) => (r.includes(true) ? true : false));
    const indexOfTrue = onlyTrue
      .map((r, idx) => (r === true ? idx : -1))
      .filter((c) => c > 0);
    const location = indexOfTrue
      .map((r) => schedules[r])
      .map((r) => {
        return { location: r.location, meetingType: r.meetingType };
      });

    const result = findRequestNull?.map((r) => ({ ...location, requestId: r }));
    console.log("finalResult", result);

    return setLocation(result);
  };

  return (
    <>
      <div className="fixed top-10 flex w-full flex-col  ">
        <button
          className="fixed right-5 top-7 rounded-lg text-2xl font-light text-slate-400 hover:bg-slate-50 hover:text-slate-300"
          onClick={() => setPage("doctorLists")}
        >
          <IoIosReturnLeft className="w-[40px] rounded-lg shadow-lg" />
        </button>
        <div className="w-full text-center text-2xl">
          {selectedDoctor.doctorUUID?.firstName} &nbsp;{" "}
          {selectedDoctor.doctorUUID?.lastName}
        </div>

        <div className="mx-auto  pt-2">
          <Rating
            readOnly
            value={scoreFromReview}
            cancel={false}
            style={{ color: "var(--text-yellow)" }}
          />
        </div>

        <div className="mx-auto my-2  flex w-full items-center justify-center">
          {loading && (
            <div className="absolute   ">
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
        <div className=" mx-auto my-5 w-[80%] rounded-lg border-2  border-slate-400 pt-2 ">
          <div className="text-center text-xl">Details</div>

          <ul className="p-[20px] text-slate-600">
            <li className="">
              Email:
              <span className="text-slate-700 ">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
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
        <div className=" mx-auto w-[95%]">
          {currentTime?.map((currentTime) =>
            currentTime?.map((r) =>
              r.map((r) => (
                <ul
                  className="mx-auto my-4 flex w-[90%] cursor-pointer flex-row gap-2 hover:bg-[#C5E1A5] "
                  onClick={() => {
                    setChooseTimeSlot(r);
                    setAppointmentPopup(!appointmentPopup);
                  }}
                >
                  <li className="  relative flex w-[25%] rounded-lg border-2 border-slate-400 p-2 text-center text-sm ">
                    <div className="absolute top-[-10px] w-[50px] rounded-lg bg-white px-1 text-slate-400">
                      From
                    </div>
                    <div className="mx-auto flex">
                      <div className="underline underline-offset-2 ">
                        {r.startTime}
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
                        {r.finishTime}
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
            )
          )}
        </div>
      </div>

      {appointmentPopup && (
        <Appointment
          chooseTimeSlot={chooseTimeSlot}
          doctorName={doctorName}
          setAppointmentPopup={setAppointmentPopup}
          appointmentPopup={appointmentPopup}
        />
      )}
    </>
  );
};
export default SelectDoctorDetail;
