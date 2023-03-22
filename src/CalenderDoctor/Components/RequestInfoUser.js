import ConfirmPopup from "./ConfirmPopup";
import { MdClose } from "react-icons/md";
import { Calendar } from "primereact/calendar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { Rating } from "primereact/rating";

const DoctorProfileUserSide = () => {
  const [reviewScore, setReviewScore] = useState(0);
  const [profile, setProfile] = useState([]);
  console.log("profile", profile);
  console.log("email", profile?.email);
  const mockDoctordata = [
    {
      name: "David Goodman",
      picture:
        "https://vascularcarewa.com.au/wp-content/uploads/2019/10/Doctor-PNG-File-Download-Free.png",
      position: "Psychologist",
      causesDone: 84,
      RateGiven: 4,
      aboutMe:
        "You may not feel like it right now but thats my job. I want to hear every bit of what's going wrong and how it's impacting you now. At the same time we'll work on developing your belief in yourself in order to actually use the coping skills you probably already have.",
      review: [
        {
          text: "She cares so much of my boring story. Her aptitude in the symtoms really makes me confident that she could help me",
          score: 4,
        },
        {
          text: "She cares so much of my boring story. Her aptitude in the symtoms really makes me confident that she could help me",
          score: 3,
        },
      ],
    },
  ];

  useEffect(() => {
    const data = JSON.stringify({
      uuid: "ed6a0bf1-acc5-433d-b244-e597aa3e6b86",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/getUserDetailByUUID",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="mt-[20px]  w-screen ">
        <div className=" w-screen ">
          <div className="mx-auto w-1/2 rounded-lg bg-slate-200 shadow-lg md:w-[200px]">
            <img
              src={profile?.profilePictureUrl}
              className="mx-auto h-[200px] md:w-[200px]"
            />
          </div>
          <div className="headingColor mx-auto w-1/2  pt-4 text-center text-xl">
            <div>{profile?.firstName}</div>
            <div>{profile?.lastName}</div>
          </div>

          <div className="my-3 mx-auto flex  h-[50px]">
            <div className="mx-auto flex w-[300px] gap-2 md:w-[400px] ">
              <div className=" flex w-1/2  ">
                <div className="my-auto">
                  <BsCheckCircleFill className="my-auto w-[50px] text-3xl text-green-500 " />
                </div>
                <div className="w-full ">
                  <div className="text-xl">89</div>
                  <div className="text-sm">Causes Done</div>
                </div>
              </div>
              <div className=" flex w-1/2  ">
                <div className="my-auto">
                  <AiFillStar className="my-auto w-[50px] text-3xl text-yellow-200 " />
                </div>
                <div className="w-full ">
                  <div className="text-xl">4</div>
                  <div className="text-sm">Rate Given</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-5 mb-2 w-[80%] text-xl ">ABOUT</div>
          <div className="ml-8  w-[350px] md:mx-auto md:w-[80%]">
            <div className="mr-5 rounded-lg border-2 border-slate-400 p-2  ">
              &nbsp;&nbsp;{profile.background}
            </div>
          </div>
          <div className="space-y-3  p-4 ">
            {mockDoctordata.map((mockDoctordata, idx) => (
              <div className="ml-4  w-[330px] rounded-lg px-2 shadow-lg drop-shadow-lg md:mx-auto md:w-[80%] ">
                <div className="headingColor text-xl">Review {idx + 1}</div>
                <div className="text-slate-500 ">
                  {mockDoctordata.review[0].text}
                </div>
                <div className="mx-auto ">
                  <div className=" ml-[150px] flex  w-1/2 py-2 pl-10 md:mx-auto md:w-full md:pl-[1100px] ">
                    <div className="w-full">
                      <Rating
                        value={mockDoctordata.review[0].score}
                        readOnly
                        cancel={false}
                        className="text-right text-yellow-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default DoctorProfileUserSide;
