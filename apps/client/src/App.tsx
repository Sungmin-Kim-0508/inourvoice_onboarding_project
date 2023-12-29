import React from "react";
import { ChatRoom } from "./Chatroom./container";

function App() {
  return (
    <main className="w-full flex">
      <aside className="min-h-screen max-w-[260px] min-w-[260px] h-full">
        {/* Sidebar */}
      </aside>
      <div className="bg-zinc-800 flex flex-col w-full border-l border-zinc-600">
        <header className="h-[48px] px-3 py-[10px] text-zinc-300 border-b border-zinc-600">
          <h2 className="text-lg"># 공지 (임시 텍스트입니다)</h2>
        </header>
        <ChatRoom />
      </div>
    </main>
  );
}

export default App;
