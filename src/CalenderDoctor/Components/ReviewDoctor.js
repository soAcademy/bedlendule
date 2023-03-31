import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Rating } from "primereact/rating";
import ConfirmPopup from "./ConfirmPopup";
import axios from "axios";
import useSendingPopup from "../Hooks/useSendingPopup";
import useSubmitResult from "../Hooks/useSubmitResult";
import { useNavigate } from "react-router-dom";

const ReviewDoctor = ({
  setOpenReview,
  openReview,
  requestId,
  setUpdated,
  updated,
  timeSlotId,
}) => {
  const [score, setScore] = useState(0);
  const [review, setReview] = useState();
  const [confirmReview, setConfirmReview] = useState(false);
  const { setSending, SendingPopup } = useSendingPopup();
  const redirect = useNavigate()
  const { ResultPopup, setSubmitFailPopUp, setSubmitSuccessPopUp } =
    useSubmitResult({
      successAction: () => {
        setOpenReview(false);
        setUpdated(!updated);
      },
      failedAction: () => {
        setOpenReview(false);
        setUpdated(!updated);
      },
    });
  const introduction =
    "Review doctor for others to learn more about your experience";
  const handleSubmit = (event) => {
    event.preventDefault();
    setConfirmReview(true);
    const _data = { review, score, requestId, timeSlotId };
  };
  const submitReview = () => {
    setSending(true);
    setConfirmReview(false);
    let data = JSON.stringify({
      requestId: requestId,
      score: score,
      review: review,
      timeSlotId: timeSlotId,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bedlendule-backend.vercel.app/bedlendule/createReview",
      headers: {
        "Content-Type": "application/json",
        'authorization': localStorage.getItem('access-token')
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setSending(false);
        response.status === 200
          ? setSubmitSuccessPopUp(true)
          : setSubmitFailPopUp(true);
      })
      .catch((error) => {
        console.log(error);
        setSending(false);
        setSubmitFailPopUp(true);
        if (error.response.status === 401) {
          redirect("/login");
        }
      });
  };

  return (
    <>
      <form
        className={`popup w-11/12 ${
          openReview ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } `}
        onSubmit={handleSubmit}
      >
        <div className="headingColor relative p-4 text-center text-3xl font-bold">
          REVIEW DOCTOR
          <button
            type="button"
            className="absolute -top-2 -right-2 text-2xl text-slate-500 duration-200 hover:text-slate-400 active:text-slate-600"
            onClick={() => setOpenReview(false)}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="">
          <div className="flex text-center md:px-[200px]">
            <Rating
            onIcon={
              <img
                src="/rating-icon-active.png"
                onError={(e) =>
                  (e.target.src =
                    "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                }
                alt="custom-active"
                width="12px"
                height="12px"
              />
            }
            offIcon={
              <img
                src="/rating-icon-inactive.png"
                onError={(e) =>
                  (e.target.src =
                    "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                }
                alt="custom-inactive"
                width="12px"
                height="12px"
              />
            }
              id="rating"
              className="mx-auto"
              value={score}
              onChange={(e) => setScore(e.value)}
              cancel={false}
            />
          </div>
          <div className="my-4 w-full px-4 md:text-center">{introduction}</div>
          <div className="my-2 mx-4 justify-center ">
            <textarea
              id="description"
              className="mx-auto h-[180px] w-[100%] rounded-lg border-2 border-slate-500 p-2"
              placeholder="Your opinion is important"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button className="button mx-[35px] w-[80%] py-2" type="submit">
              REVIEW
            </button>
          </div>
        </div>
      </form>
      <ConfirmPopup
        title={"Submit Review"}
        description={"Confirm submitting a review"}
        action={submitReview}
        state={confirmReview}
        setState={setConfirmReview}
      />
      <SendingPopup />
      <ResultPopup />
    </>
  );
};
export default ReviewDoctor;
