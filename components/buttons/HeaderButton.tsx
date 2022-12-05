import React, { ReactNode } from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  height: 30px;
  min-width: 30px;
  padding: 0;
  margin: 0px 2px;
  border: 1px solid red;
  border-radius: 50%;
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
