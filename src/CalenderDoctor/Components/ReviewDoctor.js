import { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
const ReviewDoctor = ({ setPage }) => {
  const [reviewStar, setReviewStar] = useState(0);
  const [review, setReview] = useState();
  const [formData, setSetFormData] = useState();
  const introduction =
    "Review you doctor for others to learn more about your experience";
  // console.log("reviewStar", reviewStar);
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Review", review, reviewStar);
    const _data = { review: review, score: reviewStar };
    setSetFormData(_data);
    console.log("formData", formData);
  };

  return (
    <>
      <form className="h-screen w-screen" onSubmit={handleSubmit}>
        <div className="mx-5 my-[200px]  h-1/2 rounded-lg   shadow-lg md:mx-auto md:w-1/2">
          <div className="headingColor  relative p-4 text-center text-3xl font-bold">
            REVIEW DOCTOR
            <div
              className="absolute top-4 right-5 float-right text-2xl font-light text-slate-500"
              onClick={() => setPage("landing")}
            >
              x
            </div>
          </div>
          <div className="my-2 mx-auto h-[35px]  w-2/3 px-4 text-xl">
            <div className="mx-auto  pl-[40px] text-center md:px-[200px] ">
              <Rating
                id="rating"
                className=""
                value={reviewStar}
                onChange={(e) => setReviewStar(e.value)}
                cancel={false}
              />
            </div>
          </div>
          <div className="w-full px-4 md:text-center">{introduction}</div>
          <div className="my-2 mx-4 justify-center ">
            <textarea
              id="description"
              className="mx-auto h-[180px] w-[100%] rounded-lg border-2 border-slate-500 p-2"
              placeholder="Your opinion is important"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center  ">
            <button className="button mx-[35px] w-[80%] py-2 " type="submit">
              REVIEW
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default ReviewDoctor;
