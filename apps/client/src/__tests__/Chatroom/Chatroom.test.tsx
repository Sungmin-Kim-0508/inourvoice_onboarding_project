import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Editor } from "../../Chatroom./container/Editor";
import { ChatRoomHeader } from "../../Chatroom./container/Header";
import { ChatroomInfo } from "../../Chatroom./container/ChatHistory/ChatroomInfo";

vi.mock("@repo/ui/components/HashtagIcon", () => {
  return {
    HashtagIcon: () => <div>Mocked HashtagIcon</div>,
  };
});

vi.mock("/src/Chatroom./container/Editor/icons.ts", () => {
  return {
    BoldIcon: () => <div>Mocked BoldIcon</div>,
    UnderlineIcon: () => <div>Mocked UnderlineIcon</div>,
    ItalicIcon: () => <div>Mocked ItalicIcon</div>,
    ListIcon: () => <div>Mocked ListIcon</div>,
    LoaderIcon: () => <div>Mocked LoaderIcon</div>,
  };
});

describe("Chatroom", () => {
  it("ChatRoomHeader가 전달받은 title을 올바르게 표시한다", () => {
    const title = "Test Title";
    const { getByText } = render(<ChatRoomHeader title={title} />);

    expect(getByText(title)).toBeInTheDocument();
  });

  it("ChatRoomInfo가 전달 받은 채팅방 정보를 올바르게 표시한다", () => {
    const mockProps = {
      title: "테스트 채널",
      creator: "홍길동",
      createdAt: "2021-01-01T00:00:00.000Z",
      description: "이것은 테스트 채널입니다.",
      hasMessages: true,
    };

    const { getByText } = render(<ChatroomInfo {...mockProps} />);

    expect(getByText(mockProps.title)).toBeInTheDocument();

    const creatorRegex = new RegExp(mockProps.creator, "i");
    expect(getByText(creatorRegex)).toBeInTheDocument();

    const createdAtRegex = new RegExp("2021년 1월 1일", "i");
    expect(getByText(createdAtRegex)).toBeInTheDocument();

    if (mockProps.description) {
      const descriptionRegex = new RegExp(mockProps.description, "i");
      expect(getByText(descriptionRegex)).toBeInTheDocument();
    }
  });

  it("Editor 컴포넌트가 렌더링 된다.", () => {
    const { container } = render(<Editor />);
    expect(container).toMatchSnapshot();
  });
});
