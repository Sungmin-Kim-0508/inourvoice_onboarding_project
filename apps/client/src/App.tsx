import React, { useEffect, useState } from "react";
import { ChatRoom } from "./Chatroom./container";
import { useParams } from "react-router-dom";

import { Sidebar } from "./Sidebar";
import { ChatRoomHeader } from "./Chatroom./container/Header";
import { Channel } from "./Login/modules/types/Channel";
import { socket, socketGroup } from "./socket";

function App() {
  const { channelId } = useParams();

  // * 소켓 연동 전에 임의로 msw에서 데이터를 가져왔습니다. 소켓 통신 후 제거 예정입니다.
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const leavePage = () => {
      socket.disconnect();
      socketGroup.disconnect();
    };

    window.addEventListener("unload", leavePage);
    return () => {
      window.removeEventListener("unload", leavePage);
    };
  }, []);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        /** MEMO: 이전 코드
         * const response = await fetch(
            `${
              import.meta.env.MODE === "production"
                ? "https://inourvoice.com/channel"
                : "http://localhost:8000/channel"
            }`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
  
          const data = await response.json();
         */

        // TODO: socket으로 리팩토링
        const data = localStorage.getItem("user");
        if (!data) return;

        const { _id, channels } = JSON.parse(data);
        if (_id) return setChannels(channels);
      } catch (error) {
        console.log(`FetchChannels Error: ${error}`);
      }
    };

    fetchChannels();
  }, []);

  const currentChannel = channels.find((channel) => channel._id === channelId);

  return (
    <main className="w-full flex">
      <aside className="min-h-screen max-w-[260px] min-w-[260px] h-full">
        <Sidebar channels={channels} />
      </aside>
      {currentChannel && (
        <div className="bg-zinc-800 flex flex-col w-full border-l border-zinc-600">
          <ChatRoomHeader title={currentChannel.title} />
          <ChatRoom channel={currentChannel} />
        </div>
      )}
    </main>
  );
}

export default App;
