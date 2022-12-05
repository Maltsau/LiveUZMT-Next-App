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
  userBase,
}: {
  children: ReactNode;
  userBase: any;
}) {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const [isAreYouSureModalVisible, setIsAreYouSureModalVisible] =
    useState(false);

  useEffect(() => {
    setUser(localStorage.user);
  }, []);

  return (
    <Wraper>
      <Header user={user}></Header>
      <Container>
        {children}
        <SignInModal
          userBase={userBase}
          isVisible={isSignInModalVisible}
          onClose={() => {
            setIsSignInModalVisible(false);
          }}
          onFormSubmit={(user: string) => {
            setIsSignInModalVisible(false);
            setUser(user);
          }}
        ></SignInModal>
        <AreYouSureModal
          onClose={() => {
            setIsAreYouSureModalVisible(false);
          }}
          isVisible={isAreYouSureModalVisible}
          onFormSubmit={() => {
            setIsAreYouSureModalVisible(false);
            setUser("");
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
