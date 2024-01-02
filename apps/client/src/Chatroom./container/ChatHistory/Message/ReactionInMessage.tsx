import React from "react";

// * Props는 API 연동 시점에 데이터에 맞춰 수정 예정입니다.
interface Props {
  icon: string;
  count: number;
  onClick: () => void;
  isReactedByMe: boolean;
}

export function ReactionInMessage({
  icon,
  count,
  onClick,
  isReactedByMe,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer border rounded-2xl flex w-fit items-center gap-[6px] px-[6px]  ${
        isReactedByMe
          ? "border-sky-700 bg-sky-700"
          : "bg-zinc-700 border-zinc-700 group-hover:border-zinc-600 group-hover:bg-zinc-600 hover:!border-zinc-500"
      } `}
    >
      <span className="text-base">{icon}</span>
      <span className="text-white text-xs">{count}</span>
    </button>
  );
}
