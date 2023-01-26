import { useState, useEffect, useCallback } from "react";
import ky from "ky";
import styled from "styled-components";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { useUserStore } from "../../stores/useUserStore";
import { useMutation } from "react-query";
import ModalDialog from "./ModalDialog";
import {
  InputSimple,
  InputSubmit,
  ErrorDiv,
  ErrorParagraph,
} from "../menuComponents/Inputs";
import {
  DialogContainer,
  Warning,
  ButtonStyled,
} from "../menuComponents/ModalDialogComponents";

const SignInForm = styled.form`
  width: 100%;
  display: flex;
  font-size: 20 px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorParagraphModal = styled(ErrorParagraph)`
  font-size: 1rem;
  color: red;
`;

interface Inputs {
  login: string;
  password: string;
}

interface LogInDialogPropsType {
  isVisible: boolean;
  onClose: () => void;
}

export default function SignInDialog({
  isVisible,
  onClose,
}: LogInDialogPropsType) {
  // const [isLoginError, setIsLoginError] = useState(false)
  const user = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });

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
        reset();
      },
      onSuccess: (loginResponse) => {
        user?.setUser(loginResponse.userName, loginResponse.role);
        console.log("response", loginResponse);
        console.log("user", user);
        onClose();
        // setIsSignInModalVisible(false);
      },
    }
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  return (
    <ModalDialog isVisible={isVisible} onClose={onClose}>
      <DialogContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SignInForm onSubmit={handleSubmit(onSubmit)}>
          <Warning>Введите логин и пароль</Warning>
          <InputSimple
            onClick={(e) => {
              e.stopPropagation();
            }}
            placeholder={"Логин"}
            {...register("login", {
              required: "Поле обязательно к заполнению",
            })}
          ></InputSimple>
          <ErrorDiv>
            {errors.login && (
              <ErrorParagraphModal>
                {errors.login.message || `Ошибка заполнения`}
              </ErrorParagraphModal>
            )}
          </ErrorDiv>
          <InputSimple
            placeholder={"Пароль"}
            {...register("password", {
              required: "Поле обязательно к заполнению",
            })}
          ></InputSimple>
          <ErrorDiv>
            {errors.password && (
              <ErrorParagraphModal>
                {errors.password.message || `Ошибка заполнения`}
              </ErrorParagraphModal>
            )}
          </ErrorDiv>
          {isLoginError ? (
            <ErrorParagraphModal>Ошибка авторизации</ErrorParagraphModal>
          ) : null}
          <ButtonStyled type="submit">Войти</ButtonStyled>
        </SignInForm>
      </DialogContainer>
    </ModalDialog>
  );
}
