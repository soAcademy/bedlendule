import { useNavigate } from "react-router-dom";

const useRedirect = () => {
  const redirect = useNavigate();

  const redirectToLogin = () => {
    redirect("/login");
    localStorage.removeItem("access-token");
    localStorage.removeItem("type");
    localStorage.removeItem("uuid");
  };
  return { redirect, redirectToLogin };
};

export default useRedirect