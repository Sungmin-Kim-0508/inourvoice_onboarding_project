import React from "react";
import { ReactionButton } from "./ReactionButton";

export function ActionContainer() {
  const reactions = [
    { icon: "✅", onClick: () => console.log("체크 클릭") },
    {
      icon: "👍",
      onClick: () => console.log("엄지 클릭"),
    },
    {
      icon: "😢",
      onClick: () => console.log("눈물 클릭"),
    },
  ];

  return (
    <div className="group-hover:flex hidden p-[2px] bg-zinc-800 rounded border border-[#A1A1AA80] w-fit absolute -top-[18px] right-[5px]">
      {reactions.map(({ icon, onClick }, index) => (
        <ReactionButton key={index} icon={icon} onClick={onClick} />
      ))}
      <button
        className="hover:bg-[#3F3F4640] h-8 rounded text-zinc-300 px-[6px]"
        onClick={() => console.log("삭제 클릭")}
      >
        삭제
      </button>
    </div>
  );
}
