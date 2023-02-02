import styled from "styled-components";

import ModalDialog from "./ModalDialog";

import {
  DialogContainer,
  Question,
  ButtonStyled,
} from "../menuComponents/ModalDialogComponents";

interface DeleteConfirmationDialogPropsType {
  isVisible: boolean;
  onAbort: () => void;
  onSubmit: () => void;
}

export default function DeleteConfirmationDialog({
  isVisible,
  onAbort,
  onSubmit,
}: DeleteConfirmationDialogPropsType) {
  return (
    <ModalDialog
      isNotTransparent={true}
      isVisible={isVisible}
      onClose={onAbort}
    >
      <DialogContainer>
        <Question>
          Хотоите удaлить запись без возможности восстановления?
        </Question>
        <ButtonStyled onClick={onSubmit}>Да</ButtonStyled>
        <ButtonStyled onClick={onAbort}>Нет</ButtonStyled>
      </DialogContainer>
    </ModalDialog>
  );
}
