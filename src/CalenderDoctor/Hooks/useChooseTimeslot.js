import axios from "axios";
import React, { useState, useEffect } from "react";

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
    console.log("scheduleBy UUID and Date...");
    console.log("scheduleBy fetch ", fetch);
    setLoading(true);
    const data = JSON.stringify({
      uuid: selectedDoctor.doctorUUID?.uuid,
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

export default useChooseTimeSlot;