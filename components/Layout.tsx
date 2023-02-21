import { ReactNode, useState } from "react";
import { useRouter } from "next/router";

import { useQuery } from "react-query";
import styled from "styled-components";
import ky from "ky";

import Header from "./Header";
import Footer from "./Footer";

import LogOutConfirmationDialog from "./modalWindows/LogOutConfirmationDialog";
import SignInDialog from "./modalWindows/SignInDialog";

import { useUserStore } from "../stores/useUserStore";

const Wraper = styled.div`
  border: 1px solid r#3c3e3f;
`;

const Container = styled.div`
  width: 100%;
  border: 1px solid #3c3e3f;
  min-height: 200px;
`;

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const [
    signOutConfirmationDialogVisible,
    setSignOutConfirmationDialogVisible,
  ] = useState(false);
  const [isErrorVisible, setIserrorVisible] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const user = useUserStore();

  const {
    data: secretResponse,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery(
    ["CHECK_SECRET"],
    async () => {
      return await ky
        .get("/api/cookie")
        .json<{ userName: string; role: string; label: string }>();
    },
    {
      onSuccess: (secretResponse) => {
        if (secretResponse?.role) {
          user?.setUser(
            secretResponse.userName,
            secretResponse.role,
            secretResponse.label
          );
        } else {
          user?.setUser("", "", "");
        }
      },
    }
  );

  return (
    <Wraper>
      <Header></Header>
      <Container>
        <LogOutConfirmationDialog
          isVisible={signOutConfirmationDialogVisible}
          onAbort={() => {
            setSignOutConfirmationDialogVisible(false);
          }}
          onSubmit={() => {
            setSignOutConfirmationDialogVisible(false);
          }}
        ></LogOutConfirmationDialog>
        <SignInDialog
          isVisible={isSignInModalVisible}
          onClose={() => {
            setIsSignInModalVisible(false);
          }}
        ></SignInDialog>
        {children}
      </Container>
      <Footer
        onSignIn={() => {
          setIsSignInModalVisible(true);
        }}
        onSignOut={() => {
          setSignOutConfirmationDialogVisible(true);
        }}
      ></Footer>
    </Wraper>
  );
}
