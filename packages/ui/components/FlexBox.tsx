import tw from "tailwind-styled-components";

interface FlexBoxProps {
  flex_direction?:
    | "flex-row"
    | "flex-row-reverse"
    | "flex-col"
    | "flex-col-reverse";
}

export const FlexBox = tw.div<FlexBoxProps>`
  flex
  ${({ flex_direction = "flex-row" }) => flex_direction}
`;
