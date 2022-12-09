import { ReactNode, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../pages/context/UserContext";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import SignInModal from "./modalWindows/SignInModal";
import AreYouSureModal from "./modalWindows/AreYouSureModal";
import AddPage from "../pages/add";
import SearchPage from "../pages/search";

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

  const getUser = useCallback(async (login: string, password: string) => {
    const response = await fetch("/api/login2", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: { "Content-Type": "application/json" },
    });
    const responseData = await response.json();
    setUser(responseData);
  }, []);

  const handleSignIn = (login: string, password: string) => {
    setIsSignInModalVisible(false);
    getUser(login, password);
  };

  const handleSignOut = () => {
    setIsAreYouSureModalVisible(false);
    getUser("", "");
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/cookie", { method: "GET" });
      if (response.status === 200) {
        console.log(JSON.stringify(response.body));
        const responseData = await response.json();
        const responseObject = JSON.parse(responseData.message);
        setUser({
          userName: responseObject.userName,
          role: responseObject.role,
        });
        console.log(responseObject.userName, responseObject.password);
      } else {
        router.push("/");
        console.log("Redirected");
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
