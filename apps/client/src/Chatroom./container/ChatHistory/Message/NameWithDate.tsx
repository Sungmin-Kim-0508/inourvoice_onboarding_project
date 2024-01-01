import React from "react";

interface Props {
  name: string;
  created_at: string;
}

export function NameWithDate({ name, created_at }: Props) {
  return (
    <div className="flex gap-[6px] items-center">
      <strong className="text-zinc-300">{name}</strong>
      <small className="text-xs text-zinc-400">{created_at}</small>
    </div>
  );
}
