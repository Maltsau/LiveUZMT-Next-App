import Link from "next/link";
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

const InputStyled = styled.input<{
  isNotValid: boolean;
}>`
  width: 100%;
  font-size: 1.2em;
  margin: 5px;
  padding: 10px;
  border: solid red 1px;
  border-radius: 5px;
  background-color: ${({ isNotValid }) => (isNotValid ? "pink" : "white")};
`;

export default function SignInModal({
  isVisible,
  onClose,
  onFormSubmit,
  isNotValid,
  onFocus,
}: {
  isVisible: boolean;
  onClose: any;
  onFormSubmit: any;
  isNotValid: boolean;
  onFocus: () => void;
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
            onFocus={onFocus}
            isNotValid={isNotValid}
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
            }}
            type={"input"}
            placeholder={"Логин"}
          />
          <InputStyled
            onFocus={onFocus}
            isNotValid={isNotValid}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={"password"}
            placeholder={"Пароль"}
          />
          <InputStyled isNotValid={false} type={"submit"} value={"Войти"} />
        </SignInForm>
      </Container>
    </ModalWindow>
  );
}
