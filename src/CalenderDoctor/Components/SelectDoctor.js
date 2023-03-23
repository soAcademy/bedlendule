import axios from "axios";
import { useState, useEffect } from "react";
import { Rating } from "primereact/rating";

const SelectDoctor = () => {
  const [freeDoctor, setFreeDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const findFreeDoctor = (freeDoctor) => {
    const filter = freeDoctor.map((doctor) =>
      doctor.timeslots.filter((timeslots) => timeslots.requestId === null)
    );
    const indexes = filter
      .map((r, idx) => (r.length === 1 ? idx : -1))
      .filter((idx) => idx !== -1);
    const results = indexes.map((idx) => freeDoctor[idx]);
    console.log("results", results);

    return results;
  };

  useEffect(() => {
    const data = JSON.stringify({
      date: "2023-03-22",
    });

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
        const data = findFreeDoctor(response.data);
        setDoctors(data);
        console.log("data", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("doctors", doctors);

 
  return (
    <>
      <div className="mt-[70px]">
        <div className="headingColor text-center text-3xl font-bold">SELECT DOCTOR</div>

        {doctors.map((doctor) => (
          <div className="mx-auto my-4 flex w-[90%] flex-col rounded-lg border-2 border-slate-400 bg-[#F0F3EC] p-4">
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
    </>
  );
};
export default SelectDoctor;
