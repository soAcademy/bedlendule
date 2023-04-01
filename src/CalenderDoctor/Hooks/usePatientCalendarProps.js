import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { DisabledatesContext } from "../home";
import { useNavigate } from "react-router-dom";

const usePatientCalendarProps = () => {
  const [date, setDate] = useState(null);
  const {
    dateTemplate,
    disabledDates,
    setDisabledDates,
    datesArray,
    // setDatesArray,
    timeSlots,
    setTimeSlots,
  } = useContext(DisabledatesContext);

  useEffect(() => {
    var config = {
      method: "post",
      url: "https://bedlendule-backend.vercel.app/bedlendule/getAllTimeSlots",
      headers: {},
    };

    axios(config)
      .then(function async(response) {
        // console.log(response)
        const _timeslots = [
          ...new Set(
            response.data.map((e) => new Date(e.startTime).toLocaleDateString("en"))
          ),
        ];
        setTimeSlots(_timeslots);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const _disabledDates = datesArray.filter((e) => !timeSlots.includes(e));
    setDisabledDates(_disabledDates);
  }, [timeSlots, datesArray]);

  return {
    date,
    setDate,
    timeSlots,
    setTimeSlots,
    dateTemplate,
    datesArray,
    disabledDates,
  };
};

export default usePatientCalendarProps;
