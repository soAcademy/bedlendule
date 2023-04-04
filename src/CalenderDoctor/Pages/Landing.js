import { useEffect } from "react";
import { Link } from "react-router-dom";
import useRedirect from "../Hooks/useRedirect";
const Landing = () => {
  document.title = "Welcome | Bedlendule"
  const {redirectToLogin} = useRedirect();
  const uuid = localStorage.getItem("uuid");
  useEffect(() => {
    !uuid && redirectToLogin();
  }, [uuid]);
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
