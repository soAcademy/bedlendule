import React, { useState } from "react";
import axios from "axios";
import useSendingPopup from "./useSendingPopup";
import useSubmitResult from "./useSubmitResult";
const useUpdateSchedule = ({
  idxToDelete,
  newTimeSlots,
  setNewTimeSlots,
  setConfirmRemove,
  finishTime,
  startTime,
  scheduleToEdit,
  price,
  setOpenTimeSlotForm,
  setUpdated,
  updated,
  setPrice,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [removingTimeSlotIds, setRemovingTimeSlotIds] = useState([]);
  const [duplicatedTime, setDuplicatedTime] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const { setSending, SendingPopup } = useSendingPopup();
  const closeEditPanel = () => {
    setIsEditOpen(false);
    setConfirmSubmit(false);
  };
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopup } =
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
    const date = scheduleToEdit.timeslots[0].startTime.split("T")[0];
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
      setNewTimeSlots(_timeslots);
      setOpenTimeSlotForm(false);
      setPrice();
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
  return {
    removeTimeslot,
    addTimeSlot,
    updateSchedule,
    duplicatedTime,
    SendingPopup,
    isEditOpen,
    setIsEditOpen,
    ResultPopup,
    confirmSubmit,
    setConfirmSubmit,
  };
};

export default useUpdateSchedule;
