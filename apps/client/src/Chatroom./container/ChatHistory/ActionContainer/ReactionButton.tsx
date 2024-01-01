import React from "react";

interface Props {
  icon: string;
  onClick: () => void;
}

export function ReactionButton({ icon, onClick }: Props) {
  return (
    <button
      className="hover:bg-[#3F3F4640] flex items-center justify-center text-base rounded text-zinc-300 w-[30px]"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
