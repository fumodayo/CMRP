import { useState } from "react";

const series = {
  data: [
    {
      name: "NEG",
      value: 120,
    },
    {
      name: "POS",
      value: 98,
    },
    {
      name: "REG",
      value: 225,
    },
  ],
};

const colorMap = {
  NEG: "bg-blue-500",
  POS: "bg-yellow-500",
  REG: "bg-green-500",
};

const Chart = () => {
  const [hovered, setHovered] = useState(null);

  const total = series.data.reduce((acc, val) => acc + val.value, 0);
  const percentages = series.data.map((value) => (value.value / total) * 100);

  const handleHover = (index) => {
    setHovered(index);
  };

  return (
    <div className="flex items-center">
      {series.data.map((value, index) => (
        <div
          key={index}
          className={`relative h-12 ${
            colorMap[value.name]
          } border-r border-white`}
          style={{ width: `${percentages[index]}%` }}
          onMouseOver={() => handleHover(index)}
          onMouseOut={() => setHovered(null)}
        >
          {hovered === index && (
            <div className="absolute top-0 left-0 w-full h-full p-2 bg-white bg-opacity-75">
              <p>{`${value.name}: ${value.value}, ${percentages[index].toFixed(
                2
              )}%`}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chart;
