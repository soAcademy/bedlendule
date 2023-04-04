import React, { useState } from "react";
import axios from "axios";
import useSendingPopup from "./useSendingPopup";
import useSubmitResult from "./useSubmitResult";
const useUpdateSchedule = ({
  idxToDelete,
  timeSlots,
  newTimeSlots,
  setNewTimeSlots,
  setConfirmRemove,
  finishTime,
  startTime,
  scheduleToEdit,
  scheduleToDelete,
  setScheduleToDelete,
  price,
  setOpenTimeSlotForm,
  setOpenDelete,
  setUpdated,
  updated,
  setPrice,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [removingTimeSlotIds, setRemovingTimeSlotIds] = useState([]);
  const [duplicatedTime, setDuplicatedTime] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const { setSending, SendingPopup } = useSendingPopup();
  const closeEditPanel = () => {
    setOpenEdit(false);
    setConfirmSubmit(false);
  };
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopUp } =
    useSubmitResult({
      successAction: closeEditPanel,
      failedAction: closeEditPanel,
    });

  const removeTimeslot = (timeslot) => {
    const _newTimeSlots = newTimeSlots.filter((e, edx) => idxToDelete !== edx);
    setRemovingTimeSlotIds([...new Set([...removingTimeSlotIds, timeslot.id])]);
    setNewTimeSlots(_newTimeSlots);
    setConfirmRemove(false);
  };

  const addTimeSlot = () => {
    const duration = finishTime.getTime() - startTime.getTime();
    const date = new Date(scheduleToEdit.timeslots[0].startTime).toLocaleDateString("en");
    const _startTime = new Date(
      date +
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
      setTimeout(() => setDuplicatedTime(false), 5000);
    } else {
      const _timeslots = [
        ...new Map([
          ...newTimeSlots.map((item) => [item["startTime"], item]),
          [newAddingTimeSlot["startTime"], newAddingTimeSlot],
        ]).values(),
      ];
      setNewTimeSlots(_timeslots);
      setOpenTimeSlotForm(false);
      setPrice();
    }
  };

  const updateSchedule = () => {
    setSending(true);
    setConfirmSubmit(false)
    let data = JSON.stringify({
      scheduleId: scheduleToEdit.id,
      addingTimeSlots: newTimeSlots.filter((timeslot) => !timeslot.id),
      removingTimeSlots: removingTimeSlotIds.filter((e) => !!e),
      title: scheduleToEdit.title,
      meetingType: scheduleToEdit.meetingType,
      location: scheduleToEdit.location,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/updateSchedule",
      headers: {
        "Content-Type": "application/json",
        'authorization': localStorage.getItem('access-token')
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response)
        setRemovingTimeSlotIds([]);
        setUpdated(!updated);
        setSending(false);
        setOpenEdit(false)
        setSubmitSuccessPopUp(true);
      })
      .catch((error) => {
        console.log("error", error);
        setSending(false);
        setSubmitFailPopUp(true);
      });
  };

  const deleteSchedule = () => {
    setOpenDelete(false)
    setSending(true)
    let data = JSON.stringify({
      "scheduleId": scheduleToDelete
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://bedlendule-backend.vercel.app/bedlendule/deleteSchedule?',
      headers: { 
        'Authorization': localStorage.getItem('access-token'), 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setScheduleToDelete()
      setSending(false)
      setUpdated(!updated)
      setSubmitSuccessPopUp(true);
    })
    .catch((error) => {
      console.log(error);
      setSending(false)
      setSubmitFailPopUp(true)
    });
    
  }
  return {
    removeTimeslot,
    addTimeSlot,
    updateSchedule,
    duplicatedTime,
    SendingPopup,
    openEdit,
    setOpenEdit,
    ResultPopup,
    confirmSubmit,
    setConfirmSubmit,
    deleteSchedule
  };
};

export default useUpdateSchedule;
