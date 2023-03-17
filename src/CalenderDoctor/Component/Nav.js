import { FaAlignJustify } from "react-icons/fa";
const Nav =()=>{
  return<>
  <div className="bg-gradient-to-b from-teal-200 to-teal-400 fixed top-0 p-2 h-[50px] w-screen flex flex-row drop-shadow-md">
    <div className="w-11/12 p-2 text-xl text-slate-400"><FaAlignJustify/></div><div><img className="h-[40px] rounded-full" src="dog.jpg"/></div></div>
  </>
};
export default Nav;