import { useEffect } from "react";
import { Link } from "react-router-dom";
import useRedirect from "../Hooks/useRedirect";
const Landing = () => {
  document.title = "Welcome | Bedlendule";
  const { redirectToLogin } = useRedirect();
  const uuid = localStorage.getItem("uuid");
  const userProfile = JSON.parse(localStorage.getItem("userprofile"));
  useEffect(() => {
    !uuid && redirectToLogin();
  }, [uuid]);
  return (
    <div
      className="fixed top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 
    flex-col items-center justify-center space-y-6"
    >
      <p>
        Welcome, {userProfile.firstName} {userProfile.lastName}
      </p>
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
