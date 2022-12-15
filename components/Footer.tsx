import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useUserContext } from "./../pages/context/UserContext";

import FooterButton from "./buttons/FooterButton";
import Layout from "./Layout";

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
    const response = await fetch("/api/dataBaseApi", {
      method: "POST",
      body: "Request",
    });
    const responseData = await response.json();
    console.log("DataBase response", responseData);
  };

  let content: ReactNode | string;

  type ContentType = ReactNode[];
  const contentArray: ContentType = [];

  switch (user?.role) {
    case undefined: {
      contentArray.push(<FooterButton onClick={onSignIn}>Вoйти</FooterButton>);
      break;
    }
    case "EDITOR": {
      contentArray.push(<FooterButton onClick={onSignOut}>Выйти</FooterButton>);
      break;
    }
    case "ADMIN": {
      contentArray.push(
        <FooterButton onClick={onSignOut}>Выйти</FooterButton>,
        <FooterButton>Редактировать записи</FooterButton>
      );
      break;
    }
  }

  if (router.asPath !== "/add" && user?.role) {
    contentArray.push(
      <FooterButton onClick={handleAdd}>
        <Link href={"/add"}>Добавить запись</Link>
      </FooterButton>
    );
  }
  // useEffect(() => {
  //   if (router.asPath !== "/add") {
  //     contentArray.push(
  //       <FooterButton onClick={handleAdd}>
  //         <Link href={"/add"}>Добавить запись</Link>
  //       </FooterButton>
  //     );
  //     console.log("Button added");
  //   }
  // }, [router.asPath, user]);

  if (!user?.role) {
    content = (
      <>
        <FooterButton onClick={onSignIn} key={"SignIn"}>
          Вoйти
        </FooterButton>
      </>
    );
  } else {
    if (router.asPath === "/add") {
      content = (
        <>
          {JSON.stringify(user?.userName)}
          <FooterButton onClick={onSignOut} key={"SignOut"}>
            Выйти
          </FooterButton>
        </>
      );
    } else {
      content = (
        <>
          <FooterButton onClick={onSignOut} key={"SignOut"}>
            Выйти
          </FooterButton>
          <FooterButton onClick={handleAdd} key={"Add"}>
            <Link href={"/add"}>Добавить запись</Link>
          </FooterButton>
        </>
      );
    }
  }

  return (
    <Rectangle>
      <ButtonBar>{contentArray}</ButtonBar>
      {children}
      {user?.userName}
    </Rectangle>
  );
}
