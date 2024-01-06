import React from "react";

export function ToolbarButton({
  isFocused,
  isActive,
  onClick,
  Icon,
}: {
  isFocused: boolean;
  isActive: boolean;
  onClick: () => void;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}) {
  const getIconClassNames = () => {
    let classNames = "group-hover:fill-zinc-300";

    if (isFocused) {
      if (isActive) {
        classNames += " fill-zinc-300";
        return classNames;
      }

      classNames += " fill-zinc-400";
      return classNames;
    }

    classNames += " fill-zinc-600";
    return classNames;
  };

  const getButtonBgClassNames = () => {
    let classNames = "hover:bg-[#FFFFFF1A]";

    if (isActive) {
      if (isFocused) {
        classNames += " bg-[#FFFFFF33]";
        return classNames;
      }

      classNames += " bg-[#FFFFFF1A]";
      return classNames;
    }

    classNames += " bg-transparent";
    return classNames;
  };

  return (
    <button
      className={`group w-[30px] h-[30px] flex justify-center items-center rounded ${getButtonBgClassNames()}`}
      onClick={onClick}
    >
      <Icon className={`${getIconClassNames()}`} />
    </button>
  );
}
