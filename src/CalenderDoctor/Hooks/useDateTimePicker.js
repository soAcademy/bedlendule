import React, { useState } from "react";

const useDateTimepicker = () => {
  const [startTime, setStartTime] = useState(
    new Date(
      new Date(new Date().toLocaleDateString()).getTime() +
        1800000 * Math.ceil(new Date().getMinutes() / 30) +
        3600000 * (new Date().getHours() + 1)
    )
  );
  const [finishTime, setFinishTime] = useState(
    new Date(
      new Date(new Date().toLocaleDateString()).getTime() +
        1800000 * (Math.ceil(new Date().getMinutes() / 30) + 1) +
        3600000 * (new Date().getHours() + 1)
    )
  );
  const [date, setDate] = useState(new Date());
  const [isDateAvailable, setIsDateAvailable] = useState(true);

  const handleStartTimeChange = (e) => {
    if (e.value) {
      const _date =
        date?.toLocaleDateString() || new Date().toLocaleDateString();
      const _startTime = new Date(
        _date +
          " " +
          e.value.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
      );
      const _finishTime =
        finishTime &&
        new Date(
          _date +
            " " +
            finishTime.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
        );
      setStartTime(_startTime);
      (_startTime >= _finishTime || (!_finishTime && e.value)) &&
        setFinishTime(new Date(_startTime?.getTime() + 1800000));
      if (_startTime > new Date().getTime() + 3600000 || !date) {
        setIsDateAvailable(true);
      } else {
        setIsDateAvailable(false);
      }
    } else {
      setIsDateAvailable(true);
      setStartTime(e.value);
    }
  };

  const handleFinishTimeChange = (e) => {
    console.log(e)
    if (e.value) {
      const _date =
        date?.toLocaleDateString() || new Date().toLocaleDateString();
      const _startTime =
        startTime &&
        new Date(
          _date +
            " " +
            startTime.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
        );
      const _finishTime = new Date(
        _date +
          " " +
          e.value.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
      );
      setFinishTime(_finishTime);
      (_startTime >= _finishTime || (!_startTime && e.value)) &&
        setStartTime(new Date(_finishTime?.getTime() - 1800000));
      if (_startTime > new Date().getTime() + 3600000 || !date) {
        setIsDateAvailable(true);
      } else {
        setIsDateAvailable(false);
      }
    } else {
      setIsDateAvailable(true);
      setFinishTime(e.value);
    }
  };

  const handleDateChange = (e) => {
    if (e.value) {
      setDate(e.value);
      const _date = e.value?.toLocaleDateString();
      const _startTime = new Date(
        _date +
          " " +
          startTime?.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
      );
      if (_startTime > new Date().getTime() + 3600000 || !startTime) {
        setIsDateAvailable(true);
      } else {
        setIsDateAvailable(false);
      }
    } else {
      setIsDateAvailable(true);
      setDate(e.value);
    }
  };

  return {
    handleDateChange,
    handleStartTimeChange,
    handleFinishTimeChange,
    isDateAvailable,
    setIsDateAvailable,
    date,
    setDate,
    startTime,
    setStartTime,
    finishTime,
    setFinishTime,
  };
};
export default useDateTimepicker;
