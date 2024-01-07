import React from "react";
import { HashtagIcon } from "@repo/ui/components/HashtagIcon";

interface Props {
  title: string;
  creator: string;
  createdAt: string;
  description: string | null;
  hasMessages: boolean;
}

export function ChatroomInfo({
  title,
  creator,
  createdAt,
  description,
  hasMessages,
}: Props) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div
      className={`flex flex-col gap-2 py-6 px-5 ${
        hasMessages ? "border-b border-zinc-600" : ""
      }`}
    >
      <h2 className="flex text-zinc-300 text-3xl font-semibold items-center">
        <HashtagIcon className="w-[30px] h-[30px] fill-zinc-300" /> {title}
      </h2>
      <div className="text-lg text-zinc-300">
        <p>{`채널 생성자: ${creator}`}</p>
        <p>{`생성 날짜: ${formatDate(createdAt)}`}</p>
        {description && <p>{`설명: ${description}`}</p>}
      </div>
    </div>
  );
}
