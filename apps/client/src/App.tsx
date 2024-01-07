import React, { useEffect, useState } from "react";
import { ChatRoom } from "./Chatroom./container";
import { useParams } from "react-router-dom";
import { ChannelAttributes } from "./common/modules/types/Channel";
import { Sidebar } from "./Sidebar";
import { io } from "socket.io-client";
import { HashtagIcon } from "@repo/ui/components/HashtagIcon";

function App() {
  const { channelId } = useParams();

  // * 소켓 연동 전에 임의로 msw에서 데이터를 가져왔습니다. 소켓 통신 후 제거 예정입니다.
  const [channels, setChannels] = useState<ChannelAttributes[]>([]);

  const fetchChannels = async () => {
    try {
      const response = await fetch("https://inourvoice.com/channel");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setChannels(data);
    } catch (error) {
      console.log(`FetchChannels Error: ${error}`);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const currentChannel = channels.find((channel) => channel._id === channelId);

  return (
    <main className="w-full flex">
      <aside className="min-h-screen max-w-[260px] min-w-[260px] h-full">
        <Sidebar />
      </aside>
      {currentChannel && (
        <div className="bg-zinc-800 flex flex-col w-full border-l border-zinc-600">
          <header className="h-[48px] px-3 py-[10px] text-zinc-300 border-b border-zinc-600">
            <h2 className="text-lg font-bold flex items-center leading-[21.6px] text-zinc-300">
              <HashtagIcon className="w-[20px] h-[20px] fill-zinc-300" />
              {currentChannel.title}
            </h2>
          </header>
          <ChatRoom channel={currentChannel} />
        </div>
      )}
    </main>
  );
}

export default App;
