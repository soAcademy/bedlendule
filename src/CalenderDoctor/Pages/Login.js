import React, { useRef, useState } from "react";
import { Button, Checkbox } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { Toast } from "primereact/toast";

const Login = ({ setPage }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loginFail, setLoginFail] = useState();
  const [logginIn, setLogginIn] = useState(false);
  const toast = useRef(null);

  const show = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Username or password is incorrect",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLogginIn(true);
    let data = JSON.stringify({
      username: e.target["username"].value.toLowerCase(),
      password: e.target["password"].value,
    });
    let config = {
      method: "post",
      url: "https://bedlendule-backend.vercel.app/bedlendule/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log("res",response.data);
        localStorage.setItem("access-token",response.data.access_token);
        document.querySelector("#password").value = "";
        response.data.type === 'PATIENT' ? setPage("patient") : setPage("doctor")
        setAuthenticated(true);
        show();
        setLogginIn(false);
      })
      .catch((error) => {
        document.querySelector("#password").value = "";
        console.log(error);
        show();
        setAuthenticated(false);
        setLoginFail(true);
        setLogginIn(false);
      });
  };
  return (
    <>
      <Toast ref={toast} position="bottom-left" className="hidden md:block" />
      <div className="fixed top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-center">
          <img src="/doctorLogo.png" alt="Logo" className="h-40" />
        </div>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-blue-600">WELCOME BACK</h2>
          <p className="text-gray-600">YOUR MENTAL HEALTH MATTERS</p>
        </div>
        <form onSubmit={handleLogin} onChange={() => setLoginFail()}>
          <div className="flex flex-col items-center gap-y-2">
            <input
              required
              type="text"
              className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500 p-2"
              id="username"
              placeholder="Username"
              disabled={logginIn}
            />
            <input
              required
              type="password"
              className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500 p-2"
              id="password"
              placeholder="Password"
              disabled={logginIn}
            />
          </div>

          <div className="m-4 mx-auto w-3/5">
            <button type="button" className="">
              {" "}
              Forget Password?{" "}
            </button>
          </div>
          <div className="my-2 mt-2 flex flex-wrap justify-center">
            <Button
              type="submit"
              loading={logginIn}
              label={logginIn ? "Loggin In" : "Login"}
              icon="pi pi-check"
              iconPos="right"
              size="large"
            />
          </div>
        </form>
        <div className="already-have-account">
          <div className="my-4 flex flex-wrap justify-center">
            <p>
              Don't have an account?{" "}
              <a
                onClick={(e) => setPage("signup")}
                className="font-bold underline underline-offset-1"
                href="#"
              >
                Sign Up
              </a>
            </p>
          </div>
          <p
            className={`text-center text-red-500 opacity-0 ${
              loginFail && "opacity-100"
            }`}
          >
            Username or password is incorrect
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;