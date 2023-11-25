import parse from "html-react-parser";

const Detail = ({ description, requirement }) => {
  return (
    <section className="text-slate-500 font-medium space-y-2 p-3 max-h-[500px] overflow-auto">
      {parse(description)}
      {parse(requirement)}
    </section>
  );
};

export default Detail;
