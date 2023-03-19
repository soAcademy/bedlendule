import React, { useState, useEffect } from "react";
import axios from "axios";
const useUserCalendarProps = () => {
  const [date, setDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  const dateTemplate = (date) => {
    if (
      timeSlots?.findIndex(
        (timeslot) => new Date(timeslot.startTime).getDate() === date.day
      ) !== -1 &&
      date.day >= new Date().getDate()
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

  useEffect(() => {
    var config = {
      method: "post",
      url: "http://localhost:5555/bedlendule/getAllTimeSlots",
      headers: {},
    };

    axios(config)
      .then(function async(response) {
        setTimeSlots(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return { date, setDate, timeSlots, setTimeSlots, dateTemplate };
};

export default useUserCalendarProps;
