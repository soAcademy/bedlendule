
const Landing = ({setPage,type}) => {  
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6">
      <button
        onClick={() => type!=="doctor" ? setPage("patientSchedule"): setPage("doctorSchedule")}
        className="w-1/2 rounded-lg bg-[#99B47B] py-3 text-center shadow-lg duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]"
      >
        SCHEDULE
      </button>
      <button 
      onClick={()=>setPage("setting")}
      className="w-1/2 rounded-lg bg-[#99B47B] py-3 text-center shadow-lg duration-200 hover:bg-[#99b47bc8] active:bg-[#9cb482]">
        SETTING
      </button>
    </div>
  )
}
export default Landing