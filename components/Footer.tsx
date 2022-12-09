import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useUserContext } from "./../pages/context/UserContext";

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
  onSignIn,
  onSignOut,
}: {
  children?: ReactNode | string;
  onSignIn: any;
  onSignOut: any;
}) {
  const router = useRouter();
  const { user } = useUserContext();

  const handleAdd = async () => {
    const response = await fetch("/api/dataBase", {
      method: "POST",
      body: "Request",
    });
    const responseData = await response.json();
    console.log("DataBase response", responseData);
  };

  let content: ReactNode | string;
  console.log("Footer", user);
  if (!user?.userName) {
    content = (
      <ButtonBar>
        <FooterButton onClick={onSignIn}>Вoйти</FooterButton>
      </ButtonBar>
    );
  } else {
    if (router.asPath === "/add") {
      content = (
        <ButtonBar>
          {JSON.stringify(user?.userName)}
          <FooterButton onClick={onSignOut}>Выйти</FooterButton>
        </ButtonBar>
      );
    } else {
      content = (
        <ButtonBar>
          {JSON.stringify(user?.userName)}
          <FooterButton onClick={onSignOut}>Выйти</FooterButton>
          <FooterButton onClick={handleAdd}>
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
