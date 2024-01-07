import React, { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { ChatroomInfo } from "./ChatroomInfo";
import { ChannelAttributes } from "../../../common/modules/types/Channel";
import { ChatroomScrollbar } from "./ChatroomScrollbar";

export function ChatHistory({
  _id,
  title,
  description,
  creator,
  created_at,
  messages,
}: ChannelAttributes) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const hasMessages = messages.length > 0;

  // 데이터가 가져와진 후의 UI를 기준으로 커스텀 스크롤바를 그리기 위해 isLoading 값을 알아야해서 만든 임의 로직입니다.
  // 소켓 연결 후 데이터를 가져올 때 isLoading 로직 별도 구현 예정입니다.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 100);

    return () => clearTimeout(timer);
  });

  return (
    <section
      ref={sectionRef}
      className={`chat-history-section relative flex flex-col gap-6 overflow-y-scroll ${
        hasMessages ? "py-4" : ""
      }`}
    >
      <ChatroomInfo
        title={title}
        description={description}
        createdAt={created_at}
        creator={creator.name}
        hasMessages={hasMessages}
      />
      <div>
        {messages.map((message) => (
          <Message key={message._id} {...message} />
        ))}
      </div>
      <ChatroomScrollbar
        isLoading={isLoading}
        sectionElement={sectionRef.current}
      />
    </section>
  );
}
