import React from "react";

interface ChipProps {
  types?: { name: string; value: any }[] | string[];
  currentType?: any;
  square?: boolean;
  onCurrentType: (value: any) => void;
}

const Chip: React.FC<ChipProps> = ({
  types,
  square,
  currentType,
  onCurrentType,
}) => {
  return (
    <>
      {/* Chip cho "Tất cả" */}
      <div
        className={`flex items-center justify-center px-4 py-1 font-medium min-w-[100px] cursor-pointer
          ${
            currentType === ""
              ? "text-white bg-emerald-400 hover:shadow-md"
              : "bg-zinc-300 hover:ring-1 hover:ring-emerald-400"
          }
          ${square ? "rounded-none" : "rounded-xl"}
        `}
        onClick={() => onCurrentType("")}
      >
        Tất cả
      </div>

      {/* Các Chip từ mảng types */}
      {Array.isArray(types) &&
        types.map((item: any) => {
          const active = item === currentType || item.value === currentType;
          return (
            <div
              key={item.value || item}
              className={`flex items-center justify-center px-4 py-1 font-medium min-w-[100px] cursor-pointer
                ${
                  active
                    ? "text-white bg-emerald-400 hover:shadow-md"
                    : "bg-zinc-300 hover:ring-1 hover:ring-emerald-400"
                }
                ${square ? "rounded-none" : "rounded-xl"}
              `}
              onClick={() => onCurrentType(item.value || item)}
            >
              {item.name || item}
            </div>
          );
        })}
    </>
  );
};

export default Chip;
