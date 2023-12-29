import React from "react";
import { Editor } from "./Editor";

export function ChatRoom() {
  return (
    <div className="w-full flex flex-col justify-between h-full">
      <section>메세지 보여주는 영역</section>
      <Editor />
    </div>
  );
}
