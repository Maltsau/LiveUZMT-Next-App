import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import FooterButton from "./buttons/FooterButton";

const Rectangle = styled.div`
  display: flex;
  background-color: red;
  width: 100%;
  padding: 1px;
`;
const ButtonBar = styled.div`
  display: flex;
`;

export default function Footer({
  children,
  user,
  onSignIn,
  onSignOut,
}: {
  children?: ReactNode | string;
  user: string | any;
  onSignIn: any;
  onSignOut: any;
}) {
  const router = useRouter();

  let content: ReactNode | string = "";
  if (!user?.user) {
    content = (
      <ButtonBar>
        {JSON.stringify(user)}
        <FooterButton onClick={onSignIn}>Вoйти</FooterButton>
      </ButtonBar>
    );
  } else {
    if (router.asPath === "/add") {
      content = (
        <ButtonBar id="bar">
          <FooterButton onClick={onSignOut}>Выйти</FooterButton>
        </ButtonBar>
      );
    } else {
      content = (
        <ButtonBar id="bar">
          <FooterButton onClick={onSignOut}>Выйти</FooterButton>
          <FooterButton>
            <Link href={"/add"}>Добавить запись</Link>
          </FooterButton>
        </ButtonBar>
      );
    }
  }

  return (
    <Rectangle>
      {content}
      {children}
    </Rectangle>
  );
}
