import React, { InputHTMLAttributes } from "react";
import { Text, Input } from "..";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helpMessage?: React.ReactNode;
}

export const TextField = ({ label, helpMessage, ...props }: TextFieldProps) => {
  return (
    <>
      {label ? <Text className="mb-2">{label}</Text> : null}
      <Input
        className={`${helpMessage ? "mb-1" : "mb-6"} text-black`}
        {...props}
      />
      {helpMessage ? (
        <Text className="mb-6 text-zinc-300 text-xs font-normal font-['Pretendard'] leading-none">
          {helpMessage}
        </Text>
      ) : null}
    </>
  );
};
