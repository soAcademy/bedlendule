import { FaAlignJustify } from "react-icons/fa";
const Nav = () => {
  return (
    <>
      <div className="fixed top-0 flex h-[50px] w-screen flex-row bg-gradient-to-b from-teal-200 to-teal-400 p-2 drop-shadow-md">
        <div className="w-11/12 p-2 text-xl text-slate-400">
          <FaAlignJustify />
        </div>
        <div>
          <img className="h-[40px] rounded-full" src="dog.jpg" />
        </div>
      </div>
    </>
  );
};
export default Nav;
