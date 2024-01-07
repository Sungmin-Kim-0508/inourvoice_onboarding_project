import React from "react";
import { Editor } from "./Editor";
import { ChatHistory } from "./ChatHistory";
import { ChannelAttributes } from "../../common/modules/types/Channel";

export function ChatRoom({ channel }: { channel: ChannelAttributes }) {
  return (
    <div className="w-full flex flex-col justify-end h-[calc(100vh-48px)]">
      <ChatHistory {...channel} />
      <Editor />
    </div>
  );
}
