import React, { ReactNode } from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  height: 30px;
  padding: 0 2px;
  margin: 0 5px;
  border: 1px solid black;
  background-color: white;
  text-align: center;
`;

export default function FooterButton({
  children,
  onClick,
}: {
  children: ReactNode | string;
  onClick?: (event: React.MouseEvent) => any;
}) {
  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
}
