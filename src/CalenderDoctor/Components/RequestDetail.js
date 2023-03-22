import { TfiAlarmClock } from "react-icons/tfi";
import { BsCalendarCheck } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

const RequestDetail = ({ setPage }) => {
  const description =
    "You may not feel like it right now but thats my job. I want to hear every bit of what's going wrong and how it's impacting you now. At the same time we'll work on developing your belief in yourself in order to actually use the coping skills you probably already have.";
  const price = 1200;
  const doctor = [
    {
      name: "David Goodman",
      description:
        "I want to hear every bit of what's going wrong and how it's impacting you now. ",
      location: "Hospital",
    },
    {
      name: "Marry Green",
      description:
        "I want to hear every bit of what's going wrong and how it's impacting you now. ",
      location: "Home",
    },
  ];
  return (
    <>
      <div className="relative mx-auto mt-[70px] h-[90%] w-[90%] rounded-lg p-2 shadow-lg ">
        <div className="headingColor p-4 text-center text-4xl font-bold">
          {" "}
          REQUEST
        </div>
        <div
          className="absolute top-0 right-2 text-2xl text-slate-400"
          onClick={() => setPage("landing")}
        >
          x
        </div>
        <div className="mt-2 flex h-[50px] space-x-4 ">
          <div className="flex w-2/3 space-x-3  rounded-lg border-2 border-slate-400  p-2 text-center">
            <div className="ml-2">22/03/2023</div>
            <div className="">
              <BsCalendarCheck className="mt-1  text-xl" />
            </div>
          </div>
          <div className="flex w-1/3 space-x-1 rounded-lg border-2 border-slate-400 p-2 text-center">
            <div className="">15:00</div>
            <div>
              <TfiAlarmClock className="mt-1  text-xl" />
            </div>
          </div>
          <div className="flex w-1/3 space-x-1 rounded-lg border-2 border-slate-400  p-2 text-center">
            <div className="">16:00</div>
            <div>
              <TfiAlarmClock className="mt-1  text-xl" />
            </div>
          </div>
        </div>
        <div className="b my-8 rounded-lg border-2 border-slate-400 p-2">
          {description}
        </div>
        <div className="mx-auto w-[45%] rounded-lg border-2 border-slate-400  py-2 px-3 text-center">
          {price} &nbsp;baht/hour
        </div>
        {doctor.map((doctor) => (
          <>
            <div className="flex">
              <div className="mx-2 my-4 flex w-full  flex-col rounded-lg border-2 border-sky-500 bg-[#F0F3EC] p-2 text-[#666CFF]">
                <div className="my-auto flex ">
                  <div className=" w-[70%]">{doctor.name}</div>
                  <div className="my-auto flex  w-[10%]">
                    <div className="my-auto">
                      <FaHome />
                    </div>
                    <div className="text-sm">{doctor.location}</div>
                  </div>
                </div>
                <div className="text-sm text-black">{doctor.description}</div>
              </div>
              <div className="button my-auto h-1/2 p-2">CHOOSE</div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
export default RequestDetail;
