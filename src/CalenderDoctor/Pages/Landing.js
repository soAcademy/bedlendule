const Landing = ({ setPage, type }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6">
      <button
        onClick={() =>
          setPage("home")
        }
        className="button w-1/2 py-3"
      >
        SCHEDULE
      </button>
      <button onClick={() => setPage("setting")} className="button w-1/2 py-3">
        SETTING
      </button>
    </div>
  );
};
export default Landing;
