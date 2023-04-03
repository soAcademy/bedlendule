import axios from "axios";
import { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { ProgressSpinner } from "primereact/progressspinner";
import SelectDoctorDetail from "./SelectedDoctorDetail";
import { IoIosReturnLeft } from "react-icons/io";
import { Calendar } from "primereact/calendar";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { DisabledatesContext } from "../home";
import usePatientCalendarProps from "../Hooks/usePatientCalendarProps";

const useGetdoctors = ({ date }) => {
  const [doctors, setDoctors] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [selectDate, setSelectDate] = useState();
  const [openDoctorDetail, setOpenDoctorDetail] = useState(false);

  const findFreeDoctor = (allDoctors) => {
    const findRequestNull = allDoctors.map((allDoctors) =>
      allDoctors.timeslots.filter((timeslots) => timeslots.requestId === null)
    );
    const findIndexOfRequestNull = findRequestNull
      .map((r, idx) => (r.length !== 0 ? idx : -1))
      .filter((r) => r >= 0);

    const freeDoctor = findIndexOfRequestNull.map((index) => allDoctors[index]);
    return freeDoctor;
  };

  useEffect(() => {
    setDoctors([]);
    setFetching(true);
    setSelectDate(new Date(date).toISOString());
    const data = JSON.stringify({ date: new Date(date).toISOString() });
    // console.log("data>>", data);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getScheduleByDate",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setFetching(false);
        const _data = findFreeDoctor(response.data);
        setDoctors(_data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [date]);

  return {
    doctors,
    setDoctors,
    fetching,
    setFetching,
    selectedDoctor,
    setSelectedDoctor,
    selectDate,
    setSelectDate,
    openDoctorDetail,
    setOpenDoctorDetail,
  };
};

const SelectDoctor = () => {
  usePatientCalendarProps();
  const { date } = useParams();
  const {
    doctors,
    fetching,
    selectedDoctor,
    setSelectedDoctor,
    selectDate,
    openDoctorDetail,
    setOpenDoctorDetail,
  } = useGetdoctors({ date });
  const { disabledDates, dateTemplate } = useContext(DisabledatesContext);
  const redirect = useNavigate();

  console.log("doctors", doctors);
  return (
    <>
      <button
        className="absolute top-0 right-0 z-20 m-2 flex w-10 justify-center rounded-full p-2 px-1 text-2xl text-slate-400 hover:bg-red-500 hover:text-slate-50 hover:opacity-50 md:m-4"
        onClick={() => redirect("/schedule/")}
      >
        <IoIosReturnLeft />
      </button>
      <div className="headingColor relative mt-8 text-center text-3xl font-bold ">
        SELECT DOCTOR
      </div>
      <div className="m-4">
        <p>FILTER DATE</p>
        <Calendar
          placeholder="Select date"
          className="z-0 w-2/3 rounded-lg border-2"
          value={date}
          disabledDates={disabledDates?.map((e) => new Date(e))}
          onChange={(e) => {
            redirect(
              `../schedule/selectDoctor/${e.value
                .toLocaleDateString("en")
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

      {doctors.map((doctor) => (
        <div
          className="mx-auto my-4 flex w-[90%] cursor-pointer flex-col rounded-lg border-2 border-slate-400 bg-[#F0F3EC] p-4 hover:bg-[#C5E1A5]"
          onClick={() => {
            setSelectedDoctor(doctor);
            setOpenDoctorDetail(true);
          }}
        >
          <div className="flex justify-between">
            <div className="font-bol w-[60%] text-xl text-[#666CFF]">
              {doctor.doctorUUID.firstName}&nbsp; {doctor.doctorUUID.lastName}
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
              value={
                doctor.doctorUUID.reviews.reduce((acc, r) => acc + r.score, 0) /
                doctor.doctorUUID.reviews.map((r) => r.score).length
              }
              start={5}
              cancel={false}
            />
          </div>
          <div className="p-2 text-[#4C4E64]">{doctor.description}</div>
        </div>
      ))}

      <SelectDoctorDetail
        openDoctorDetail={openDoctorDetail}
        setOpenDoctorDetail={setOpenDoctorDetail}
        selectedDoctor={selectedDoctor}
        selectDate={selectDate}
      />
    </>
  );
};
export default SelectDoctor;
