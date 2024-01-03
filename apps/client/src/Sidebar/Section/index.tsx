import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { ChannelListItem } from "./ChannelListItem";
import { Plus } from "../icons";

interface SectionProps {
  list: { items: { name: string }[]; icon: React.ReactNode };
  headingLabel: string;
  addingLabel: React.ReactNode;
}

export function Section({
  list: { items, icon },
  headingLabel,
  addingLabel,
}: SectionProps) {
  const [open, setOpen] = useState(true);
  return (
    <ChannelListWrapper>
      <ChannelListItem
        icon={<ChevronDown className={open ? "" : "-rotate-90"} />}
        onClick={() => setOpen((prev) => !prev)}
      >
        {headingLabel}
      </ChannelListItem>
      {open ? (
        <>
          {items.map(({ name }) => (
            <ChannelListItem icon={icon}>{name}</ChannelListItem>
          ))}
          <ChannelListItem icon={<Plus />} textColor="text-zinc-500">
            {addingLabel}
          </ChannelListItem>
        </>
      ) : null}
    </ChannelListWrapper>
  );
}

const ChannelListWrapper = tw.ul`
  px-[10px]
`;

const ChevronDown = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.21967 6.21967C4.51256 5.92678 4.98744 5.92678 5.28033 6.21967L8 8.93934L10.7197 6.21967C11.0126 5.92678 11.4874 5.92678 11.7803 6.21967C12.0732 6.51256 12.0732 6.98744 11.7803 7.28033L8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303L4.21967 7.28033C3.92678 6.98744 3.92678 6.51256 4.21967 6.21967Z"
      fill="#A1A1AA"
    />
  </svg>
);
