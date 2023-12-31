import React, { useState } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ListItemNode, ListNode } from "@lexical/list";
import { SericalizePlugin } from "./plugins/SericalizePlugin";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";

const initialConfig: InitialConfigType = {
  namespace: "MessageEditor",
  onError: (error: Error) => console.log(error),
  theme: {
    // 에디터 내의 각 태그에 대한 클래스명을 부여하는 객체입니다.
    text: {
      bold: "message-bold",
      italic: "message-italic",
      underline: "message-underline",
    },
    list: {
      ul: "message-ul",
      listitem: "message-li",
      nested: {
        listitem: "message-nested-prev-li",
      },
    },
  },
  nodes: [ListNode, ListItemNode],
};

export function Editor() {
  // View 구현을 위해 임시적으로 메세지를 상태에 저장합니다. 추후 api 연동 시 변동 예정입니다.
  const [message, setMessage] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (parsedHtml: string) => {
    setMessage(parsedHtml);
  };

  const handleClickSend = () => {
    // TODO: 보내기 버튼 클릭 시 event 처리
    // TODO: 전송중일떄 로딩바 처리
  };

  const handleFocus = (action: "focused" | "focusOut") => {
    if (action === "focused") {
      setIsFocused(true);
      return;
    }
    setIsFocused(false);
  };

  return (
    <section className="px-5 pb-6">
      <div
        className={`relative border p-2 rounded-lg flex flex-col gap-[3px] ${
          isFocused ? "border-zinc-400" : "border-zinc-600"
        }`}
      >
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin isFocused={isFocused} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                onFocus={() => handleFocus("focused")}
                onBlur={() => handleFocus("focusOut")}
                className="text-zinc-300 outline-none px-[6px] py-[10px] z-10"
              />
            }
            placeholder={
              <div className="text-zinc-500 absolute top-[45px] left-[14px]">
                #공지에 메시지 보내기 (채팅방 이름에 따라 변경되게 추후 수정)
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <div className="flex justify-end">
            <button
              onClick={handleClickSend}
              disabled={message.length <= 11}
              className="bg-green-700 text-white py-[2px] px-2 w-fit rounded-[4px] disabled:bg-transparent disabled:text-zinc-500"
            >
              보내기
            </button>
          </div>
          <SericalizePlugin onChange={handleChange} />
          <HistoryPlugin />
          <TabIndentationPlugin />
        </LexicalComposer>
      </div>
    </section>
  );
}
