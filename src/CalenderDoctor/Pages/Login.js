import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { Toast } from "primereact/toast";
import { FetchContext } from "../home";

const Login = () => {
  document.title = "Login | Bedlendule";
  const [loginAttempt, setLoginAttempt] = useState({
    remaining: Number,
    retryAfter: Number,
  });
  const [attemptExceeded, setAttemptExceeded] = useState(false);
  const [loginFail, setLoginFail] = useState();
  const [logginIn, setLogginIn] = useState(false);
  const { fetch, setFetch } = useContext(FetchContext);
  const redirect = useNavigate();
  const toast = useRef(null);
  const show = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Username or password is incorrect",
    });
  };

  const handleLogin = (e) => {
    console.log("handleLogin working...");
    e.preventDefault();
    setAttemptExceeded(false);
    setLoginFail(false);
    setLogginIn(true);
    let data = JSON.stringify({
      username: e.target["username"].value.toLowerCase(),
      password: e.target["password"].value,
    });
    let config = {
      method: "post",
      // url: "http://localhost:5555/bedlendule/login",
      url: "https://bedlendule-backend.vercel.app/bedlendule/login",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("access-token"),
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log("logged");
        console.log("response", response);
        localStorage.setItem("access-token", response.data.access_token);
        localStorage.setItem("uuid", response.data.uuid);
        if (!localStorage.getItem("userprofile")) {
          let data = JSON.stringify({
            uuid: response.data.uuid,
          });

          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://bedlendule-backend.vercel.app/bedlendule/getUserDetailByUUID",
            headers: {
              Authorization: response.data.access_token,
              "Content-Type": "application/json",
            },
            data: data,
          };

          axios
            .request(config)
            .then((response) => {
              localStorage.setItem(
                "userprofile",
                JSON.stringify(response.data)
              );
              redirect("/home");
              document.querySelector("#password").value = "";
              show();
              setLogginIn(false);
              setFetch(!fetch);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        document.querySelector("#password").value = "";
        show();
        setLogginIn(false);
        if (error.response.status === 401) {
          setLoginFail(true);
          console.log("error", error);
          if (error.response.data.name === "TokenExpiredError") {
            window.location.reload();
          }
        } else if (error.response.status === 429) {
          console.log(
            'error.response.headers["retry-after"]',
            error.response.headers["retry-after"]
          );
          setAttemptExceeded(true);
          setLoginAttempt({
            remaining: error.response.headers["x-ratelimit-remaining"],
            retryAfter: Math.ceil(+error.response.headers["retry-after"] / 60),
          });
        }
      });
  };

  if (localStorage.getItem("userprofile") && localStorage.getItem("uuid")) {
    window.location = window.location.origin;
  }

  if (!localStorage.getItem("access-token")) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getPublicToken",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        localStorage.setItem("access-token", response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
              <Link
                to="/signup"
                className="font-bold underline underline-offset-1"
              >
                Sign Up
              </Link>
            </p>
          </div>
          {loginFail && (
            <p className={`animate-pulse text-center text-red-500`}>
              Username or password is incorrect
            </p>
          )}
          {attemptExceeded && (
            <>
              <p className={`animate-pulse px-5 text-center text-red-500`}>
                Too many attempts.
              </p>
              <p className={`animate-pulse px-5 text-center text-red-500`}>
                Please try again after {loginAttempt.retryAfter} minutes
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
