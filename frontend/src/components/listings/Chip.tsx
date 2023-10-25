interface ChipProps {
  name: string;
  currentType: string;
  onCurrentType: (name: string) => void;
}

const Chip: React.FC<ChipProps> = ({ name, currentType, onCurrentType }) => {
  const active = name === currentType;

  return (
    <div
      className={`flex items-center justify-center px-4 py-1 rounded-xl  font-medium min-w-[100px] cursor-pointer
        ${active ? "text-white" : ""}
        ${active ? "bg-emerald-400" : "bg-zinc-300"}
        ${active ? "hover:shadow-md" : "hover:ring-1 hover:ring-emerald-400"}
      `}
      onClick={() => onCurrentType(name)}
    >
      {name ? name : "Tất cả"}
    </div>
  );
};

export default Chip;
