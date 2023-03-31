import { Rating } from "primereact/rating";
import { GiAlarmClock } from "react-icons/gi";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const SelectedPatientDetail = ({ setPage }) => {
  const redirect = useNavigate();
  const patiDetails = {
    firstName: "Marry",
    lastName: "Wakage",
    review: 4,
    licenseID: "123514788",
    userName: "Marry@",
    email: "Marry@gmail.com",
    contact: "(+66)92-597-5877",
    pictureUrl:
      "https://thumbs.dreamstime.com/b/beautiful-young-pati-9927050.jpg",
    timeslots: [
      {
        startTime: "15:00",
        FinishTime: "16:00",
        rate: 1500,
      },
      {
        startTime: "18:00",
        FinishTime: "19:30",
        rate: 2000,
      },
      {
        startTime: "20:00",
        FinishTime: "20:30",
        rate: 1000,
      },
    ],
  };

  return (
    <>
      <div className="mt-10 flex flex-col ">
      <button
          className="top-13 absolute right-4 z-40 w-10 rounded-lg border px-1 text-2xl font-light text-slate-400 shadow-md hover:bg-slate-100"
          onClick={() => redirect("/schedule/")}
        >
          <IoIosReturnLeft className="" />
        </button>
        <div className="w-full text-center text-2xl">
          {patiDetails.firstName} &nbsp; {patiDetails.lastName}
        </div>
        <div className="mx-auto  pt-2">
          <Rating
          onIcon={
            <img
              src="/rating-icon-active.png"
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt="custom-active"
              width="12px"
              height="12px"
            />
          }
          offIcon={
            <img
              src="/rating-icon-inactive.png"
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt="custom-inactive"
              width="12px"
              height="12px"
            />
          }
            readOnly
            value={patiDetails.review}
            cancel={false}
            className=""
          />
        </div>
        <div className="mx-auto my-2">
          <img
            src="https://thumbs.dreamstime.com/b/beautiful-young-pati-9927050.jpg"
            className="h-[200px] rounded-lg"
          />
        </div>
        <div className=" mx-auto my-5 w-[80%] rounded-lg border-2  border-slate-400 pt-2">
          <div className="text-center text-xl">Details</div>

          <ul className="p-[20px] text-slate-600">
            <li>
              Username:
              <span className="text-slate-500 underline underline-offset-2">
                {" "}
                {patiDetails.userName}
              </span>
            </li>
            <li>
              Email:
              <span className="text-slate-500 underline underline-offset-2">
                {patiDetails.email}
              </span>
            </li>
            <li>
              License ID:
              <span className="text-slate-500 underline underline-offset-2">
                {" "}
                {patiDetails.licenseID}
              </span>
            </li>
            <li>
              Contact :
              <span className="text-slate-500 underline underline-offset-2">
                {" "}
                {patiDetails.contact}
              </span>
            </li>
          </ul>
        </div>
        <div className=" mx-auto w-[95%]">
          {patiDetails.timeslots.map((timeslots) => (
            <ul className="mx-auto my-4 flex flex-row gap-2  ">
              <li className="  relative flex w-[25%] rounded-lg border-2 border-slate-400 p-2 text-center text-sm ">
                <div className="absolute top-[-10px] w-[50px] bg-white px-1 text-slate-400">
                  From
                </div>
                <div className="mx-auto flex">
                  <div className="underline underline-offset-2">
                    {timeslots.startTime}
                  </div>
                  <div className="px-1">
                    <GiAlarmClock className="text-base" />
                  </div>
                </div>
              </li>
              <li className="  relative flex w-[25%]  rounded-lg border-2 border-slate-400 p-2 text-center text-sm">
                <div className="absolute top-[-10px] bg-white px-1 text-slate-400">
                  To
                </div>
                <div className="mx-auto flex">
                  <div className="underline underline-offset-2">
                    {timeslots.FinishTime}
                  </div>
                  <div className="px-1">
                    <GiAlarmClock className="text-base" />
                  </div>
                </div>
              </li>
              <li className=" relative flex w-[50%]  rounded-lg border-2 border-slate-400 p-2 text-center text-sm">
                <div className="absolute top-[-10px] bg-white px-1 text-slate-400">
                  Rate
                </div>
                <div className=" mx-auto flex">
                  <div className="underline underline-offset-2">
                    {timeslots.rate} THB/Hour
                  </div>
                  <div className="px-1">
                    <AiFillDollarCircle className="my-auto text-base" />
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};
export default SelectedPatientDetail;
