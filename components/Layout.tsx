import { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import SignInModal from "./modalWindows/signInModal";
import FooterButton from "./buttons/FooterButton";
import handler from "../pages/api/logIn";

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
  const [user, setUser] = useState("");
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);

  useEffect(() => {
    setUser(localStorage.user);
  }, []);

  return (
    <Wraper>
      <Header>{user}</Header>
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
      </Container>
      <Footer
        user={user}
        onSignIn={() => {
          setIsSignInModalVisible(true);
        }}
        onSignOut={() => {
          setUser("");
          localStorage.removeItem("user");
        }}
      ></Footer>
    </Wraper>
  );
}
