import { FaEllipsisV, FaRegCheckCircle, FaClock } from "react-icons/fa";

const Post = () => {
  const patientData = [
    {
      gender: "Female",
      illness: "Metal health",
      issue: "Burnout Issue",
      heal: "Need therapy",
      time: "20/Mar/2023",
      location: "Online",
      cause:
        "I don’t feel like working in Bangkok anymore. Working here is exhausting. Traffic jam and pollution makes me sick of waking in the morning.",
      duration: 1,
      cost: 1200,
    },
    {
      gender: "Male",
      illness: "Depression",
      issue: "Depression",
      heal: "Need help",
      time: "16/Mar/2023",
      location: "Offline",
      cause:
        "I don’t see value in myself anymore. No one I can talk to and I need help. I don’t want to live but I don’t want to die either. It is so tiring dealing with people don’t understand me.",
      duration: 1 / 2,
      cost: 900,
    },
    {
      gender: "Female",
      illness: "Broken heart",
      issue: "Broken heart",
      heal: "Need help",
      time: "15/Mar/2023",
      location: "Offline",
      cause:
        "I don’t see value in myself anymore. No one I can talk to and I need help. I don’t want to live but I don’t want to die either. It is so tiring dealing with people don’t understand me.",
      duration: 2,
      cost: 1800,
    },
  ];
  return (
    <>
      <div className=" mt-11 h-screen p-4">
        {patientData.map((patient) => (
          <div className="my-5 flex flex-col border-2 border-red-200 bg-slate-100 p-2 ">
            <div className="flex  ">
              <div className="flex w-[90%] gap-1">
                <div className=" rounded-lg bg-green-100 px-1 text-center text-sm text-green-400">
                  {patient.illness}
                </div>
                <div className="rounded-lg bg-red-100 px-1 text-center text-sm  text-red-400 ">
                  {patient.gender}
                </div>
              </div>

              <div>
                <FaEllipsisV className="text-slate-400 " />
              </div>
            </div>
            <div className=" text-xl text-slate-500">
              {patient.issue}. {patient.heal}
            </div>
            <div className="my-2 flex flex-col font-semibold text-slate-400">
              <div>Posted: {patient.time}</div>
              <div>Location:{patient.location}</div>
            </div>
            <div className="mb-1 text-slate-400">
              {" "}
              &nbsp; &nbsp;{patient.cause}
            </div>
            <div className="flex gap-2 font-bold text-slate-400">
              <div className="flex gap-1 text-center">
                {" "}
                <FaClock className="h-[25px] text-center" />
                {patient.duration} Hour
              </div>
              <div className="flex gap-1 text-center">
                <FaRegCheckCircle className="h-[25px] text-center" />
                {patient.cost} Baht
              </div>
            </div>

            <button className="float-left my-2 w-[150px] rounded-lg bg-teal-400 px-1 py-2 font-bold text-white shadow-lg hover:bg-blue-300">
              CONTACT
            </button>
          </div>
        ))}

        <button
          className="fixed right-4 bottom-5 mb-10 h-[50px] w-[50px] rounded-full bg-green-300 text-2xl font-bold text-white hover:bg-blue-300"
          onClick={() => []}
        >
          +
        </button>
      </div>
    </>
  );
};
export default Post;
