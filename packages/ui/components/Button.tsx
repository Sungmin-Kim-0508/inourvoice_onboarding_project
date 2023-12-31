import tw from "tailwind-styled-components";

export const Button = tw.button`
  h-9
  px-5
  py-1.5
  rounded
  border
  border-green-700
  text-white
  bg-green-700
  hover:bg-green-600
  disabled:border-zinc-500
  disabled:text-zinc-500
  disabled:bg-zinc-800
  justify-center items-center gap-2.5 inline-flex
`;
