import { Children, ReactNode } from "react";
import styled from "styled-components";

const OuterTrapezoid = styled.div<{
  isHighlighted: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-bottom: 30px solid red;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  height: 0;
  width: 100px;
  padding: 0;
`;

const InnerTrapezoid = styled.div<{
  isHighlighted: boolean;
}>`
  display: flex;
  justify-content: center;
  position: relative;
  top: 17px;
  right: 9px;
  border-bottom: ${({ isHighlighted }) =>
    isHighlighted ? "30px solid white" : "30px solid transparent"};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  height: 0;
  width: 98px;
`;

const ButtonStyled = styled.span<{
  isHighlighted: boolean;
}>`
  position: relative;
  top: 5px;
  color: ${({ isHighlighted }) => (isHighlighted ? "red" : "white")};
`;

export default function CustomLink({
  text,
  isHighlighted,
  onClick,
}: {
  text: string | number;
  isHighlighted: boolean;
  onClick?: any;
}) {
  return (
    <OuterTrapezoid isHighlighted={isHighlighted} onClick={onClick}>
      <InnerTrapezoid isHighlighted={isHighlighted}>
        <ButtonStyled isHighlighted={isHighlighted}>{text}</ButtonStyled>
      </InnerTrapezoid>
    </OuterTrapezoid>
  );
}
