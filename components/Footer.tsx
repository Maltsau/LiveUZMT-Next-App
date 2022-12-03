import { ReactNode } from "react";
import styled from "styled-components";

import HeaderButton from "./buttons/HeaderButton";
import FooterButton from "./buttons/FooterButton";

const Rectangle = styled.div`
  display: flex;
  background-color: red;
  width: 100%;
  padding: 1px;
`;

const UserLabel = styled.label`
  margin: auto 5px;
  color: white;
`;
export default function Footer({
  children,
  user,
  onSignIn,
  onSignOut,
}: {
  children?: ReactNode | string;
  user: string;
  onSignIn: any;
  onSignOut: any;
}) {
  let content: ReactNode | string = "";
  if (!user) {
    content = <FooterButton onClick={onSignIn}>Войти</FooterButton>;
  } else {
    content = <FooterButton onClick={onSignOut}>Выйти</FooterButton>;
  }
  return (
    <Rectangle>
      {content}
      {children}
    </Rectangle>
  );
}
