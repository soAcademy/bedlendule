import axios from "axios";
import { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { ProgressSpinner } from "primereact/progressspinner";
import SelectDoctorDetail from "./SelectedDoctorDetail";
import { IoIosReturnLeft } from "react-icons/io";
import { Calendar } from "primereact/calendar";
import Appointment from "./Appointment";

const SelectDoctor = ({
  date,
  setInsidePage,
  setDate,
  disabledDates,
  dateTemplate,
}) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [page, setPage] = useState("doctorLists"); // อย่าลืมเปลี่ยน doctorLists
  const [fetching, setFetching] = useState(false);

  const findFreeDoctor = (freeDoctor) => {
    const filter = freeDoctor.map((doctor) =>
      doctor.timeslots.filter((timeslots) => timeslots.requestId === null)
    );
    console.log("filter", filter);
    const indexes = filter
      .map((r, idx) => (r.length >= 1 ? idx : -1))
      .filter((idx) => idx !== -1);

    const results = indexes.map((idx) => freeDoctor[idx]);

    return results;
  };

  useEffect(() => {
    setDoctors([]);
    setFetching(true);
    const data = JSON.stringify({ date: date });
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
        console.log("response.data", response.data);
        const _data = findFreeDoctor(response.data);
        console.log("_data", _data);
        setDoctors(_data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [date]);

  return (
    <>
      <div
        className={`mt-4 p-2 duration-200 ${
          page === "doctorLists"
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        } `}
      >
        <button
          className="fixed right-5 z-40 w-10 rounded-lg border px-1 text-2xl font-light text-slate-400 shadow-md hover:bg-slate-100"
          onClick={() => setInsidePage("patientSchedule")}
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
            className="z-0 w-1/2 rounded-lg border-2 md:w-8/12"
            value={date}
            disabledDates={disabledDates.map((e) => new Date(e))}
            onChange={(e) => {
              setDate(e.value.toLocaleDateString());
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
              setPage("doctorDetail");
            }}
          >
            <div className="flex ">
              <div className="font-bol w-[60%] text-xl text-[#666CFF]">
                {doctor.doctorUUID.firstName}&nbsp; {doctor.doctorUUID.lastName}
              </div>
              <div className="w-[20%] ">
                <Rating
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
            </div>
            <div className="text-[#4C4E64]">{doctor.description}</div>
          </div>
        ))}
      </div>

      <div
        className={`mt-4 p-2 opacity-0 duration-200 ${
          page === "doctorDetail"
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        } `}
      >
        <SelectDoctorDetail setPage={setPage} selectedDoctor={selectedDoctor} />
      </div>
    </>
  );
};
export default SelectDoctor;
