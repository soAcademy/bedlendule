import React, { useState, useEffect } from "react";
import axios from "axios";

const usePatientCalendarProps = () => {
  const [date, setDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [datesArray, setDatesArray] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  useEffect(() => {
    var config = {
      method: "post",
      url: "https://bedlendule-backend.vercel.app/bedlendule/getAllTimeSlots",
      headers: {},
    };

    axios(config)
      .then(function async(response) {
        const _timeslots = [
          ...new Set(
            response.data.map((e) => new Date(e.startTime).toLocaleDateString())
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

  const dateTemplate = (date) => {
    const _date = new Date([date.year, +date.month + 1, date.day].join("-"));
    if (!datesArray.includes(_date.toLocaleDateString())) {
      const _datesArray = [
        ...new Set([...datesArray, _date.toLocaleDateString()]),
      ];
      setDatesArray(_datesArray);
    }
    if (
      timeSlots?.includes(_date.toLocaleDateString()) &&
      _date.getTime() >= new Date(new Date().toDateString()).getTime()
    ) {
      return date.day === new Date().getDate() ? (
        <div
          style={{
            backgroundColor: "#99B47B",
            color: "#ffffff",
            borderRadius: "50%",
            width: "4em",
            height: "4em",
            lineHeight: "4em",
            padding: 0,
            textAlign: "center",
          }}
        >
          {date.day}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#C5E1A5",
            color: "#ffffff",
            borderRadius: "50%",
            width: "3em",
            height: "3em",
            lineHeight: "3em",
            padding: 0,
            textAlign: "center",
          }}
        >
          {date.day}
        </div>
      );
    } else {
      return (
        <div
          className="bg-slate-200 text-slate-400"
          style={{
            borderRadius: "50%",
            width: "3em",
            height: "3em",
            lineHeight: "3em",
            padding: 0,
            textAlign: "center",
          }}
        >
          {date.day}
        </div>
      );
    }
  };

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
