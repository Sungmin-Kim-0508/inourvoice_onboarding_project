import { HashtagIcon } from "@repo/ui/components/HashtagIcon";
import React from "react";

export function ChatRoomHeader({ title }: { title: string }) {
  return (
    <header className="h-[48px] px-3 py-[10px] text-zinc-300 border-b border-zinc-600">
      <h2 className="text-lg font-bold flex items-center leading-[21.6px] text-zinc-300">
        <HashtagIcon className="w-[20px] h-[20px] fill-zinc-300" />
        {title}
      </h2>
    </header>
  );
}
