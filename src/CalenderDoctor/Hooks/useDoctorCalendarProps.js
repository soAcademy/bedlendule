import React, { useState, useEffect } from "react";
import axios from "axios";
const useDoctorCalendarProps = () => {
  const [date, setDate] = useState(null);
  const [openRequests, setOpenRequests] = useState([]);

  const dateTemplate = (date) => {
    if (
      openRequests?.findIndex(
        (request) => request.doctorTimeslot === null
      ) !== -1 &&
      date >= new Date()
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
      url: "http://localhost:5555/bedlendule/getOpeningRequests",
      headers: {},
    };

    axios(config)
      .then(function async(response) {
        setOpenRequests(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return { date, setDate, openRequests, setOpenRequests, dateTemplate };
};

export default useDoctorCalendarProps;
