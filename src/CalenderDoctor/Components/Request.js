import { FaClock } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
const Request = ({ setPage }) => {
  const timeRange = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00"];
  return (
    <>
      <div className=" mx-auto mt-[70px] mb-5 h-screen w-[90%] rounded-lg bg-slate-100 shadow-lg">
        <div
          className=" px-2  text-right text-xl text-slate-500"
          onClick={() => setPage("landing")}
        >
          x
        </div>
        <div className="flex text-center  text-3xl ">
          <div className="w-full font-bold text-slate-500">REQUEST</div>
        </div>
        <div className=" mx-auto my-4 flex gap-3  text-center text-slate-400 ">
          <div className="mx-auto flex gap-4">
            <div className="flex gap-2  rounded-lg border-2 border-slate-500 py-3 px-2 relative">
              <div className="absolute top-[-15px] bg-white px-1">DATE</div>
              20/03/2023
              <AiOutlineSchedule className="my-auto text-xl " />
            </div>
            <div className="flex gap-2  rounded-lg border-2 border-slate-500 py-3 px-2">
              15:00
              <FaClock className="my-auto" />
            </div>
            <div className="flex gap-2  rounded-lg border-2 border-slate-500 py-3 px-2">
              16:00
              <FaClock className="my-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Request;
