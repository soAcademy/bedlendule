const ConfirmPopup = ({
  title,
  description,
  setConfirmPopupToggle,
  confirmPopupToggle,
}) => {
  return (
    <>
      <div
        className={`relative top-1/3 mx-auto w-[80%] rounded-lg bg-white 
      p-6 text-center font-kanit shadow-md duration-200
      ${confirmPopupToggle ? "scale-1" : "translate-y-1/4 scale-0"}`}
      >
        <div>
          <p className="text-2xl font-bold text-[#4C4E64DE] ">{title}</p>
          <p className="text-[#4C4E64AD]">{description}</p>
        </div>
        <div className="mt-4 flex flex-col space-y-2">
          <button className="text-md mx-auto w-24 rounded-md bg-[#99B47B] py-1 text-white duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]">
            CONFIRM
          </button>
          <button
            onClick={() => setConfirmPopupToggle(false)}
            className="text-md mx-auto w-24 rounded-md bg-[#99B47B] py-1 text-white duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]"
          >
            CANCEL
          </button>
        </div>
      </div>
    </>
  );
};
export default ConfirmPopup;
