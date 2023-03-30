import { Link, useNavigate } from "react-router-dom";
const Landing = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6">
      <Link to="/schedule" className="button w-1/2 py-3">
        SCHEDULE
      </Link>
      <Link to="/setting" className="button w-1/2 py-3">
        SETTING
      </Link>
    </div>
  );
};
export default Landing;
