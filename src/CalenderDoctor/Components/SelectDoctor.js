import axios from "axios";
import { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { ProgressSpinner } from "primereact/progressspinner";
import SelectDoctorDetail from "../Components/SelectorDoctorDetail";

const SelectDoctor = ({ date, setInsidePage }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [page, setPage] = useState("doctorLists");

  console.log("selectedDoctor", selectedDoctor);

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
    const data = JSON.stringify({ date: date.toString() });

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
        console.log("response.data", response.data);
        const _data = findFreeDoctor(response.data);
        console.log("_data", _data);
        setDoctors(_data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {page === "doctorLists" && (
        <div className="mt-[70px] ">
          <div className="headingColor relative text-center text-3xl font-bold ">
            SELECT DOCTOR
            <div
              className="absolute top-[-20px] right-5 cursor-pointer text-2xl font-light text-slate-400"
              onClick={() => setInsidePage("patientSchedule")}
            >
              x
            </div>
          </div>

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
                  {doctor.doctorUUID.firstName}&nbsp;{" "}
                  {doctor.doctorUUID.lastName}
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
      )}
      {page === "doctorDetail" && (
        <SelectDoctorDetail setPage={setPage} selectedDoctor={selectedDoctor} />
      )}
    </>
  );
};
export default SelectDoctor;
