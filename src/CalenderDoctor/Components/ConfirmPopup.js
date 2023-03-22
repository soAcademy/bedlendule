const ConfirmPopup = ({ title, description, action, state, setState,className }) => (
  <div
    className={`shader
        ${!state && "pointer-events-none opacity-0"}`}
  >
    <div
    
      className={className? className :`popup
    ${state ? "scale-100" : "scale-0"}`}
    >
      <div>
        <p className="text-2xl font-bold text-[#4C4E64DE] ">{title}</p>
        <p className="text-[#4C4E64AD]">{description}</p>
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        <button
          type="button"
          className="text-md mx-auto w-24 rounded-md bg-[#99B47B] py-1 text-white duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]"
          onClick={action}
        >
          CONFIRM
        </button>
        <button
          type="button"
          onClick={() => setState(false)}
          className="text-md mx-auto w-24 rounded-md bg-slate-400 py-1 text-white duration-200 hover:bg-slate-300 active:bg-slate-400"
        >
          CANCEL
        </button>
      </div>
    </div>
  </div>
);
export default ConfirmPopup;
