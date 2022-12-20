import { ReactNode, useState, useEffect, useCallback } from "react";
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
  const { user, setUser } = useUserContext();

  const { mutateAsync, mutate, data } = useMutation(
    "LOG_IN_REQUEST",
    async ({ login, password }: { login: string; password: string }) => {
      const res = await ky
        .post("/api/login2", {
          json: { login, password },
        })
        .json<{ login: string; role: string }>();
      return res;
    }
  );

  console.log(mutate);
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

  const handleSignIn = async (login: string, password: string) => {
    setIsSignInModalVisible(false);
    await mutateAsync({ login, password });
    setUser(data);
  };

  const handleSignOut = () => {
    setIsAreYouSureModalVisible(false);
    mutate({ login: "", password: "" });
    setUser(undefined);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/cookie", { method: "GET" });
      if (response.status !== 200) {
        router.push("/");
        console.log("Redirected");
      } else {
        const responseData = await response.json();
        const responseObject = JSON.parse(responseData);
        setUser({
          userName: responseObject.userName,
          role: responseObject.role,
        });
        console.log(JSON.stringify(responseData));
        console.log(responseObject.userName, responseObject.role);
      }
    })();
  }, []);

  return (
    <Wraper>
      <Header></Header>
      <Container>
        {children}
        <SignInModal
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
