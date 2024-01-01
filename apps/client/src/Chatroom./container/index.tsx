import React from "react";
import { Editor } from "./Editor";
import { ChatHistory } from "./ChatHistory";

export function ChatRoom() {
  return (
    <div className="w-full flex flex-col justify-end h-full">
      <ChatHistory />
      <Editor />
    </div>
  );
}
