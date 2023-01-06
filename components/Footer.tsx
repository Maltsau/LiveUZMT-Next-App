import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useUserContext } from "./../pages/context/UserContext";
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
  const { user } = useUserContext();
  const { isEditMode, setIsEditMode } = useEditModeContext();

  // const handleAdd = async () => {
  //   const response = await fetch("/api/dataBaseApi", {
  //     method: "POST",
  //     body: "Request",
  //   });
  //   const responseData = await response.json();
  //   console.log("DataBase response", responseData);
  // };

  let content: ReactNode | string;

  type ContentType = ReactNode[];
  const contentArray: ContentType = [];

  switch (user?.role) {
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

  if (router.asPath !== "/add" && user?.role) {
    contentArray.push(
      <FooterButton onClick={() => {}} key={"ADD"}>
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

  // if (!user?.role) {
  //   content = (
  //     <>
  //       <FooterButton onClick={onSignIn} key={"SignIn"}>
  //         Вoйти
  //       </FooterButton>
  //     </>
  //   );
  // } else {
  //   if (router.asPath === "/add") {
  //     content = (
  //       <>
  //         {JSON.stringify(user?.userName)}
  //         <FooterButton onClick={onSignOut} key={"SignOut"}>
  //           Выйти
  //         </FooterButton>
  //       </>
  //     );
  //   } else {
  //     content = (
  //       <>
  //         <FooterButton onClick={onSignOut} key={"SignOut"}>
  //           Выйти
  //         </FooterButton>
  //         <FooterButton onClick={()=>{}} key={"Add"}>
  //           <Link href={"/add"}>Добавить запись</Link>
  //         </FooterButton>
  //       </>
  //     );
  //   }
  // }

  return (
    <Rectangle>
      <ButtonBar>{contentArray}</ButtonBar>
      {children}
      {user?.userName}
    </Rectangle>
  );
}
