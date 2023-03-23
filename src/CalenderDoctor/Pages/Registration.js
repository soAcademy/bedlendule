import React from "react";
import { Button, Checkbox } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Registration() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-center">
        <img src="/doctorLogo.png" alt="Logo" className="h-64" />
      </div>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-medium text-blue-600">REGISTER</h2>
        <p className="text-gray-600">Create your account</p>
      </div>

      <form>
        <div className="flex flex-wrap justify-center">
          <div className="flex h-[45px] w-1/4 items-center rounded-lg border-2 border-slate-500">
            <input
              type="text"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="first-name"
              placeholder="First name"
            />
          </div>
          <div className="mx-1 flex h-[45px] w-1/3 items-center rounded-lg border-2 border-slate-500">
            <input
              type="text"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="last-name"
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="my-2 flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            {/* <label htmlFor="phone-number">Phone Number</label> */}
            <input
              type="text"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="phone-number"
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            <input
              type="email"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="password"
              placeholder="Email Address"
            />
          </div>
        </div>

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

        <div className="flex flex-wrap justify-center">
          <div className="my-2 flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500">
            <input
              type="password"
              className="mx-2 h-[41px] w-full rounded-lg"
              id="confirm-password"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div className="my-4 flex flex-wrap justify-center">
          <div className="items-center rounded-lg">
            {/* <label htmlFor="account-type">Account Type</label> */}
            <div>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="account-type"
                  id="psychologist"
                  value="psychologist"
                />{" "}
                Psychologist
              </label>
              <label className="radio-inline mx-2">
                <input
                  type="radio"
                  name="account-type"
                  id="client"
                  value="client"
                />{" "}
                Client
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="flex h-[40px] w-3/5 items-center rounded-lg">
            <label>
              <input type="checkbox" /> By registering, you are agreeing to our
              Terms of use and Privacy Policy
            </label>
          </div>
        </div>

        <div className="my-4 flex flex-wrap justify-center">
          <Button label="Register" icon="pi pi-check" iconPos="right" />
        </div>
      </form>
      <div className="already-have-account">
        <div className="my-4 flex flex-wrap justify-center">
          <p>
            Already have an account? <a href="#">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;