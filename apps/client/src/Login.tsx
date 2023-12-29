import React from "react";
import tw from "tailwind-styled-components";
import { Flex, Input, Text } from "@repo/ui";

function Login() {
  return (
    <Flex
      flex_direction="flex-col"
      className="h-screen px-7 text-white bg-zinc-800"
    >
      {/* TODO: 로고 추가 */}
      <Text className="text-4xl mb-11">관리 페이지</Text>
      <Text className="mb-2">아이디</Text>
      <Input type="email" className="mb-6" />
      <Text className="mb-2">비밀번호</Text>
      <Input type="password" />
    </Flex>
  );
}

export default Login;
