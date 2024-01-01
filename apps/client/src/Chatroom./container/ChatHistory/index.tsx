import React from "react";
import { Message } from "./Message";
import { ChatroomInfo } from "./ChatroomInfo";

// TODO: [임시 데이터] API 연동 후 제거
const message = [
  {
    id: 0,
    created_at: "오후 12:47 (23.12.27)",
    updated_at: "오후 12:47 (23.12.27)",
    deleted_at: "",
    content: `<p dir="ltr"><span style="white-space: pre-wrap;">입력이 </span><i><em class="message-italic" style="white-space: pre-wrap;">됩니다</em></i><span style="white-space: pre-wrap;">! </span><u><span class="message-underline" style="white-space: pre-wrap;">이런식으로</span></u><span style="white-space: pre-wrap;">~~~</span><br><b><strong class="message-bold" style="white-space: pre-wrap;">에디터는</strong></b><span style="white-space: pre-wrap;"> 생각보다 어렵네요!</span></p>`,
    user: {
      name: "Raven",
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR82df3WGCcdv3o8iKb4sk2pS0slOakeLaeQ&usqp=CAU",
    },
    isHeadOfMessage: true,
  },
  {
    id: 1,
    created_at: "오후 12:47 (23.12.27)",
    updated_at: "오후 12:47 (23.12.27)",
    deleted_at: "",
    content: `<p dir="ltr"><span style="white-space: pre-wrap;">입력이 </span><i><em class="message-italic" style="white-space: pre-wrap;">됩니다</em></i><span style="white-space: pre-wrap;">! </span><u><span class="message-underline" style="white-space: pre-wrap;">아하</span></u><span style="white-space: pre-wrap;">!</span></p>`,
    user: {
      name: "SongCool",
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHRBtGNEEkQ8Kv9Cq3HSGTYd-_yFLgkym1rg&usqp=CAU",
    },
    isHeadOfMessage: true,
  },
  {
    id: 2,
    created_at: "오후 12:47 (23.12.27)",
    updated_at: "오후 12:47 (23.12.27)",
    deleted_at: "",
    content: `<p dir="ltr"><span style="white-space: pre-wrap;">입력이 </span><i><em class="message-italic" style="white-space: pre-wrap;">됩니다</em></i><span style="white-space: pre-wrap;">! </span><u><span class="message-underline" style="white-space: pre-wrap;">아하</span></u><span style="white-space: pre-wrap;">!</span></p>`,
    user: {
      name: "SongCool",
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHRBtGNEEkQ8Kv9Cq3HSGTYd-_yFLgkym1rg&usqp=CAU",
    },
    isHeadOfMessage: false,
  },
];

export function ChatHistory() {
  return (
    <section className="flex flex-col gap-6 py-4">
      <ChatroomInfo />
      <div>
        {message.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </section>
  );
}
