import { Rating } from "primereact/rating";
import { GiAlarmClock } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
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

  console.log("currentTime", currentTime);
  console.log("selectedDoctor", selectedDoctor.doctorUUID);
  console.log("doctorName", doctorName);
  console.log("appointmentPopup selectDoctor", appointmentPopup);

  const scoreFromReview =
    selectedDoctor?.doctorUUID?.reviews?.reduce((acc, r) => acc + r.score, 0) /
    selectedDoctor?.doctorUUID?.reviews?.map((r) => r.score).length;

  const currentTime2 = (doctorDetail) => {
    // หาวันว่าง
    const _nullTimeslot = doctorDetail.schedules?.map((schedules) =>
      schedules.timeslots?.filter((timeslots) => timeslots.requestId === null)
    );
    const _indexOfTimeSlot = _nullTimeslot
      ?.map((r, idx) => (r.length > 0 ? idx : -1))
      ?.filter((r) => r >= 0);
    const _timeSlot = _indexOfTimeSlot?.map((r) => _nullTimeslot[r]);
    console.log("_timeSlot", _timeSlot);

    // หาวันว่างที่เป็นปัจจุบัน
    const freeDayBoolean = _timeSlot?.map((timeslots) =>
      timeslots.map(
        (r) =>
          Number(r.startTime.substring(8, 10)) >=
          Number(new Date().toISOString().substring(8, 10))
      )
    );

    const filteredArry = _timeSlot?.filter((obj, index) => {
      return freeDayBoolean[index].includes(true);
    });
    // console.log("filteredArry", filteredArry);

    // หาช่วงเวลา
    const _doctorTimeslots = filteredArry?.map((r) =>
      r.map((r) => {
        return {
          startTime: r.startTime.substring(11, 16),
          finishTime: r.finishTime.substring(11, 16),
        };
      })
    );
    console.log("_doctorTimeslots", _doctorTimeslots);
    return setCurrentTime(_doctorTimeslots);
  };

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
      // console.log("response.data>>", response.data);
      setDoctorDetail(response.data);
      currentTime2(response.data);
      setDoctorName(selectedDoctor.doctorUUID);
    });
  }, [selectedDoctor]);

  return (
    <>
      <button
          className="fixed right-5 top-6 z-40 w-10 rounded-lg border px-1 text-2xl font-light text-slate-400 shadow-md hover:bg-slate-100"
          onClick={() => setPage("doctorLists")}
        >
          <IoIosReturnLeft />
        </button>
      {loading ? (
        <div className="fixed top-1/2 flex w-full items-center justify-center">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            animationDuration="0.7s"
          />
        </div>
      ) : (
        <div className="fixed top-10 flex w-full flex-col  ">
          <div className="w-full text-center text-2xl">
            {selectedDoctor.doctorUUID?.firstName} &nbsp;{" "}
            {selectedDoctor.doctorUUID?.lastName}
          </div>

          <div className="mx-auto  pt-2">
            <Rating
              readOnly
              value={scoreFromReview}
              cancel={false}
              className=""
            />
          </div>

          <div className="mx-auto my-2">
            <img
              src={doctorDetail?.profilePictureUrl}
              className="h-[200px] rounded-lg"
              alt="doctor-profile"
            />
          </div>
          <div className=" mx-auto my-5 w-[80%] rounded-lg border-2  border-slate-400 pt-2">
            <div className="text-center text-xl">Details</div>

            <ul className="p-[20px] text-slate-600">
              <li>
                Username:
                <span className="text-slate-500 underline underline-offset-2">
                  {" "}
                  Marry@
                </span>
              </li>
              <li>
                Email:
                <span className="text-slate-500 underline underline-offset-2">
                  {doctorDetail.email}
                </span>
              </li>
              <li>
                License ID:
                <span className="text-slate-500 underline underline-offset-2">
                  {" "}
                  {doctorDetail.licenseId}
                </span>
              </li>
              <li>
                Contact :
                <span className="text-slate-500 underline underline-offset-2">
                  {" "}
                  {doctorDetail.phoneNumber}
                </span>
              </li>
            </ul>
          </div>
          <div className=" mx-auto w-[95%]">
            {currentTime?.map((r) =>
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
                        1500 THB/Hour
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
      )}

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
