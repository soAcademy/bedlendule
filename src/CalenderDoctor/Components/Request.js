import { Calendar } from "primereact/calendar";
import { useState, useEffect } from "react";

const Request = ({ page, setPage }) => {
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [date, setDate] = useState("20/03/2023");
  const [contact, setContact] = useState("093-xxx-xxxx");
  const [hourRate, setHourRate] = useState(1000);
  const [text, setText] = useState("");
  const [location, setLocation] = useState("Online");
  const [request, setRequest] = useState([]);

  const fromTimeOnly = fromTime.toLocaleTimeString().substring(0, 5);
  const toTimeOnly = toTime.toLocaleTimeString().substring(0, 5);

  return (
    <>
      <form className=" mx-auto mt-[70px] mb-5 w-[90%] rounded-lg  pb-5 shadow-xl  ">
        <div
          className=" px-2  text-right text-xl text-slate-500"
          onClick={() => setPage("patientSchedule")}
        >
          x
        </div>
        <div className="flex text-center  text-3xl ">
          <div className="w-full font-bold text-slate-500">REQUEST</div>
        </div>
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
        <div className=" w-full pl-8">
          <textarea
            id="textarea"
            className="mx-auto h-[180px] w-[90%] rounded-lg border-2 border-slate-500 p-2"
            placeholder="What happen?"
            onChange={(e) => setText(e.target.value)}
            value={text}
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
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto  w-full space-x-4">
          <div className="mx-auto  flex space-x-4 p-2">
            <input
              id="contact"
              className="h-[40px] w-1/2 rounded-lg border-2 border-slate-500 "
              placeholder="   Contact"
              onChange={(e) => setContact(e.target.value)}
              type="number"
              required
            />
            <input
              id="hourRate"
              className="h-[40px] w-1/2 rounded-lg border-2 border-slate-500 "
              placeholder="   Hour rate"
              onChange={(e) => setHourRate(e.target.value)}
              type="number"
              required
            />
          </div>
        </div>
        <div className="mx-auto  mt-5 w-full p-2">
          <div className=" mx-auto  w-2/3 p-2">
            <div className="mx-auto bg-yellow-100">
              <div
                className=" button w-full py-2 text-white"
                type="submit"
                onClick={() =>
                  setRequest({
                    date: date.toLocaleDateString(),
                    time: `${fromTimeOnly} - ${toTimeOnly}`,
                    cause: text,
                    contact: contact,
                    hourRate: hourRate,
                    locations: location,
                  })
                }
              >
                Summit
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default Request;