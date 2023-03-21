import ConfirmPopup from "./ConfirmPopup";
import { MdClose } from "react-icons/md";
import { Calendar } from "primereact/calendar";
import { useState, useEffect } from "react";
import axios from "axios";

const Request = ({ setConfirmPopupToggle, confirmPopupToggle, setPage }) => {
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [date, setDate] = useState("20/03/2023");
  const [hourRate, setHourRate] = useState(1000);
  const [description, setDescription] = useState("I fear to be alone");
  const [locationType, setLocationType] = useState("Online");
  const [location, setLocation] = useState("Google meet");
  const [problemType, setProblemType] = useState("Depression");
  const [title, setTitle] = useState("Need help");
  const [isSubmit, setIsSubmit] = useState(false);
  const [jsonData, setJsonData] = useState([]);

  console.log("jsonData", jsonData);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      ` price: ${hourRate} locationType:${locationType} startTime:${fromTime.toISOString()} finishTime:${toTime.toISOString()}  location:${location} `
    );
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
  const patientUUID = "22e8ed57-d93e-4ba4-a958-85a7670ba702";
  const prepareData = () => {
    const _data = {
      title: title,
      description: description,
      price: Number(hourRate),
      problemType: problemType.replace(/\s+/g, "_"),
      meetingType: locationType,
      location: location,
      startTime: fromTime.toISOString(),
      finishTime: toTime.toISOString(),
      patientUUID: patientUUID,
    };
    console.log("_data", _data);
    setJsonData(_data);
    return _data;
  };

  useEffect(() => {
   
    const data = jsonData;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/createRequest",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [jsonData]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="min-h-11/12 relative mx-auto mt-[70px] w-[95%] rounded-lg bg-white p-6 font-kanit shadow-xl">
          <MdClose
            className="absolute right-4 cursor-pointer text-2xl text-slate-400 duration-150 hover:text-slate-300"
            onClick={() => setPage("patientSchedule")}
          />
          <p className="pt-4 text-center text-3xl font-bold text-slate-500">
            CREATE REQUEST
          </p>
          <div>
            <div className=" mx-auto  mb-5 rounded-lg  pb-5   ">
              <div className=" mx-auto my-4 flex  p-2 text-center text-slate-400">
                <div className="mx-auto flex gap-4 ">
                  <div className="mx-auto  flex w-full  flex-col ">
                    <div className="pl-2">DATE</div>
                    <Calendar
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.value)}
                      showButtonBar
                      className="mx-auto w-[120px] rounded-lg border-2 border-slate-200"
                      placeholder="dd/mm/yyyy"
                    ></Calendar>
                  </div>

                  <div className="mx-1">
                    <div className="">
                      From
                      <Calendar
                        id="fromTime"
                        timeOnly
                        stepMinute={30}
                        value={fromTime}
                        onChange={(e) => setFromTime(e.value)}
                        showButtonBar
                        className="w-[80px] rounded-lg  border-2 bg-slate-900 text-center "
                        placeholder="  15:00"
                      ></Calendar>
                    </div>
                  </div>
                  <div className="mx-1">
                    <div className="">
                      To
                      <Calendar
                        id="toTime"
                        timeOnly
                        stepMinute={30}
                        value={toTime}
                        onChange={(e) => setToTime(e.value)}
                        showButtonBar
                        className="w-[80px] rounded-lg  border-2 bg-slate-900 text-center "
                        placeholder="  16:00"
                      ></Calendar>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-3  flex w-full">
                <div className="ml-5  flex w-full  ">
                  <div className="w-[150px]  px-2">
                    <div className="headingColor text-center">Title</div>
                    <input
                      className="w-full rounded-lg border-2 border-slate-400 px-2"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Need Therapy"
                    />
                  </div>
                  <div className="w-[40%]  px-2">
                    <div className="headingColor text-center">ประเภท</div>
                    <select
                      className="w-[120px] rounded-lg border-2 border-slate-400 text-center text-sm"
                      value={problemType}
                      onChange={(e) => setProblemType(e.target.value)}
                    >
                      {problemTypes.map((cause, idx) => (
                        <option key={idx} value={cause}>
                          {cause}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className=" w-full pl-8">
                <textarea
                  id="textarea"
                  className="mx-auto h-[180px] w-[90%] rounded-lg border-2 border-slate-500 p-2"
                  placeholder="What happen?"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="w-full space-x-2">
                <div className="mx-auto flex w-1/2">
                  <div className="flex p-2">
                    <label for="online">Online</label>
                    <div className=" px-1 pt-1">
                      <input
                        type="radio"
                        id="online"
                        value="online"
                        name="location"
                        className="h-[15px] "
                        onChange={(e) => setLocationType(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex p-2">
                    <label for="online">Offline</label>
                    <div className=" px-1 pt-1">
                      <input
                        type="radio"
                        id="offline"
                        value="offline"
                        name="location"
                        className="h-[15px] "
                        onChange={(e) => setLocationType(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto  w-full space-x-4">
                <div className="mx-auto  flex space-x-4 p-2">
                  <input
                    id="location"
                    className="h-[40px] w-1/2 rounded-lg border-2 border-slate-500 px-2"
                    placeholder="Google meet"
                    onChange={(e) => setLocation(e.target.value)}
                    type=""
                    required
                  />
                  <input
                    id="hourRate"
                    className="h-[40px] w-1/2 rounded-lg border-2 border-slate-500 px-2"
                    placeholder="   Hour rate"
                    onChange={(e) => setHourRate(e.target.value)}
                    type="number"
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <button
                  onClick={() => setConfirmPopupToggle(true)}
                  className="mx-auto rounded-md bg-[#99B47B] mt-5 p-2 px-4 text-xl text-white duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]"
                  type="submit"
                >
                  CREATE REQUEST
                </button>
              </div>
            </div>
          </div>
        </div>
        {
          <div
            className={`fixed top-0 left-0 right-0 z-50 h-full w-full 
        bg-slate-300 bg-opacity-10 backdrop-blur-[2px]
        ${!confirmPopupToggle ? "scale-0" : "scale-1"}`}
          >
            <ConfirmPopup
              title={"CREATE REQUEST"}
              description={"Do you want to create request?"}
              setConfirmPopupToggle={setConfirmPopupToggle}
              confirmPopupToggle={confirmPopupToggle}
              setIsSubmit={setIsSubmit}
              prepareData={prepareData}
            />
          </div>
        }
      </form>
    </>
  );
};
export default Request;
