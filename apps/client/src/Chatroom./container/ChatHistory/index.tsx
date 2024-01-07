import React, { useRef } from "react";
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

  const isLoading = false;
  const hasMessages = messages.length > 0;

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
