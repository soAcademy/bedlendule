import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { DisabledatesContext } from "../home";
const useDoctorCalendarProps = () => {
  const {
    dateTemplate,
    disabledDates,
    setDisabledDates,
    datesArray,
    timeSlots,
    setTimeSlots,
  } = useContext(DisabledatesContext);
  const doctorUUID = localStorage.getItem("doctorUUID");
  useEffect(() => {
    var config = {
      method: "post",
      url: "https://bedlendule-backend.vercel.app/bedlendule/getOpeningRequests",
      headers: {},
    };

    axios(config)
      .then(function async(response) {
        const timeSlotsNotAccepted = response.data.filter(
          (request) =>
            request.doctorTimeslot.findIndex(
              (timeslot) => timeslot.schedule.uuid === doctorUUID
            ) === -1
        );
        setTimeSlots(
          timeSlotsNotAccepted.map((e) =>
            new Date(e.startTime).toLocaleDateString("en")
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const _disabledDates = datesArray.filter((e) => !timeSlots.includes(e));
    setDisabledDates(_disabledDates);
  }, [timeSlots, datesArray]);

  return { timeSlots, setTimeSlots, dateTemplate, disabledDates };
};

export default useDoctorCalendarProps;
