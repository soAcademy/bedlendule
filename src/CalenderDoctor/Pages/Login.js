import React from "react";
import { Button, Checkbox } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Login({setPage}) {
  return (
    <div className="w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-center justify-center">
        <img src="/doctorLogo.png" alt="Logo" className="h-40" />
      </div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-blue-600">WELCOME BACK</h2>
        <p className="text-gray-600">YOUR MENTAL HEALTH MATTERS</p>
      </div>

      <form>
        <div className="flex flex-wrap justify-center">
          <div className="my-2 flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            <input
              type="text"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="username"
              placeholder="Username"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            <input
              type="password"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="password"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="my-2 flex flex-wrap justify-center">
          <div className="flex h-[40px] w-3/5 items-center rounded-lg">
            {/* <label>
              <input type="checkbox" /> Remember your password?
            </label> */}
            <div className="m-2 font-bold">
              <a href="#"> Forget Password? </a>
            </div>
          </div>
        </div>

        <div className="my-4 flex flex-wrap justify-center">
          <Button
          type="button"
            label="Login"
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
            <a onClick={(e)=>setPage("signup")} className="font-bold underline underline-offset-1" href="#">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
