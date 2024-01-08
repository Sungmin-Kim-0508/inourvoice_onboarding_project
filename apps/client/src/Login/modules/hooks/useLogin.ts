import { useState } from "react";
import { User } from "../types/User";
import { LoginFormValues } from "../types/LoginFormValues";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ nickname, password }: LoginFormValues) => {
    // const productionUrl = `https://inourvoice.com/user/?nickname=${nickname}&password=${password}`;
    /** 임시 URL */
    const localHostUrl = `http://localhost:8000/user/?nickname=${nickname}&password=${password}`;

    setError("");
    setIsLoading(true);
    const response = await fetch(localHostUrl);

    if (!response.ok) {
      setError("유저 정보를 불러 오지 못했습니다.");
      setIsLoading(false);
      return;
    }

    const user = (await response.json()) as User;
    // const authUser = users.find((user) => user.nickname === nickname);

    if (user === undefined || Object.keys(user).length === 0) {
      setError("잘못 입력했어요. 비밀번호와 아이디를 확인해 주세요.");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

    return user;
  };

  return { login, isLoading, error };
};
