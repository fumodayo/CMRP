const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-[90px] 2xl:mx-[280px] my-5 min-h-screen">{children}</div>
  );
};

export default Container;
