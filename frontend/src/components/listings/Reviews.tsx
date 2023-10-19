import Comment from "./Comment";

const Reviews = () => {
  const reviews = [
    {
      name: "Nguyễn Quang Dũng",
      avatar: "/images/avatar.png",
      rating: 4.3,
      time: "1 Month Ago",
      content: `Thầy dạy rất có tâm và có tầm, nhờ thầy mà mình đã có được kiến thực cơ
            bản để tiếp tục ôn thi.`,
    },
    {
      name: "Hoài Thương",
      avatar: "/images/avatar.png",
      rating: 3.2,
      time: "28 Days Ago",
      content: `Lộ trình rõ ràng, highly recomen cho mấy e khoá sau nhe. `,
    },
  ];

  return (
    <div className="space-y-5">
      {reviews.map((item) => (
        <Comment
          name={item.name}
          avatar={item.avatar}
          rating={item.rating}
          time={item.time}
          content={item.content}
        />
      ))}
    </div>
  );
};

export default Reviews;
