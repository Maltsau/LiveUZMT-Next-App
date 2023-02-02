import styled from "styled-components";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { useUserStore } from "../../stores/useUserStore";
import { useLogin } from "../../hooks/useLoginHook";
import ModalDialog from "./ModalDialog";
import LoaderModal from "./LoaderModal";
import {
  InputSimple,
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

const ButtonBar = styled.div`
  display: flex;
`;

const ErrorParagraphModal = styled(ErrorParagraph)`
  font-size: 1rem;
  color: red;
`;

const ButtonStyledSignIn = styled(ButtonStyled)`
  width: 200px;
  min-height: 50px;
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
  const user = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });

  const {
    mutate: logIn,
    data: loginResponse,
    isLoading: isSigningIn,
    isError: isLoginError,
  } = useLogin({
    onSuccess: (loginResponse) => {
      user?.setUser(
        loginResponse.userName,
        loginResponse.role,
        loginResponse.label
      );
      reset();
      onClose();
    },
    onError: () => {
      reset();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
    logIn(data);
  };

  if (isSigningIn) return <LoaderModal text="Выполняется вход..." />;

  return (
    <ModalDialog
      isNotTransparent={true}
      isVisible={isVisible}
      onClose={onClose}
    >
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
          <ButtonBar>
            <ButtonStyledSignIn type="submit">Войти</ButtonStyledSignIn>
            <ButtonStyledSignIn onClick={onClose}>Отмена</ButtonStyledSignIn>
          </ButtonBar>
        </SignInForm>
      </DialogContainer>
    </ModalDialog>
  );
}
