import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
// import { useUserContext } from "./../pages/context/UserContext";
import { useUserStore } from "../stores/useUserStore";
import { useEditModeContext } from "../pages/context/EditModeContext";

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
  // const { user } = useUserContext();
  const user = useUserStore();
  const { isEditMode, setIsEditMode } = useEditModeContext();

  // const handleAdd = async () => {
  //   const response = await fetch("/api/dataBaseApi", {
  //     method: "POST",
  //     body: "Request",
  //   });
  //   const responseData = await response.json();
  //   console.log("DataBase response", responseData);
  // };

  type ContentType = ReactNode[];
  const contentArray: ContentType = [];

  switch (user?.user.role) {
    case undefined: {
      contentArray.push(
        <FooterButton onClick={onSignIn} key={"Sign_In"}>
          Вoйти
        </FooterButton>
      );
      break;
    }
    case "EDITOR": {
      contentArray.push(
        <FooterButton onClick={onSignOut} key={"Sign_Out"}>
          Выйти
        </FooterButton>
      );
      break;
    }
    case "ADMIN": {
      if (isEditMode) {
        contentArray.push(
          <FooterButton onClick={onSignOut} key={"Sign_Out"}>
            Выйти
          </FooterButton>,
          <FooterButton
            onClick={() => {
              setIsEditMode(false);
            }}
          >
            Закончить редактирование
          </FooterButton>
        );
      } else {
        contentArray.push(
          <FooterButton onClick={onSignOut} key={"Sign_Out"}>
            Выйти
          </FooterButton>,
          <FooterButton
            key={"EDIT"}
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            Редактировать записи
          </FooterButton>
        );
      }
      break;
    }
  }

  if (router.asPath !== "/add" && user?.user.role) {
    contentArray.push(
      <FooterButton onClick={() => {}} key={"ADD"}>
        <Link href={"/addRecord"}>Добавить запись</Link>
      </FooterButton>
    );
  }

  return (
    <Rectangle>
      <ButtonBar>{contentArray}</ButtonBar>
      {children}
      {user?.user.userName}
    </Rectangle>
  );
}
