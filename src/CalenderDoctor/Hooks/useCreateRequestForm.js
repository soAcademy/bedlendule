import React, { useState, useEffect, useContext } from "react";
import { ConfirmPopupContext } from "../home";
import axios from "axios";

const useCreateRequest= ({setSending, setFromTime,setToTime, setSubmitFailPopUp,setSubmitSuccessPopup}) => {
  const { confirmPopupToggle, setConfirmPopupToggle } =
    useContext(ConfirmPopupContext);
  const [formData, setFormData] = useState();
  const patientUUID = "b380f399-2800-4423-bd93-435eb1b5858e";
  const handleSubmit = (event) => {
    event.preventDefault();
    setConfirmPopupToggle(true);
    const form = event.target;
    const startTime = new Date(form[0].value + " " + form[1].value);
    const finishTime = new Date(form[0].value + " " + form[2].value);
    const data = {
      title: form.title.value,
      description: form.description.value,
      price: Number(form.hourRate.value),
      problemType: form.problemType.value.replace(/\s+/g, "_"),
      meetingType: form.meetingType.value,
      location: form.location.value,
      startTime: startTime.toISOString(),
      finishTime: finishTime.toISOString(),
      patientUUID: patientUUID,
    };
    setFormData(data);
  };
  const submitForm = () => {
    setConfirmPopupToggle(false);
    setSending(true);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/createRequest",
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        document.querySelector("#create-request").reset();
        setFromTime();
        setToTime();
        setSending(false);
        response.status === 200
          ? setSubmitSuccessPopup(true)
          : setSubmitFailPopUp(true);
      })
      .catch((error) => {
        setSending(false);
        setSubmitFailPopUp(true);
      });
  };

  return {handleSubmit,submitForm}
};

export default useCreateRequest
