import React, { useEffect, useRef, useState } from "react";
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
import { LoaderIcon } from "./icons";

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
  const editorRef = useRef<HTMLDivElement>(null);

  // View 구현을 위해 임시적으로 메세지를 상태에 저장합니다. 추후 api 연동 시 변동 예정입니다.
  const [message, setMessage] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 메세지 전송 시 보이는 Loader 확인을 위한 임시 상태

  const handleChange = (parsedHtml: string) => {
    setMessage(parsedHtml);
  };

  const handleClickSend = () => {
    // TODO: 전송중일떄 로딩바 처리
    // TODO: 소켓으로 서버에 메시지 전송 -> 전송된 메세지 UI에 업데이트
    // TODO: 에디터 클리어
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target instanceof Node &&
        editorRef.current.contains(event.target)
      ) {
        setIsFocused(true);
        return;
      }

      setIsFocused(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [editorRef]);

  return (
    <section className="px-5 pb-6">
      <div
        ref={editorRef}
        className={`relative border p-2 rounded-lg flex flex-col gap-[3px] ${
          isFocused
            ? "border-zinc-400 bg-[#2C2C30]"
            : "border-zinc-600 bg-[#3F3F4633]"
        }`}
      >
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin isFocused={isFocused} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="text-zinc-300 outline-none px-[6px] py-[10px] z-10" />
            }
            placeholder={
              <div className="text-zinc-500 absolute top-[51px] left-[14px]">
                #공지에 메시지 보내기 (채팅방 이름에 따라 변경되게 추후 수정)
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <div className="flex justify-end">
            <button
              onClick={handleClickSend}
              disabled={message.length <= 11}
              className="flex justify-center items-center px-2 py-[2px] font-semibold bg-green-700 hover:bg-green-600 disabled:bg-transparent text-white rounded disabled:text-zinc-500 w-[58px] h-7"
            >
              {isLoading ? (
                <LoaderIcon className="fill-white animate-spin" />
              ) : (
                "보내기"
              )}
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
