import { FaAlignJustify } from "react-icons/fa";
const Nav = () => {
  return (
    <>
      <div className="fixed top-0 flex h-[50px] w-screen flex-row bg-gradient-to-b from-teal-200 to-teal-400 p-2 drop-shadow-md">
        <div className="w-11/12 p-2 text-xl text-slate-400">
          <FaAlignJustify />
        </div>
        <div className=" float-left  fixed top-[-50%] right-0">
          <img className="h-[100px] rounded-full " src="Memind2.png" />
        </div>
      </div>
    </>
  );
};
export default Nav;
