import React from "react";
import { Editor } from "./Editor";
import { ChatHistory } from "./ChatHistory";
import { Channel } from "../../Login/modules/types/Channel";

export function ChatRoom({ channel }: { channel: Channel }) {
  return (
    <div className="w-full flex flex-col justify-end h-[calc(100vh-48px)]">
      <ChatHistory {...channel} />
      <Editor />
    </div>
  );
}
