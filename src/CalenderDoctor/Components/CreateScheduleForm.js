import { BsChevronDown } from "react-icons/bs";

const CreateScheduleForm = ({
  setOpenCreateSchedule,
  newTimeSlots,
  handleSubmit
}) => {
  return (
    <form className="" id="create-schedule" onSubmit={handleSubmit}>
      <BsChevronDown
        className="absolute right-4 cursor-pointer text-2xl text-slate-400 duration-150 hover:text-slate-300"
        onClick={() => setOpenCreateSchedule(false)}
      />
      <p className="pt-4 text-center text-3xl font-bold text-slate-500">
        CREATE SCHEDULE
      </p>

      <div className="my-2 w-full items-center gap-2">
        Title:
        <input
          required
          id="title"
          className="h-[40px] w-full rounded-lg border-2 border-slate-400 px-2 text-center"
          placeholder="Title"
        />
      </div>
      <div className="">
        Description
        <textarea
          required
          id="description"
          className="h-[100px] w-full rounded-lg border-2 border-slate-500 p-2"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="flex w-full items-center justify-between ">
        <div className="my-4 flex flex-col text-slate-500">
          <div className="flex gap-2">
            <input
              required
              type="radio"
              id="online"
              value="ONLINE"
              name="meetingType"
              className=""
            />
            <label for="online">ONLINE</label>
          </div>
          <div className="flex gap-2">
            <input
              required
              type="radio"
              id="offline"
              value="OFFLINE"
              name="meetingType"
            />
            <label for="offline">OFFLINE</label>
          </div>
        </div>
        <input
          id="location"
          name="location"
          className="h-10 rounded-lg border-2 border-slate-400 px-2"
          placeholder="Location"
          type=""
          required
        />
      </div>
      <button
        disabled={newTimeSlots.length > 0 ? false : true}
        className={`button fixed bottom-5 left-1/2 -translate-x-1/2 p-4 disabled:bg-slate-300`}
        type="submit"
      >
        CREATE SCHEDULE
      </button>
    </form>
  );
};

export default CreateScheduleForm;
