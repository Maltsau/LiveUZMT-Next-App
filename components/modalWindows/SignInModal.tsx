import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import ModalWindow from "./ModalWindow";

const Container = styled.div`
  padding: 16px;
  margin: auto;
  border: solid red 1px;
`;

const SignInForm = styled.form`
  width: 100%;
  display: flex;
  font-size: 20 px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputStyled = styled.input`
  width: 100%;
  min-height: 50px;
  font-size: 1.2em;
  margin: 5px;
  border: solid red 1px;
  border-radius: 5px;
`;

export default function SignInModal({
  isVisible,
  onClose,
  onFormSubmit,
}: {
  isVisible: boolean;
  onClose: any;
  onFormSubmit: any;
}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onFormSubmit(login, password);
    console.log("sign in", login, password);
  };

  return (
    <ModalWindow isVisible={isVisible} onClose={onClose}>
      <Container>
        <SignInForm onSubmit={handleSubmit}>
          <InputStyled
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
            }}
            type={"input"}
            placeholder={"Логин"}
          />
          <InputStyled
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={"input"}
            placeholder={"Пароль"}
          />
          <InputStyled type={"submit"} value={"Войти"} />
        </SignInForm>
      </Container>
    </ModalWindow>
  );
}
