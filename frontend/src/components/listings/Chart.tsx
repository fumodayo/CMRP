const colorMap = {
  "TIÊU CỰC": "bg-red-500",
  "TÍCH CỰC": "bg-blue-500",
  "TRUNG LẬP": "bg-gray-500",
};

const Chart = ({ sentimentRating }) => {
  const total = sentimentRating.reduce((acc, val) => acc + val.value, 0);
  const percentages = sentimentRating.map(
    (value) => (value.value / total) * 100
  );

  return (
    <div className="flex items-center">
      <p className="min-w-[150px] font-medium">Tổng: {total} đánh giá</p>
      {sentimentRating.map((value, index) => (
        <div
          key={index}
          className={`relative h-20 rounded-md ${
            colorMap[value.name.toUpperCase()] || ""
          } border-r border-white`}
          style={{ width: `${percentages[index]}%` }}
        >
          <div className="absolute top-0 left-0 w-full h-full px-3 py-3 bg-white bg-opacity-10 font-medium text-sm text-white">
            <p className="uppercase">{value.name}</p>
            <p>{value.value} đánh giá </p>
            <p> {percentages[index].toFixed(2)}%</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chart;
