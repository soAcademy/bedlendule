const ConfirmPopup = ({
  title,
  description,
  action,
  state,
  setState,
  className,
}) => (
  <>
    <div
      onClick={() => setState(false)}
      className={`shader
    ${!state && "pointer-events-none opacity-0"}`}
    ></div>
    <div
      className={
        className
          ? className
          : `popup duration-300
    ${state ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`
      }
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
  </>
);
export default ConfirmPopup;
