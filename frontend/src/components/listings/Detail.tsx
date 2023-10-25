import parse from "html-react-parser";

interface DetailProps {
  description: string;
}

const Detail: React.FC<DetailProps> = ({ description }) => {
  return (
    <section className="text-slate-500 font-medium space-y-2 p-3 max-h-[500px] overflow-auto">
      {parse(description)}
    </section>
  );
};

export default Detail;
