import { formatPrice } from "../../utils/formatPrice";

const History = () => {
  const header = ["Thời gian", "Số tiền", "Khóa học"];
  const items = [
    {
      time: "08-10-2023",
      price: 1000000,
      name: "Full Stack Developer",
    },
    {
      time: "09-10-2023",
      price: 49000,
      name: "Nhạc lý cơ bản",
    },
  ];

  return (
    <div className="p-5 my-5 bg-neutral-100">
      <table className="min-w-full table-auto text-left text-neutral-700">
        <thead className="text-neutral-900">
          <tr>
            {header.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.time}</td>
              <td>{item.price && formatPrice(item.price)}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
