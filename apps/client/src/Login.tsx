import React, { useState, useCallback, ChangeEvent } from "react";
import { FlexBox, Text, Button, TextField } from "@repo/ui";

function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const isButtonDisabled = !formValues.email || !formValues.password;

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = () => {
    // TODO: 로그인 로직 구현
  };

  return (
    <FlexBox className="justify-center items-center h-screen bg-zinc-900">
      <div className="relative px-7 py-5 text-white bg-zinc-800 w-[651px] h-[362px] rounded-lg">
        <FlexBox flex_direction="flex-col">
          <Text className="text-amber-100 text-2xl font-bold font-['Pretendard'] leading-loose mb-5">
            In’OurVoice
          </Text>
          <FlexBox flex_direction="flex-col">
            <TextField
              label="아이디"
              type="email"
              name="email"
              placeholder="아이디를 입력해주세요"
              onChange={handleFormValues}
              value={formValues.email}
            />
            <TextField
              label="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={formValues.password}
              onChange={handleFormValues}
            />
          </FlexBox>
        </FlexBox>
        <Button
          disabled={isButtonDisabled}
          className="absolute bottom-5 right-7"
          onClick={handleSubmit}
        >
          로그인
        </Button>
      </div>
    </FlexBox>
  );
}

export default Login;
