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

const SelectDoctor = () => {
  usePatientCalendarProps();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [openDoctorDetail, setOpenDoctorDetail] = useState(false);
  const [page, setPage] = useState("doctorLists"); // อย่าลืมเปลี่ยน doctorLists
  const [fetching, setFetching] = useState(false);
  const [selectDate,setSelectDate] = useState();

  const { date } = useParams();
  const { disabledDates, dateTemplate } = useContext(DisabledatesContext);
  const redirect = useNavigate();

  const transformDate = (date) => {
    const buddhistDate = date;
    const [day, month, year] = buddhistDate.split("-");
    const gregorianYear = parseInt(year) - 543;
    const gregorianDate = `${gregorianYear}-${month}-${day}`;

    return gregorianDate;
  };

  const findFreeDoctor = (allDoctors) => {
    const findRequestNull = allDoctors.map((allDoctors) =>
      allDoctors.timeslots.filter((timeslots) => timeslots.requestId === null)
    );

    const findIndexOfRequestNull = findRequestNull
      .map((r, idx) => (r.length !== 0 ? idx : -1))
      .filter((r) => r > 0);

    const freeDoctor = findIndexOfRequestNull.map((index) => allDoctors[index]);
    return freeDoctor;
  };

  useEffect(() => {
    setDoctors([]);
    setFetching(true);
    const _date = transformDate(date);
    setSelectDate(_date)
    const data = JSON.stringify({ date: _date });
    console.log("data", data);
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
        console.log(response.data);
        const _data = findFreeDoctor(response.data);
        console.log("freeDoctor", _data);
        setDoctors(_data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [date]);

  return (
    <>
      <div>
        <button
          className="top-13 absolute right-4 z-40 w-10 rounded-lg border px-1 text-2xl font-light text-slate-400 shadow-md hover:bg-slate-100"
          onClick={() => redirect("/schedule/")}
        >
          <IoIosReturnLeft className="" />
        </button>
        <div className="headingColor relative mt-8 text-center text-3xl font-bold ">
          SELECT DOCTOR
        </div>
        <div className="m-4">
          <p>FILTER DATE</p>
          <Calendar
            placeholder="Select date"
            className="z-0 w-1/2 rounded-lg border-2 md:w-8/12"
            value={date}
            disabledDates={disabledDates?.map((e) => new Date(e))}
            onChange={(e) => {
              redirect(
                `../schedule/selectDoctor/${e.value
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
                    doctor.doctorUUID.reviews.reduce(
                      (acc, r) => acc + r.score,
                      0
                    ) / doctor.doctorUUID.reviews.map((r) => r.score).length
                  }
                  start={5}
                  cancel={false}
                />
            </div>
            <div className="p-2 text-[#4C4E64]">{doctor.description}</div>
          </div>
        ))}
      </div>

      <div
        className={`mt-4 p-2 opacity-0 duration-200 ${
          openDoctorDetail ? "opacity-100" : "pointer-events-none opacity-0"
        } `}
      >
        <SelectDoctorDetail
          setOpenDoctorDetail={setOpenDoctorDetail}
          selectedDoctor={selectedDoctor}
          selectDate={selectDate}
        />
      </div>
    </>
  );
};
export default SelectDoctor;
