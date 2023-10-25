import { useState, useEffect } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onCurrentPage: (currentPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onCurrentPage,
}) => {
  const [current, setCurrentPage] = useState(currentPage);

  const handlePreviousPage = () => {
    if (current > 1) setCurrentPage(current - 1);
  };

  const handleNextPage = () => {
    if (current < totalPage) setCurrentPage(current + 1);
  };

  const pageNumbers = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );

  useEffect(() => {
    onCurrentPage(current);
  }, [current]);

  return (
    <div className="flex items-center justify-center space-x-3 cursor-pointer">
      <GrFormPrevious size={25} onClick={handlePreviousPage} />
      {pageNumbers.map((page) => (
        <div
          key={page}
          className={`flex justify-center items-center w-[50px] h-[50px] ${
            currentPage === page
              ? "bg-emerald-400 rounded-lg text-white"
              : "bg-emerald-400/10 rounded-lg text-emerald-400 hover:bg-emerald-200"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </div>
      ))}
      <GrFormNext size={25} onClick={handleNextPage} />
    </div>
  );
};

export default Pagination;
