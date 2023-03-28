import React, { useState, useEffect } from "react";
import axios from "axios";
const useDoctorCalendarProps = () => {
  const [openRequests, setOpenRequests] = useState([]);
  const [datesArray, setDatesArray] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  useEffect(() => {
    var config = {
      method: "post",
      url: "https://bedlendule-backend.vercel.app/bedlendule/getOpeningRequests",
      headers: {},
    };

    axios(config)
      .then(function async(response) {
        setOpenRequests(
          response.data.map((e) =>
            new Date(e.startTime).toLocaleDateString()
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const _disabledDates = datesArray.filter((e) => !openRequests.includes(e));
    setDisabledDates(_disabledDates);
  }, [openRequests, datesArray]);

  const dateTemplate = (date) => {
    const _date = new Date([date.year, +date.month + 1, date.day].join("-"));
    if (!datesArray.includes(_date.toLocaleDateString())) {
      const _datesArray = [
        ...new Set([...datesArray, _date.toLocaleDateString()]),
      ];
      setDatesArray(_datesArray);
    }
    if (
      openRequests.includes(_date.toLocaleDateString()) &&
      _date.getTime() >= new Date().getTime()
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
      return date.day;
    }
  };

  return { openRequests, setOpenRequests, dateTemplate, disabledDates };
};

export default useDoctorCalendarProps;
