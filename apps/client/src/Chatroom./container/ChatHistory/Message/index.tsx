import React from "react";
import { ActionContainer } from "../ActionContainer";
import { ReactionInMessage } from "./ReactionInMessage";
import { ProfileWrapper } from "./ProfileWrapper";
import { NameWithDate } from "./NameWithDate";

import { Message as MessageType } from "../../../../Login/modules/types/Message";

const reactionsInMessage = [
  {
    icon: "✅",
    count: 2,
    onClick: () => console.log("✅"),
    isReactionByMe: false,
  },
  {
    icon: "👍",
    count: 1,
    onClick: () => console.log("👍"),
    isReactionByMe: true,
  },
  {
    icon: "🥲",
    count: 4,
    onClick: () => console.log("🥲"),
    isReactionByMe: false,
  },
];

//ERROR: name, profile 에러
export function Message({
  content,
  created_at,
  member: { name, profile },
}: MessageType) {
  const isHeadOfMessage = true; // 소켓 연결 후 관련 로직 작성 예정

  return (
    <div className="flex gap-[6px] px-[18px] py-[3px] hover:bg-zinc-700 relative group">
      <ProfileWrapper profile={isHeadOfMessage ? profile : undefined} />
      <div>
        {isHeadOfMessage && (
          <NameWithDate name={name} created_at={created_at} />
        )}
        <div
          className="text-zinc-300"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="flex gap-1 py-[3px]">
          {/* 임의로 View를 그리기 위해 배치해놓은 리액션 이모지 레이아웃입니다. (API 연동 시 변경 예정) */}
          {reactionsInMessage.map(
            ({ icon, count, onClick, isReactionByMe }, index) => (
              <ReactionInMessage
                key={index}
                icon={icon}
                count={count}
                onClick={onClick}
                isReactedByMe={isReactionByMe}
              />
            )
          )}
        </div>
      </div>
      <ActionContainer />
    </div>
  );
}
