import React from "react";
import { Button, Checkbox } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useState } from "react";
import { enforceFormat, formatToPhone } from "../Functions/validateForm";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration = () => {
  const [sending, setSending] = useState();
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });


  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (value.length < 6) {
            stateObj[name] = "Password must be at least 6 characters";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        case "phoneNumber":
          if (value.length < 12) {
            stateObj[name] = "Please enter 10 digits phone number.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmit = (e) => {
    setSending(true);
    e.preventDefault();
    const form = document.forms.register1;
    const userData = {
      type:
        document.querySelector('input[name="account-type"]:checked').value ===
        "psychologist"
          ? "DOCTOR"
          : "PATIENT",
      username: form["username"].value.toLowerCase(),
      password: form["password"].value,
      email: form["email"].value.toLowerCase(),
      phoneNumber: form["phone-number"].value,
      firstName:
        form["first-name"].value.slice(0, 1).toUpperCase() +
        form["first-name"].value.slice(1).toLowerCase(),
      lastName:
        form["last-name"].value.slice(0, 1).toUpperCase() +
        form["last-name"].value.slice(1).toLowerCase(),
    };
    console.log(userData);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/createUser",
      headers: {
        "Content-Type": "application/json",
        'authorization': localStorage.getItem('access-token'),
      },
      data: userData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSending(false);
      })
      .catch((error) => {
        console.log(error);
        setSending(false);
      });
  };
  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <div className="flex items-center justify-center">
        <img src="/doctorLogo.png" alt="Logo" className="h-40" />
      </div>
      <div className="mb-6 text-center">
        <h2 className="text-xl font-medium text-blue-600">REGISTER</h2>
        <p className="text-gray-600">Create your account</p>
      </div>

      <form id="register1" className="px-8" onSubmit={handleSubmit}>
        <div className="my-1 flex justify-center gap-2">
          <input
            required
            type="text"
            className="flex h-[45px] w-[45%] items-center rounded-lg border-2 border-slate-500 px-2"
            id="first-name"
            placeholder="First name"
          />
          <input
            required
            type="text"
            className="flex h-[45px] w-[55%] items-center rounded-lg border-2 border-slate-500 px-2 "
            id="last-name"
            placeholder="Last name"
          />
        </div>

        <input
          required
          type="text"
          className="my-1 flex h-[45px] w-full items-center rounded-lg border-2 border-slate-500 px-2"
          id="phone-number"
          name="phoneNumber"
          placeholder="Phone Number"
          maxLength={16}
          minLength={16}
          onKeyDown={enforceFormat}
          onKeyUp={formatToPhone}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.phoneNumber && (
          <span className="text-red-500">{error.phoneNumber}</span>
        )}

        <input
          required
          type="email"
          className="my-1 flex h-[45px] w-full items-center rounded-lg border-2 border-slate-500 px-2"
          id="email"
          placeholder="Email Address"
        />

        <input
          required
          type="text"
          className="my-1 flex h-[45px] w-full items-center rounded-lg border-2 border-slate-500 px-2"
          id="username"
          name="username"
          placeholder="Username"
        />
        {error.username && (
          <span className="text-red-500">{error.username}</span>
        )}
        <input
          required
          type="password"
          className="my-1 flex h-[45px] w-full items-center rounded-lg border-2 border-slate-500 px-2"
          id="password"
          name="password"
          placeholder="Password"
          minLength={6}
          value={input.password}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.password && (
          <span className="text-red-500">{error.password}</span>
        )}

        <input
          required
          type="password"
          className="my-1 flex h-[45px] w-full items-center rounded-lg border-2 border-slate-500 px-2"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={input.confirmPassword}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.confirmPassword && (
          <span className="text-red-500">{error.confirmPassword}</span>
        )}

        <div className="my-4 flex justify-center">
          <label className="radio-inline">
            <input
              required
              type="radio"
              name="account-type"
              id="psychologist"
              value="psychologist"
            />{" "}
            Psychologist
          </label>
          <label className="radio-inline mx-2">
            <input
              required
              type="radio"
              name="account-type"
              id="client"
              value="client"
            />{" "}
            Client
          </label>
        </div>

        <div className="flex justify-center">
          <div className="flex h-[40px] w-full items-center rounded-lg">
            <label>
              <input required type="checkbox" className="mx-1" /> By
              registering, you are agreeing to our Terms of use and Privacy
              Policy
            </label>
          </div>
        </div>

        <div className="my-4 flex justify-center">
          <Button
            label={sending ? "Registering " : "Register"}
            icon="pi pi-check"
            iconPos="right"
            loading={sending}
          />
        </div>
      </form>
      <div className="already-have-account">
        <div className="my-4 flex justify-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-bold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
