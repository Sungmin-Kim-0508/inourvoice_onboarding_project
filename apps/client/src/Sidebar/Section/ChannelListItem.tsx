import React, { LiHTMLAttributes } from "react";

interface ChannelListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  icon: React.ReactNode;
  /** tailwindcss 컬러 파레트로 입력하기 ex) bg-zinc-100 */
  bgColor?: string;
  /** tailwindcss 컬러 파레트로 입력하기 ex) bg-zinc-100 */
  textColor?: string;
}

export const ChannelListItem = ({
  children,
  icon,
  bgColor = "",
  textColor = "text-zinc-400",
  ...props
}: ChannelListItemProps) => {
  return (
    <li
      className={`flex py-[2px] cursor-pointer ${textColor} hover:bg-zinc-800 bg-opacity-50 hover:rounded-md ${bgColor}`}
      {...props}
    >
      <span
        className={`mr-3 w-5 h-5 inline-flex justify-center items-center rounded-[4px]`}
      >
        {icon}
      </span>{" "}
      {children}
    </li>
  );
};
