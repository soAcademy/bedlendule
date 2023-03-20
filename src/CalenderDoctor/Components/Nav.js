import { FaAlignJustify } from "react-icons/fa";
const Nav = () => {
  return (
    <>
      <div className="fixed top-0 z-50 flex h-[50px] w-full flex-row bg-gradient-to-b from-[#C5E1A5] to-[#C5E1A5] p-2 drop-shadow-md">
        <div className="w-11/12 p-2 text-xl text-slate-400">
          <FaAlignJustify className="cursor-pointer" />
        </div>
        <div className=" fixed top-[-50%] right-0 float-left">
          <img className="h-[100px] rounded-full " src="Memind2.png" />
        </div>
      </div>
    </>
  );
};
export default Nav;
