import { ReactNode, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
// import { useUserContext } from "../pages/context/UserContext";
import { useQuery, useMutation } from "react-query";
import styled from "styled-components";
import ky from "ky";

import Header from "./Header";
import Footer from "./Footer";
import SignInModal from "./modalWindows/SignInModal";
import AreYouSureModal from "./modalWindows/AreYouSureModal";
import ErrorModal from "./modalWindows/ErrorModal";
import LoaderModal from "./modalWindows/LoaderModal";
import LogOutConfirmationDialog from "./modalWindows/LogOutConfirmationDialog";
import DeleteConfirmationDialog from "./modalWindows/DeleteConfirmationDialog";

import { useUserStore } from "../stores/useUserStore";

const Wraper = styled.div`
  border: 1px solid red;
`;

const Container = styled.div`
  width: 100%;
  border: 1px solid red;
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
    mutate,
    data: loginResponse,
    isLoading: isSigningIn,
    isError: isLoginError,
  } = useMutation(
    "LOG_IN_REQUEST",
    ({ login, password }: { login: string; password: string }) => {
      return ky
        .post("/api/login2", {
          json: { login, password },
        })
        .json<{ userName: string; role: string }>();
    },
    {
      onError: () => {
        setIsLoginFailed(true);
      },
      onSuccess: (loginResponse) => {
        user?.setUser(loginResponse.userName, loginResponse.role);
        setIsSignInModalVisible(false);
      },
    }
  );

  const handleSignIn = async (login: string, password: string) => {
    mutate({ login, password });
  };

  const handleSignOut = () => {
    mutate({ login: "Tweenpipe", password: "Fuch" });
    user?.setUser("", "");
    setSignOutConfirmationDialogVisible(false);
  };

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
        .json<{ userName: string; role: string }>();
    },
    {
      onSuccess: (secretResponse) => {
        if (secretResponse?.role) {
          console.log("secretResponse", secretResponse);
          user?.setUser(secretResponse.userName, secretResponse.role);
        } else {
          user?.setUser("", "");
        }
      },
      // onError: () => {
      //   router.push("/");
      //   setUser(undefined);
      // },
      // cacheTime: 0,
    }
  );

  if (isSigningIn) return <LoaderModal text="Выполняется вход..." />;

  // if (isLoginError)
  //   return (
  //     <ErrorModal
  //       isVisible={true}
  //       onClose={() => {
  //         setIserrorVisible(false);
  //       }}
  //     ></ErrorModal>
  //   );

  console.log("User", user);

  return (
    <Wraper>
      <Header onAllReset={() => {}}></Header>
      <Container>
        <LogOutConfirmationDialog
          isVisible={signOutConfirmationDialogVisible}
          onAbort={() => {
            setSignOutConfirmationDialogVisible(false);
          }}
          onSubmit={handleSignOut}
        ></LogOutConfirmationDialog>
        {children}
        <SignInModal
          onFocus={() => {
            setIsLoginFailed(false);
          }}
          isNotValid={isLoginFailed}
          isVisible={isSignInModalVisible}
          onClose={() => {
            setIsSignInModalVisible(false);
          }}
          onFormSubmit={(login: string, password: string) => {
            handleSignIn(login, password);
            console.log("Layout", login, password, user);
          }}
        ></SignInModal>
        {/* <AreYouSureModal
          onClose={() => {
            setIsAreYouSureModalVisible(false);
          }}
          isVisible={isAreYouSureModalVisible}
          onFormSubmit={handleSignOut}
        ></AreYouSureModal> */}
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
