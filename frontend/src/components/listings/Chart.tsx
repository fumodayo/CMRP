import { useState } from "react";

const colorMap = {
  "TIÊU CỰC": "bg-blue-500",
  "TÍCH CỰC": "bg-yellow-500",
  "TRUNG LẬP": "bg-green-500",
};

const Chart = ({ sentimentRating }) => {
  const [hovered, setHovered] = useState(null);

  const total = sentimentRating.reduce((acc, val) => acc + val.value, 0);
  const percentages = sentimentRating.map(
    (value) => (value.value / total) * 100
  );

  const handleHover = (index) => {
    setHovered(index);
  };

  return (
    <div className="flex items-center">
      {sentimentRating.map((value, index) => (
        <div
          key={index}
          className={`relative h-16 rounded-md ${
            colorMap[value.name.toUpperCase()] || ""
          } border-r border-white`}
          style={{ width: `${percentages[index]}%` }}
          onMouseOver={() => handleHover(index)}
          onMouseOut={() => setHovered(null)}
        >
          {hovered === index && (
            <div className="absolute top-0 left-0 w-full h-full p-1 bg-white bg-opacity-75 font-medium text-sm">
              <p>
                Có {value.value} đánh giá: {value.name}
              </p>
              <p>Chiếm: {percentages[index].toFixed(2)}% </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chart;
