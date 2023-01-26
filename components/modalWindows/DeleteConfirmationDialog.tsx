import styled from "styled-components";

import ModalDialog from "./ModalDialog";

const Container = styled.div`
  padding: 16px;
  margin: auto;
  border: solid red 1px;
  text-align: center;
`;

const Question = styled.h2`
  font-size: 1.5em;
  margin: auto 10px;
  text-align: center;
`;

const ButtonStyled = styled.button`
  width: 100px;
  font-size: 1.2em;
  margin: 10px;
  border: solid red 1px;
  border-radius: 5px;
`;

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
    <ModalDialog isVisible={isVisible} onClose={onAbort}>
      <Container>
        <Question>
          Хотоите удaлить запись без возможности восстановления?
        </Question>
        <ButtonStyled onClick={onSubmit}>Да</ButtonStyled>
        <ButtonStyled onClick={onAbort}>Нет</ButtonStyled>
      </Container>
    </ModalDialog>
  );
}
