import { Calendar } from "primereact/calendar";
export const DatePicker = ({
  label,
  className,
  date,
  handleDateChange,
  disabled,
}) => (
  <>
    {label}
    <Calendar
      disabled={disabled}
      tabIndex={-1}
      readOnlyInput
      minDate={new Date()}
      id="date"
      value={date}
      onChange={handleDateChange}
      showButtonBar
      className={`${className} rounded-lg border-2 text-center`}
      placeholder="dd/mm/yyyy"
    ></Calendar>
  </>
);
export const StartTimePicker = ({
  label,
  className,
  startTime,
  handleStartTimeChange,
}) => (
  <>
    {label}
    <Calendar
      id="startTime"
      inputId="start-time"
      readOnlyInput
      tabIndex={-1}
      timeOnly
      showButtonBar
      hourFormat="12"
      stepMinute={30}
      value={startTime}
      onChange={handleStartTimeChange}
      className={`${className} rounded-lg border-2 text-center`}
      placeholder="From"
    ></Calendar>
  </>
);
export const FinishTimePicker = ({
  label,
  className,
  finishTime,
  handleFinishTimeChange,
}) => (
  <>
    {label}
    <Calendar
    tabIndex={-1}
      id="finishTime"
      inputId="finish-time"
      readOnlyInput
      timeOnly
      showButtonBar
      hourFormat="12"
      stepMinute={30}
      value={finishTime}
      onChange={handleFinishTimeChange}
      className={`${className} rounded-lg border-2 text-center`}
      placeholder="To"
    ></Calendar>
  </>
);
