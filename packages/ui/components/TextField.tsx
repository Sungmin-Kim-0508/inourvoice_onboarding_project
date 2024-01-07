import React, { InputHTMLAttributes } from "react";
import { Text, Input } from "..";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMessage?: React.ReactNode;
}

export const TextField = ({
  label,
  hasError,
  helpMessage,
  ...props
}: TextFieldProps) => {
  const textColor = hasError ? "text-red-800" : "text-zinc-300";
  return (
    <>
      {label ? <Text className="mb-2">{label}</Text> : null}
      <Input className={`${helpMessage ? "mb-1" : "mb-6"}`} {...props} />
      {helpMessage ? (
        <Text className={`mb-6 ${textColor} text-xs font-normal leading-none`}>
          {helpMessage}
        </Text>
      ) : null}
    </>
  );
};
