import styled from "styled-components";
import Link from "next/link";
import ModalDialog from "./ModalDialog";

import {
  DialogContainer,
  Warning,
  Question,
  ButtonStyled,
} from "../menuComponents/ModalDialogComponents";

interface LogOutConfirmationDialogPropsType {
  isVisible: boolean;
  onSubmit: () => void;
  onAbort: () => void;
}

export default function LogOutConfirmationDialog({
  isVisible,
  onSubmit,
  onAbort,
}: LogOutConfirmationDialogPropsType) {
  return (
    <ModalDialog isVisible={isVisible} onClose={onAbort}>
      <DialogContainer>
        <Warning>
          Неавторизованные пользователи не могут добавлять данные
        </Warning>
        <Question>Хотоите выйти?</Question>
        <Link href={"/"}>
          <ButtonStyled onClick={onSubmit}>Да</ButtonStyled>
        </Link>
        <ButtonStyled onClick={onAbort}>Нет</ButtonStyled>
      </DialogContainer>
    </ModalDialog>
  );
}
