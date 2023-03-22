import { Calendar } from "primereact/calendar";
import React, { useState } from "react";
const DateTimePickerForm = ({ fromTime, setFromTime, toTime, setToTime }) => {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <div className="mx-auto flex w-full flex-col">
        DATE
        <Calendar
          readOnlyInput
          minDate={new Date()}
          id="date"
          value={date}
          onChange={(e) => setDate(e.value)}
          showButtonBar
          className="mx-auto w-[120px] rounded-lg border-2 border-slate-200"
          placeholder="dd/mm/yyyy"
        ></Calendar>
      </div>
      <div className="">
        From
        <Calendar
                              id="fromTime"
                              inputId="start-time"
                              readOnlyInput
                              timeOnly
                              showButtonBar
                              hourFormat="12"
                              stepMinute={30}
                              value={fromTime}
                              appendTo={"self"}
                              onChange={(e) => {
                                (e.value?.getTime() >= toTime?.getTime() ||
                                  (!toTime && e.value)) &&
                                  setToTime(
                                    new Date(e.value.getTime() + 1800000)
                                  );
                                setFromTime(e.value);
                              }}
                              className="w-[90px] rounded-lg border-2 bg-slate-900 text-center "
                              placeholder="From"
                            ></Calendar>
      </div>
      <div className="">
        To
        <Calendar
                              id="toTime"
                              inputId="finish-time"
                              readOnlyInput
                              timeOnly
                              showButtonBar
                              hourFormat="12"
                              stepMinute={30}
                              value={toTime}
                              minDate={fromTime}
                              onChange={(e) => setToTime(e.value)}
                              className="w-[90px] rounded-lg border-2 bg-slate-900 text-center"
                              placeholder="To"
                            ></Calendar>
      </div>
    </>
  );
};
export default DateTimePickerForm;
