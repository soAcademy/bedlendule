import React from "react";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function LandingPage() {
  return (
    // <div className="mx-auto flex flex-col items-center justify-center">
    <div className="mx-16 items-center justify-center">
      <div className="flex items-center justify-center">
        <img src="/doctorLogo.png" alt="Logo" className="h-64" />
      </div>

      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-blue-600">
          MENTAL HEALTH MATTERS
        </h2>
        <p className="h-[90 px] w3/5 mx-4 mb-40 text-gray-600">
          You may not feel like it right now but that is our job. I want to hear
          every bit of what's going wrong and how it's impacting you now.{" "}
        </p>
      </div>

      <div className="grid-cols mx-16 grid h-[120px] gap-3">
        <Button
          label="Login"
          icon="pi pi-check"
          iconPos="right"
          size="large"
          // className="sm:w-full-height w-full"
        />
        <Button
          label="Sign Up"
          icon="pi pi-user"
          iconPos="right"
          size="large"
          // className="sm:w-full-height w-full"
          style={{ backgroundColor: "#312e81" }}
        />
      </div>
    </div>
  );
}

export default LandingPage;
