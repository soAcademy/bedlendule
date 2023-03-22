import { useContext } from "react";
import ConfirmPopup from "./ConfirmPopup";
import { MdClose } from "react-icons/md";
import { ConfirmPopupContext } from "../home";
import { Calendar } from "primereact/calendar";
import { useState, useEffect } from "react";
import axios from "axios";
import DateTimePickerForm from "./DateTimePickerForm";
import { ProgressSpinner } from "primereact/progressspinner";

const CreateSchedule = ({ setOpenCreateRequest }) => {
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [formData, setFormData] = useState();
  const [submitSuccessPopUp, setSubmitSuccessPopup] = useState();
  const [submitFailPopUp, setSubmitFailPopUp] = useState();
  const [sending, setSending] = useState(false);
  const { confirmPopupToggle, setConfirmPopupToggle } =
    useContext(ConfirmPopupContext);

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

  const problemTypes = [
    "DEPRESSION",
    "PANIC DISORDER",
    "SCHIZOPHRENIA",
    "POST TRAUMATIC STRESS DISORDER",
    "BIPOLAR_DISORDER",
    "DEMENTIA",
    "PHOBIAS",
  ];

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

  return (
    <>
      <form id="create-request" onSubmit={handleSubmit}>
        <div className="min-h-11/12 relative mx-auto mt-[70px] w-[95%] rounded-lg bg-white p-6 font-kanit shadow-xl">
          <MdClose
            className="absolute right-4 cursor-pointer text-2xl text-slate-400 duration-150 hover:text-slate-300"
            onClick={() => setOpenCreateRequest(false)}
          />
          <p className="pt-4 text-center text-3xl font-bold text-slate-500">
            CREATE REQUEST
          </p>
          <div className="mx-auto my-6 flex gap-4 p-2 text-center text-slate-400">
            <DateTimePickerForm
              fromTime={fromTime}
              toTime={toTime}
              setFromTime={setFromTime}
              setToTime={setToTime}
            />
          </div>
          <div className="my-6 flex w-full items-center gap-2">
            <div className="w-1/2">
              <p className="headingColor text-center">Title</p>
              <input
                id="title"
                className="h-[40px] w-full rounded-lg border-2 border-slate-400 px-2"
                placeholder="Need Therapy"
              />
            </div>
            <div className="w-1/2">
              <p className="headingColor text-center">ประเภท</p>
              <select
                id="problemType"
                className="h-[40px] w-full rounded-lg border-2 border-slate-400 text-center text-[15px]"
              >
                {problemTypes.map((cause, idx) => (
                  <option className="" key={idx} value={cause}>
                    {cause}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <textarea
              id="description"
              className="h-[180px] w-[90%] rounded-lg border-2 border-slate-500 p-2"
              placeholder="What happen?"
            ></textarea>
          </div>
          <div className="my-4 flex items-center justify-center gap-2">
            <label for="online">ONLINE</label>
            <input
              type="radio"
              id="online"
              value="ONLINE"
              name="meetingType"
              className="mr-3"
            />
            <label for="offline">OFFLINE</label>
            <input
              type="radio"
              id="offline"
              value="OFFLINE"
              name="meetingType"
            />
          </div>
          <div className="flex w-full gap-4">
            <input
              id="location"
              name="location"
              className="h-[40px] w-1/2 rounded-lg border-2 border-slate-500 px-2"
              placeholder="Location"
              type=""
              required
            />
            <input
              id="hourRate"
              className="h-[40px] w-1/2 rounded-lg border-2 border-slate-500 px-2"
              placeholder="Hour rate"
              type="number"
              required
            />
          </div>
          <div className="mt-6 mb-2 flex">
            <button className="button mx-auto p-4 " type="submit">
              CREATE REQUEST
            </button>
          </div>
        </div>
        {
          <div
            className={`fixed top-0 left-0 right-0 z-50 h-full w-full 
        bg-slate-300 bg-opacity-10 backdrop-blur-[2px] duration-200
        ${!confirmPopupToggle ? "scale-0" : "scale-1"}`}
          >
            <ConfirmPopup
              title={"CREATE REQUEST"}
              description={"Do you want to create request?"}
              action={submitForm}
            />
          </div>
        }
      </form>
      <div
        className={`shader
        ${!sending ? "scale-0" : "scale-1"}`}
      >
        <div
          className={`popup
      ${sending ? "scale-1" : "scale-0"}`}
        >
          <div>
            <p className="text-2xl font-bold text-[#4C4E64DE] ">Submitting</p>
            <p className="text-[#4C4E64AD]">Your request is being submitted</p>
          </div>
          <div className="card justify-content-center my-6 flex">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="4"
              animationDuration="1.5s"
            />
          </div>
        </div>
      </div>
      <div
        className={`shader duration-150
        ${!submitSuccessPopUp ? "scale-0" : "scale-1"}`}
      >
        <div
          className={`popup
      ${submitSuccessPopUp ? "scale-1" : "scale-0"}`}
        >
          <div>
            <p className="text-2xl font-bold text-[#4C4E64DE] ">Successful</p>
            <p className="text-[#4C4E64AD]">
              Your request was successfully created
            </p>
          </div>
          <div className="mt-4 flex space-y-2">
            <button
              type="button"
              className="text-md button mx-auto w-24 rounded-md py-1"
              onClick={() => {
                setSubmitSuccessPopup(false);
                setOpenCreateRequest(false);
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
      <div
        className={`shader duration-200
        ${!submitFailPopUp ? "scale-0" : "scale-1"}`}
      >
        <div
          className={`popup duration-200
      ${submitFailPopUp ? "scale-1" : "scale-0"}`}
        >
          <div>
            <p className="text-2xl font-bold text-[#4C4E64DE] ">Failed</p>
            <p className="text-[#4C4E64AD]">Failed to create request</p>
          </div>
          <div className="mt-4 flex space-y-2">
            <button
              type="button"
              className="text-md button mx-auto w-24 rounded-md py-1"
              onClick={() => {
                setSubmitFailPopUp(false);
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateSchedule;
