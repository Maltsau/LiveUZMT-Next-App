import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../pages/context/UserContext";
import styled from "styled-components";

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

export default function Layout({
  children,
  onLogIn,
  onSignOut,
  user,
}: {
  children: ReactNode;
  onLogIn: any;
  onSignOut: any;
  user: any;
}) {
  const router = useRouter();
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const [isAreYouSureModalVisible, setIsAreYouSureModalVisible] =
    useState(false);

  return (
    <Wraper>
      <Header user={JSON.stringify(user)}></Header>
      <Container>
        {children}
        <SignInModal
          isVisible={isSignInModalVisible}
          onClose={() => {
            setIsSignInModalVisible(false);
          }}
          onFormSubmit={(login: string, password: string) => {
            setIsSignInModalVisible(false);
            onLogIn(login, password);
            console.log("Layout", login, password);
          }}
        ></SignInModal>
        <AreYouSureModal
          onClose={() => {
            setIsAreYouSureModalVisible(false);
          }}
          isVisible={isAreYouSureModalVisible}
          onFormSubmit={() => {
            setIsAreYouSureModalVisible(false);
            onSignOut();
          }}
        ></AreYouSureModal>
      </Container>
      <Footer
        user={user}
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
