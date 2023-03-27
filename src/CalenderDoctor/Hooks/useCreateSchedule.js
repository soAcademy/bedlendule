import axios from "axios";
import { useState } from "react";

export const useCreateSchedule = ({
  newTimeSlots,
  setPopupState,
  formData,
  setFormData,
  setSending,
  setStartTime,
  setFinishTime,
  setPrice,
  setDate,
  setNewTimeSlots,
  setSubmitFailPopUp,
  setSubmitSuccessPopUp,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const doctorUUID = "d3d7e1bc-fa8a-48e5-9617-7970d60fb15b";
    const form = event.target;
    console.log('form', form["description"])
    const data = {
      uuid: doctorUUID,
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
      },
      data: formData,
    };
    setSending(true);

    axios
      .request(config)
      .then((response) => {
        document.querySelector("#create-schedule").reset();
        setStartTime(
          new Date(
            new Date(new Date().toLocaleDateString()).getTime() +
              1800000 * Math.ceil(new Date().getMinutes() / 30) +
              3600000 * (new Date().getHours() + 1)
          )
        );
        setFinishTime(
          new Date(
            new Date(new Date().toLocaleDateString()).getTime() +
              1800000 * (1 + Math.ceil(new Date().getMinutes() / 30)) +
              3600000 * (new Date().getHours() + 1)
          )
        );
        setPrice();
        setDate();
        setNewTimeSlots([]);
        setSending(false);
        response.status === 200
          ? setSubmitSuccessPopUp(true)
          : setSubmitFailPopUp(true);
      })
      .catch((error) => {
        console.log('error', error)
        setSending(false);
        setSubmitFailPopUp(true);
      });
  };

  return { handleSubmit, submitForm };
};

export const useAddOrRemoveTimeSlot = ({
  newTimeSlots,
  idxToDelete,
  setNewTimeSlots,
  finishTime,
  startTime,
  date,
  price,
  setPrice,
  setOpenTimeSlotForm,
}) => {
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [datePickerDisabled, setDatePickerDisabled] = useState(false);
  const [duplicatedTime, setDuplicatedTime] = useState(false);
  const removeTimeslot = () => {
    const _newTimeSlots = newTimeSlots.filter((e, idx) => idx !== idxToDelete);
    setNewTimeSlots(_newTimeSlots);
    setConfirmRemove(false);
    _newTimeSlots.length === 0 && setDatePickerDisabled(false);
  };

  const addTimeSlot = () => {
    const duration = finishTime.getTime() - startTime.getTime();
    const _date = date.toLocaleDateString();
    const _startTime = new Date(
      _date +
        " " +
        startTime.toLocaleTimeString("en-GB").split(" ")[0].slice(0, 5)
    );
    const _finishTime = new Date(_startTime.getTime() + duration);
    const newAddingTimeSlot = {
      startTime: _startTime.toISOString(),
      finishTime: _finishTime.toISOString(),
      price: Number(price),
    };
    if (
      newTimeSlots.findIndex(
        (timeslot) =>
          _startTime >= new Date(timeslot.startTime) &&
          _startTime < new Date(timeslot.finishTime)
      ) !== -1 ||
      newTimeSlots.findIndex(
        (timeslot) =>
          _finishTime <= new Date(timeslot.finishTime) &&
          _finishTime > new Date(timeslot.startTime)
      ) !== -1 ||
      newTimeSlots.findIndex(
        (timeslot) =>
          _finishTime >= new Date(timeslot.finishTime) &&
          _startTime <= new Date(timeslot.startTime)
      ) !== -1
    ) {
      setDuplicatedTime(true);
      setTimeout(() => setDuplicatedTime(false), 5000);
    } else {
      console.log("newTimeSlots[0].startTime", newTimeSlots[0]);
      const _timeslots = [
        ...new Map([
          ...newTimeSlots.map((item) => [item["startTime"], item]),
          [newAddingTimeSlot["startTime"], newAddingTimeSlot],
        ]).values(),
      ];
      console.log("_timeslots", _timeslots);
      setNewTimeSlots(_timeslots);
      setOpenTimeSlotForm(false);
      setDatePickerDisabled(true);
      setPrice();
    }
  };
  return {
    addTimeSlot,
    removeTimeslot,
    datePickerDisabled,
    setConfirmRemove,
    confirmRemove,
    duplicatedTime,
  };
};
