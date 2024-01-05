import React, { useRef } from "react";
import { Message } from "./Message";
import { ChatroomInfo } from "./ChatroomInfo";
import { useGetMessages } from "../../modules/hooks/useGetMessages";
import { ChannelAttributes } from "../../../common/modules/types/Channel";
import { ChatroomScrollbar } from "./ChatroomScrollbar";

export function ChatHistory({
  _id,
  title,
  description,
  created_by,
  createdAt,
  connected_user,
}: ChannelAttributes) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { messages, error, isLoading } = useGetMessages({
    channelId: _id,
    connectedUser: connected_user,
  });

  return (
    <section
      ref={sectionRef}
      className="chat-history-section relative flex flex-col gap-6 py-4 overflow-y-scroll"
    >
      <ChatroomInfo
        title={title}
        description={description}
        createdAt={createdAt}
        createdBy={created_by}
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
