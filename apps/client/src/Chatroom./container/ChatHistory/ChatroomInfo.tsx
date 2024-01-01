import React from "react";
import { HashtagIcon } from "@repo/ui/components/HashtagIcon";

// TODO: [임시 데이터] API 연동 후 제거
const channel = {
  title: "공지",
  created_at: "2023년 12월 23일",
  created_by: "Raven",
  description: "공지사항을 위한 방입니다! 사적인 대화는 삼가해주세요!",
};

export function ChatroomInfo() {
  // TODO: 데이터 연동 후 메세지 없는 경우 하단 border 스타일 제거
  return (
    <div className="flex flex-col gap-2 py-6 px-5 border-b border-zinc-600">
      <h2 className="flex text-zinc-300 text-3xl font-semibold items-center">
        <HashtagIcon className="w-[30px] h-[30px] fill-zinc-300" /> 공지
      </h2>
      <div className="text-lg text-zinc-300">
        <p>{`채널 생성자: ${channel.created_by}`}</p>
        <p>{`생성 날짜: ${channel.created_at}`}</p>
        <p>{`설명: ${channel.description}`}</p>
      </div>
    </div>
  );
}
