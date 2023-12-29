import tw from "tailwind-styled-components";

interface FlexProps {
  flex_direction?:
    | "flex-row"
    | "flex-row-reverse"
    | "flex-col"
    | "flex-col-reverse";
}

export const Flex = tw.div<FlexProps>`
  flex
  ${({ flex_direction = "flex-row" }) => flex_direction}
`;
