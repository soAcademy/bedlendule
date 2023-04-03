import axios from "axios";
import { useState } from "react";

export const useCreateSchedule = ({
  newTimeSlots,
  setPopupState,
  formData,
  setFormData,
  setSending,
  setNewTimeSlots,
  setSubmitFailPopUp,
  setSubmitSuccessPopUp,
  setDatePickerDisabled,
  clearTimeslotInput,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      title: form["title"].value,
      description: form["description"].value,
      meetingType: form["online"].checked ? "ONLINE" : "OFFLINE",
      location: form["location"].value,
      timeslots: newTimeSlots,
    };
    setFormData(data);
    setPopupState(true);
  };
  const submitForm = () => {
    setPopupState(false);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/createSchedule",
      headers: {
        "Content-Type": "application/json",
        'authorization': localStorage.getItem('access-token')
      },
      data: formData,
    };
    console.log(config)
    setSending(true);

    axios
      .request(config)
      .then((response) => {
        document.querySelector("#create-schedule").reset();
        clearTimeslotInput();
        setNewTimeSlots([]);
        setDatePickerDisabled(false);
        setSending(false);
        setFormData()
        response.status === 200
          ? setSubmitSuccessPopUp(true)
          : setSubmitFailPopUp(true);
      })
      .catch((error) => {
        console.log("error", error);
        setSending(false);
        setSubmitFailPopUp(true);
      });
  };

  return { handleSubmit, submitForm };
};

export const useAddOrRemoveTimeSlot = ({
  timeSlots,
  newTimeSlots,
  idxToDelete,
  setNewTimeSlots,
  finishTime,
  startTime,
  date,
  price,
  setPrice,
  setOpenTimeSlotForm,
  setDatePickerDisabled,
}) => {
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [duplicatedTime, setDuplicatedTime] = useState(false);
  const removeTimeslot = () => {
    const _newTimeSlots = newTimeSlots.filter((e, idx) => idx !== idxToDelete);
    setNewTimeSlots(_newTimeSlots);
    setConfirmRemove(false);
    _newTimeSlots.length === 0 && setDatePickerDisabled(false);
  };

  const addTimeSlot = () => {
    const duration = finishTime.getTime() - startTime.getTime();
    const _date = date.toLocaleDateString("en");
    console.log('_date', _date)
    const _startTime = new Date(
      _date +
        " " +
        startTime.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
    );
    console.log(_startTime)
    const _finishTime = new Date(_startTime.getTime() + duration);
    const newAddingTimeSlot = {
      startTime: _startTime.toISOString(),
      finishTime: _finishTime.toISOString(),
      price: Number(price),
    };
    if (
      newTimeSlots.findIndex(
        (timeslot) =>
          (_startTime >= new Date(timeslot.startTime) &&
            _startTime < new Date(timeslot.finishTime)) ||
          (_finishTime <= new Date(timeslot.finishTime) &&
            _finishTime > new Date(timeslot.startTime)) ||
          (_finishTime >= new Date(timeslot.finishTime) &&
            _startTime <= new Date(timeslot.startTime))
      ) !== -1 ||
      timeSlots.findIndex(
        (timeslot) =>
          (_startTime >= new Date(timeslot.startTime) &&
            _startTime < new Date(timeslot.finishTime)) ||
          (_finishTime <= new Date(timeslot.finishTime) &&
            _finishTime > new Date(timeslot.startTime)) ||
          (_finishTime >= new Date(timeslot.finishTime) &&
            _startTime <= new Date(timeslot.startTime))
      ) !== -1
    ) {
      setDuplicatedTime(true);
      setTimeout(() => setDuplicatedTime(false), 3000);
    } else {
      const _timeslots = [
        ...new Map([
          ...newTimeSlots.map((item) => [item["startTime"], item]),
          [newAddingTimeSlot["startTime"], newAddingTimeSlot],
        ]).values(),
      ];
      setPrice();
      setNewTimeSlots(_timeslots);
      setOpenTimeSlotForm(false);
      setDatePickerDisabled(true);
    }
  };
  return {
    addTimeSlot,
    removeTimeslot,
    setConfirmRemove,
    confirmRemove,
    duplicatedTime,
  };
};
