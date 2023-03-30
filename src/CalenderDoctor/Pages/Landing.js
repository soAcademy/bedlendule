import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Landing = () => {
  const redirect = useNavigate();
  window.onload = () => {
    const accessToken = localStorage.getItem("access-token");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5555/bedlendule/verifySession",
      headers: {
        "access-token": accessToken,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response);
        if (response.status === 250) {
          redirect("/login");
        } else if (response.status === 200) {
          localStorage.setItem("type", response.data.type);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
