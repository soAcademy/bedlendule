import "../../Calender.css";

const Request = () => {
  return (
    <>
      <div className="mx-auto h-screen w-[90%] rounded-lg bg-red-400 font-kanit shadow-lg ">
        <div className="text-center text-2xl font-bold text-slate-500">
          CREATE REQUEST
        </div>
        <div className="mt-5 flex text-center w-full my-auto bg-blue-500 p-2  ">
          <div className=" bg-blue-200 mx-auto my-auto py-4 px-2 border-2 rounded-lg">20/03/2023</div>
          <div className=" bg-blue-300 border-2 my-auto py-4 ">
            <select>
              <option>15.00</option>
              <option>16.00</option>
            </select>
          </div>
          <div className=" bg-blue-300 border-2 my-auto py-4">
            <select>
              <option>16.00</option>
              <option>17.00</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
export default Request;
