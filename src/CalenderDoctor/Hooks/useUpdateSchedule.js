import React, { useState, useEffect } from "react";
import axios from "axios";
const useUpdateSchedule = ({
  idxToDelete,
  newTimeSlots,
  setNewTimeSlots,
  setConfirmRemove,
  toTime,
  fromTime,
  scheduleToEdit,
  price,
  setDuplicatedTime,
  setOpenTimeSlotForm,
  setSending,
  setUpdated,
  updated,
  setSubmitFailPopUp,
  setSubmitSuccessPopup,
}) => {
  const [removingTimeSlotIds, setRemovingTimeSlotIds] = useState([]);
  const removeTimeslot = (timeslot) => {
    const _newTimeSlots = newTimeSlots.filter((e, edx) => idxToDelete !== edx);
    setRemovingTimeSlotIds([...new Set([...removingTimeSlotIds, timeslot.id])]);
    setNewTimeSlots(_newTimeSlots);
    setConfirmRemove(false);
  };

  const addTimeSlot = () => {
    const duration = toTime.getTime() - fromTime.getTime();
    const date = scheduleToEdit.timeslots[0].startTime.split("T")[0];
    const _startTime = new Date(
      date +
        " " +
        fromTime.toLocaleTimeString().split(" ")[0].slice(0, 6) +
        "00 " +
        fromTime.toLocaleTimeString().split(" ")[1]
    );
    const _finishTime = new Date(_startTime.getTime() + duration);
    const newAddingTimeSlot = {
      startTime: _startTime.toISOString(),
      finishTime: _finishTime.toISOString(),
      price: Number(price),
    };
    if (
      newTimeSlots.findIndex(
        (timeslot) => timeslot.startTime === _startTime.toISOString()
      ) === -1
    ) {
      const _timeslots = [
        ...new Map([
          ...newTimeSlots.map((item) => [item["startTime"], item]),
          [newAddingTimeSlot["startTime"], newAddingTimeSlot],
        ]).values(),
      ];
      setNewTimeSlots(_timeslots);
      setOpenTimeSlotForm(false);
    } else {
      setDuplicatedTime(true);
      setTimeout(() => setDuplicatedTime(false), 3000);
    }
  };

  const updateSchedule = () => {
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
      },
      data: data,
    };
    setSending(true);
    axios
      .request(config)
      .then((response) => {
        setRemovingTimeSlotIds([]);
        setUpdated(!updated);
        setSending(false);
        setSubmitSuccessPopup(true);
      })
      .catch((error) => {
        setSending(false);
        setSubmitFailPopUp(true);
      });
  };
  return { updateSchedule, addTimeSlot, removeTimeslot };
};

export default useUpdateSchedule;
