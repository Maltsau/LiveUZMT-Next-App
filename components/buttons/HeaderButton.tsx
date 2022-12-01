import React, { ReactNode } from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  height: 30px;
  padding: 0;
  margin: 0px 5px;
  border: 1px solid black;
  border-radius: 2px;
  background-color: white;
  text-align: center;
`;

export default function HeaderButton({
  children,
  onClick,
  style,
}: {
  children: ReactNode | string;
  onClick?: (event: React.MouseEvent) => any;
  style?: any;
}) {
  return (
    <ButtonStyled style={style} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
}
