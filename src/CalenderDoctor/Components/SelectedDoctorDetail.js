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

const SelectDoctorDetail = ({ selectedDoctor, setOpenDoctorDetail }) => {
  const [chooseTimeSlot, setChooseTimeSlot] = useState([]);
  const [appointmentPopup, setAppointmentPopup] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState([]);
  const [loading, setLoading] = useState();
  const [doctorName, setDoctorName] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [location, setLocation] = useState([]);
  const redirect = useNavigate();

  
  const chosenDate = new Date(date);
  const patientUUID = "9ab93e34-b805-429d-962a-c723d8d8bca8";
 

  const scoreFromReview =
    selectedDoctor?.doctorUUID?.reviews?.reduce((acc, r) => acc + r.score, 0) /
    selectedDoctor?.doctorUUID?.reviews?.map((r) => r.score).length;

  // console.log("chosenDate", chosenDate);
  // console.log("selectedDoctor<>", selectedDoctor);
  // console.log("dataFormState", dataForm);
  // console.log("chosenTestDate", chosenTestDate);
  // console.log("SelectedDoctorDetails...");
  // console.log("UUID:", selectedDoctor.doctorUUID?.uuid);
  // get doctor detail by UUID
  useEffect(() => {
    const _data = JSON.stringify({
      uuid: selectedDoctor.doctorUUID?.uuid,
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
    setLoading(true);

    axios(config).then((response) => {
      setLoading(false);
      console.log("response.data...", response.data);
      setDoctorDetail(response.data);
      setDoctorName(selectedDoctor.doctorUUID);
    });
  }, [selectedDoctor]);

  // get ScheduleBy UUID
  useEffect(() => {
    const _data = JSON.stringify({
      uuid: selectedDoctor.doctorUUID?.uuid,
    });
    console.log("UUID data", _data);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getScheduleByUUID",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("access-token"),
      },
      data: _data,
    };
    axios(config).then((response) => {
      // ได้ schedule ทั้งหมดของหมอ 1 คน 
      console.log("ScheduleByUUID response.data:", response.data);
      // เอาไปเข้า function เพื่อ filter หาเวลาที่ว่าง 
      tranformData(response.data);
    });
  }, [selectedDoctor]);

  //find index of scheduled which has timeslot(requestNull)
  const findindexOfSchedules = (schedules) => {
    const findRequestNull = selectedDoctor.timeslots
      ?.filter((timeslots) => timeslots.requestId === null)
      .map((r) => r.id);
    console.log("requestNullId", requestNullId);
    // เอา index of request null Id มา map เอา location,meetingType เก็บแบบ array
    const inputRequestId = (InputRequestNullId) => {
      const a = InputRequestNullId.map((c, idx) =>
        schedules.map((r) => r.timeslots.filter((r) => r.id === c))
      );
      const b = a.map((r) => r.findIndex((c) => c.length > 0));
      const mapId = a.map((r) => {
        return { data: r.filter((r) => r.length > 0) };
      });

      const requestAndLocationId = b.map((r) =>
        mapId.map((timeData) => {
          return { timeData, locationId: r };
        })
      );
      const cleanData = requestAndLocationId[0].map((r) => {
        return { location: r.locationId, reqeustData: r.timeData.data[0] };
      });
      console.log("cleanData<>", cleanData);
      const pickDateFilter = cleanData.map((r) =>
        r.reqeustData.map((c,idx) => {
          console.log("startTime +idx",idx,c.startTime.substring(8,10))
          console.log("chosenDate:",chosenDate);
          // console.log("startTime: ",new Date(c.startTime.substring(0,19)));
          const dateType = new Date(c.startTime.substring(0,19));
          console.log("dateType: ",dateType);
          console.log("typeAll",typeof chosenDate);
        
          return dateType >= chosenDate;
        })
      );
      console.log("pickDateFilter", pickDateFilter);

      const findIndex = pickDateFilter
        .map((r, idx) => r.map((r) => (r === true ? idx : null)))
        .flat();
      console.log("findIndex", findIndex);
      const currentSlotTime = findIndex.map((index) => cleanData[index]);
      console.log("currentSlotTime", currentSlotTime);

     
      const readyData = currentSlotTime.filter((r) => r !== undefined);

      console.log("readyData", readyData);

      const dataForm2 = readyData.map((r) => {
        return {
          description: schedules[r.location].description,
          location: schedules[r.location].location,
          meetingType: schedules[r.location].meetingType,
          timeslotId: r.reqeustData
            .map((r) => r.id)
            .slice(0, 1)
            .pop(),
          patientUUID: patientUUID,
          startTime: r.reqeustData.map((r) => r.startTime).pop(),
          finishTime: r.reqeustData.map((r) => r.finishTime).pop(),
          price: r.reqeustData.map((r) => r.price).pop(),
        };
      });
      console.log("dataForm2", dataForm2);
      return dataForm2;
    };
    return setDataForm(inputRequestId(requestNullId));
  };

  return (
    <div className="shader">
      <div className="popup flex flex-col w-full">
        <button
          className="top-13 absolute right-4 z-40 w-10 px-1 text-2xl font-light text-slate-400 hover:text-slate-300"
          onClick={() => setOpenDoctorDetail(false)}
        >
          <MdClose className="" />
        </button>
        <div className="w-full text-center text-2xl">
          {selectedDoctor.doctorUUID?.firstName} &nbsp;{" "}
          {selectedDoctor.doctorUUID?.lastName}
        </div>

        <div className="mx-auto pt-2">
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
          {dataForm.map((r) => (
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
          ))}
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
    </div>
  );
};
export default SelectDoctorDetail;
