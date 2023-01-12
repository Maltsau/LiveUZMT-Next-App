import { ReactNode, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../pages/context/UserContext";
import {
  useQuery,
  useMutation,
  UseQueryResult,
  MutationFunction,
} from "react-query";
import styled from "styled-components";
import ky from "ky";

import Header from "./Header";
import Footer from "./Footer";
import SignInModal from "./modalWindows/SignInModal";
import AreYouSureModal from "./modalWindows/AreYouSureModal";
import ErrorModal from "./modalWindows/ErrorModal";
import LoaderModal from "./modalWindows/LoaderModal";

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
  const [isAreYouSureModalVisible, setIsAreYouSureModalVisible] =
    useState(false);
  const [isErrorVisible, setIserrorVisible] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const { user, setUser } = useUserContext();
  const userRef = useRef();

  // const getUser = () => {
  //   setUser(data);
  // };
  // const getUser = useCallback(async (login: string, password: string) => {
  //   const response = await fetch("/api/login2", {
  //     method: "POST",
  //     body: JSON.stringify({ login, password }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const responseData = await response.json();
  //   setUser(responseData);
  // }, []);

  const {
    mutateAsync,
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
        setTimeout(() => {
          setIsLoginFailed(false);
        }, 500);
      },
      onSuccess: (loginResponse) => {
        setUser(loginResponse);
        setIsSignInModalVisible(false);
      },
    }
  );

  const handleSignIn = async (login: string, password: string) => {
    const n = mutate({ login, password });
    console.log("n", n);
    // console.log("response", loginResponse);
    // setUser(loginResponse);
  };

  // useEffect(() => {
  //   if (loginResponse?.role) {
  //     console.log("before login", loginResponse);
  //     setUser(loginResponse);
  //     console.log({
  //       userName: loginResponse.userName,
  //       role: loginResponse.role,
  //     });
  //     console.log(user);
  //     setIsSignInModalVisible(false);
  //   } else {
  // console.log("before login if not", loginResponse);
  // setIsLoginFailed(true);
  // setTimeout(() => {
  //   setIsLoginFailed(false);
  // }, 500);
  //   }
  // }, [loginResponse]);

  const handleSignOut = () => {
    mutate({ login: "", password: "" });
    setUser(undefined);
    setIsAreYouSureModalVisible(false);
  };

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("/api/cookie", { method: "GET" });
  //     if (response.status !== 200) {
  //       router.push("/");
  //       console.log("Redirected");
  //     } else {
  //       const responseData = await response.json();
  //       const responseObject = JSON.parse(responseData);
  //       setUser({
  //         userName: responseObject.userName,
  //         role: responseObject.role,
  //       });
  //       console.log(JSON.stringify(responseData));
  //       console.log(responseObject.userName, responseObject.role);
  //     }
  //   })();
  // }, []);

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
          setUser({
            userName: secretResponse.userName,
            role: secretResponse.role,
          });
        } else {
          setUser(undefined);
        }
      },
      // onError: () => {
      //   router.push("/");
      //   setUser(undefined);
      // },
      // cacheTime: 0,
    }
  );

  // useEffect(() => {
  //   if (secretResponse?.role) {
  //     console.log("secretResponse", secretResponse);
  //     setUser({
  //       userName: secretResponse.userName,
  //       role: secretResponse.role,
  //     });
  //   } else {
  //     setUser(undefined);
  //   }
  // }, [secretResponse]);

  // console.log("secretResponse", secretResponse);

  if (isSigningIn) return <LoaderModal text="Выполняется вход..." />;

  if (isLoginError)
    return (
      <ErrorModal
        isVisible={true}
        onClose={() => {
          setIserrorVisible(false);
        }}
      ></ErrorModal>
    );

  console.log("User", user);

  return (
    <Wraper>
      <Header></Header>
      <Container>
        {children}
        <SignInModal
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
        <AreYouSureModal
          onClose={() => {
            setIsAreYouSureModalVisible(false);
          }}
          isVisible={isAreYouSureModalVisible}
          onFormSubmit={handleSignOut}
        ></AreYouSureModal>
      </Container>
      <Footer
        onSignIn={() => {
          setIsSignInModalVisible(true);
        }}
        onSignOut={() => {
          setIsAreYouSureModalVisible(true);
        }}
      ></Footer>
    </Wraper>
  );
}
