import React from "react";
import tw from "tailwind-styled-components";
import { Section } from "./Section";
import { Header } from "./Header";
import { Hashtag } from "./icons";

// 임시 리스트
const channelListItems = [
  { name: "공지" },
  { name: "몰리나" },
  { name: "온보딩" },
  { name: "펀트" },
  { name: "잡담" },
  { name: "질문" },
];

// TODO: 채널 리스트를 받아오는 Sidebar props 추가
export function Sidebar() {
  return (
    <Container>
      <Header />
      <Section
        list={{ items: channelListItems, icon: <Hashtag /> }}
        headingLabel="채널"
        addingLabel="채널 추가"
      />
    </Container>
  );
}

const Container = tw.div`
  pt-[10px]
  px-2
`;
