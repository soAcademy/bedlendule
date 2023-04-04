import axios from "axios";
import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { enforceFormat, formatToPhone } from "../Functions/validateForm";

const ProfileSetting = () => {
  const [email, setEmail] = useState();
  const [licenseId, setLicenseId] = useState();
  const [contact, setContact] = useState();
  const [background, setBackground] = useState();
  const [file, setFile] = useState(null);
  const userProfile = JSON.parse(localStorage.getItem("userprofile"));
  const [selectedImage, setSelectedImage] = useState(
    userProfile?.profilePictureUrl
  );
  const token = localStorage.getItem("access-token");

  useEffect(() => {
    setSelectedImage(userProfile?.profilePictureUrl);
    setEmail(userProfile?.email);
    setLicenseId(userProfile?.licenseId);
    setContact(userProfile?.phoneNumber);
    setBackground(userProfile?.background);
  }, [userProfile]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const temporaryUrl = URL.createObjectURL(selectedFile);
    setSelectedImage(temporaryUrl);
  };

  const updateProfile = (input, imageUrl) => {
    const data = JSON.stringify({
      email: input["email"].value,
      phoneNumber: input["phoneNumber"].value,
      licenseId: input["licenseId"].value,
      background: input["background"].value,
      profilePictureUrl: imageUrl,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5555/bedlendule/updateUser",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (event, input) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const config = {
        method: "post",
        url: "http://localhost:5555/uploadImg",
        headers: {
          authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };
      axios(config)
        .then(function (response) {
          updateProfile(input, response.data);
        })
        .catch(function (error) {});
    } else {
      updateProfile(input, userProfile.profilePictureUrl);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.target;
        handleSubmit(e, input);
      }}
      className="z-10 mt-10"
    >
      <div className="flex flex-col items-center gap-y-2 ">
        <h1 className="headingColor my-4 text-center font-kanit text-2xl font-bold">
          Profile setting
        </h1>
        <div className="relative h-48 w-48 overflow-hidden rounded-full duration-150 hover:opacity-90">
          {selectedImage && (
            <label for="file-input">
              <img
                alt="not found"
                src={selectedImage}
                className="mx-auto h-48 w-48 cursor-pointer rounded-full object-cover hover:opacity-80"
              />
              <div className="absolute top-0 right-0 h-48 w-48 cursor-pointer rounded-full text-2xl text-slate-500 opacity-0 duration-150 hover:opacity-90">
                <BiEditAlt className="absolute top-7 right-7" />
              </div>
            </label>
          )}
          {selectedImage === null && (
            <label for="file-input">
              <img
                alt="not found"
                src="https://www.concilioexpert.com/wp-content/uploads/2017/12/blank-profile-picture-973460-1024x1024.png"
                className="mx-auto object-cover"
              />
              <div className="absolute top-0 right-0 h-48 w-48 cursor-pointer rounded-full text-2xl text-slate-500 opacity-0 duration-150 hover:opacity-90">
                <BiEditAlt className="absolute top-7 right-7" />
              </div>
            </label>
          )}
          <input
            id="file-input"
            type="file"
            name="myImage"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="mt-10 flex flex-col space-y-4">
          <div className="flex flex-row space-x-5">
            <div className="my-auto w-1/3">Email</div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500 p-2"
              id="email"
              placeholder="example@email.com"
              defaultValue={email}
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
              defaultValue={licenseId}
            />
          </div>
          <div className="flex flex-row space-x-5">
            <div className="my-auto w-1/3">Contact</div>
            <input
              type="tel"
              className="flex h-[45px] w-3/5 items-center rounded-lg border-2 border-slate-500 p-2"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="xxx-xxx-xxxx"
              maxLength={16}
              minLength={16}
              onKeyDown={enforceFormat}
              onKeyUp={formatToPhone}
              defaultValue={contact}
            />
          </div>
          <label for="background" className="mx-auto">
            Background
          </label>
          <textarea
            onChange={(e) => {}}
            className="flex min-h-[120px] items-center rounded-lg border-2 border-slate-500 p-2"
            maxLength={130}
            name="background"
            id="background"
            placeholder="Background"
            defaultValue={background}
          />
          <button className="button mx-auto w-1/2 py-2 " type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
export default ProfileSetting;
