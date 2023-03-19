const Post = () => {
  const PatienData = [
    {
      gender: "Female",
      illness: "metal health",
      issue: "Burnout Issue",
      need: "Need Therapy",
      time: "20/Mar/2023",
      location: "Online",
      cause:
        "I don’t feel like working in Bangkok anymore. Working here is exhausting. Traffic jam and pollution makes me sick of waking in the morning.",
      hour: 1,
      cost: 1200,
    },
    {
      gender: "Male",
      illness: "Depression",
      issue: "Depression",
      need: "Need Help",
      time: "16/Mar/2023",
      location: "Offline",
      cause:"I don’t see value in myself anymore. No one I can talk to and I need help. I don’t want to live but I don’t want to die either. It is so tiring dealing with people don’t understand me.",
      hour: 1/2,
      cost: 900,
    },
  ];
  return (
    <>
      <div className="bg-red-200">
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};
export default Post;
