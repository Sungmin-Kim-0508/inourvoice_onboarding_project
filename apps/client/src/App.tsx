import React from "react";

function App() {
  return (
    <main className="w-full bg-zinc-900 flex">
      <aside className="min-h-screen max-w-[260px] min-w-[260px] h-full">
        {/* Sidebar */}
      </aside>
      <div className="bg-zinc-800 w-full border-l border-zinc-600">
        <header className="h-[48px] px-3 py-[10px] text-zinc-300 border-b border-zinc-600">
          <h2 className="text-lg"># 공지 (임시 텍스트입니다)</h2>
        </header>
        <div className="w-full">{/* Chat Room */}</div>
      </div>
    </main>
  );
}

export default App;
