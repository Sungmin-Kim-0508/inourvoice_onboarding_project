import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import { FlexBox, Text, Button, TextField } from "@repo/ui";
import { useLogin } from "./modules/hooks/useLogin";
import { LoginFormValues } from "./modules/types/LoginFormValues";
import { Spinner } from "./icons";
import { useNavigate } from "react-router-dom";
import { socket, socketGroup } from "../socket";

function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<LoginFormValues>({
    nickname: "",
    password: "",
  });
  const { login, isLoading, error } = useLogin();

  const { nickname, password } = formValues;
  const isButtonDisabled = !nickname || !password;

  useEffect(() => {
    const logger = (error: Error) =>
      error.message && console.log(error.message);

    socket.on("connect_error", logger);

    socketGroup.on("connect_error", logger);

    return () => {
      socket.off("connect_error", logger);
      socketGroup.off("connect_error", logger);
    };
  }, []);

  // TODO: socket을 이용하여 리팩토링
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) return;

    const user = JSON.parse(data);

    if (user?.channels) return navigate(`/${user?.channels[0]._id}`);
  }, []);

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  // TODO: socket을 이용하여 리팩토링
  const handleSubmit = async () => {
    try {
      const authUser = await login(formValues);

      if (error || !authUser) return;

      if (!authUser._id) return;

      socket.connect();
      socketGroup.connect();
      const user = localStorage.getItem("user");
      if (user) {
        // MEMO: DB값이 Update 됐을 때 스토리지 데이터 최신화
        localStorage.setItem("user", JSON.stringify(authUser));

        return navigate(`/${authUser.channels[0]._id}`);
      }

      socket.connect();
      socketGroup.connect();
      localStorage.setItem("user", JSON.stringify(authUser));
      return navigate(`/${authUser.channels[0]._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const LoginButton = () => {
    const defaultClassName = "absolute bottom-5 right-7";
    const buttonLabel = isLoading ? (
      <Spinner className="animate-spin" />
    ) : (
      "로그인"
    );

    return (
      <Button
        disabled={isButtonDisabled}
        className={`${defaultClassName}`}
        onClick={handleSubmit}
      >
        {buttonLabel}
      </Button>
    );
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
              type="text"
              name="nickname"
              placeholder="아이디를 입력해주세요"
              onChange={handleFormValues}
              value={formValues.nickname}
            />
            <TextField
              label="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={formValues.password}
              hasError={Boolean(error)}
              helpMessage={error ? error : ""}
              onChange={handleFormValues}
            />
          </FlexBox>
        </FlexBox>
        <LoginButton />
      </div>
    </FlexBox>
  );
}

export default Login;
