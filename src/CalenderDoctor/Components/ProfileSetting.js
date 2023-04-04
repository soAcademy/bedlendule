import { classNames } from "primereact/utils";
import { useState, useEffect } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";

const ProfileSetting = () => {
  const [background, setBackground] = useState();
  const [email, setEmail] = useState();
  const [licenseId, setLicenseId] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const getUserUUID = () => localStorage.getItem("uuid");

  const handleSubmit = (e) => {
    e.preventDefault();
    const _data = JSON.stringify({
      uuid: getUserUUID(),
      email: email,
      phoneNumber: phoneNumber,
      licenseId: licenseId,
      profilePictureUrl: selectedImage?.name,
      background:background
    });
    console.log("_data", _data);
  };
  // console.log("selectedImage", selectedImage);
  return (
    <>
      <div>
        {" "}
        <form onSubmit={handleSubmit}>
          <div className="my-auto flex h-screen flex-col items-center gap-y-2 ">
            <div className=" flex h-full w-full flex-col  ">
              <div className="mx-auto my-auto w-1/2 ">
                <h1 className="headingColor my-4 text-center font-kanit text-2xl font-bold">
                  Profile setting
                </h1>
                <div className="mx-auto h-[220px] w-[220px] overflow-hidden rounded-full object-contain">
                  {selectedImage && (
                    <div className="relative mx-auto my-auto ">
                      <img
                        alt="not found"
                        width={"220px"}
                        height={"220px"}
                        src={URL.createObjectURL(selectedImage)}
                        className=" mx-auto aspect-square"
                      />
                    </div>
                  )}
                  {selectedImage === null && (
                    <div className="relative mx-auto my-auto ">
                      <img
                        alt="not found"
                        width={"220px"}
                        height={"220px"}
                        src="https://www.concilioexpert.com/wp-content/uploads/2017/12/blank-profile-picture-973460-1024x1024.png"
                        className=" mx-auto aspect-square"
                      />
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    console.log("picture file", event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                  className="text-light mb-5 text-sm"
                />
                <button
                  className="absolute  top-[45%] right-[30%] text-xl md:right-[40%] "
                  onClick={() => setSelectedImage(null)}
                >
                  <IoIosCloseCircle className="text-red-500" />
                </button>
                <div className="my-auto flex flex-col space-y-2  ">
                
                  <div className="flex flex-row space-x-5">
                    <div className="my-auto w-1/3">Email</div>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500 p-2"
                      id="email"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="my-auto w-1/3">License ID</div>
                    <input
                      onChange={(e) => setLicenseId(e.target.value)}
                      type="text"
                      className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500 p-2"
                      id="licenseId"
                      placeholder="LIC-xxxxxxxx"
                    />
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="my-auto w-1/3">PhoneNumber</div>
                    <input
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="tel"
                      className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500 p-2"
                      id="phoneNumber"
                      placeholder="099-xxx-xxxx"
                      minLength={10}
                      maxLength={10}
                    />
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="my-auto w-1/3">Background</div>
                    <textarea
                      onChange={(e) => setBackground(e.target.value)}
                      type="text"
                      className="flex h-[80px] w-3/5 items-center rounded-lg border-2 border-slate-500 p-2"
                      id="background"
                      placeholder="Background"
                    />
                  </div>

                  <button
                    className="button mx-10 my-[10px] py-2 "
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div></div>
      </div>
    </>
  );
};
export default ProfileSetting;
