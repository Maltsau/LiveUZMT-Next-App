import styled from "styled-components";

import ModalWindow from "./ModalWindow";

const Container = styled.div`
  padding: 16px;
  margin: auto;
  border: solid red 1px;
  text-align: center;
`;

const Warning = styled.h2`
  font-size: 1.2em;
  margin: auto 5px;
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

export default function AddMonthModal({
  isVisible,
  onClose,
  onSubmit,
}: {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <ModalWindow isVisible={isVisible} onClose={onClose}>
      <Container>
        <Warning>
          Похоже, что вы первый, кто решил добавить запись в этом месяце
        </Warning>
        <Question>Введите дополнительную информацию</Question>
        <ButtonStyled onClick={onSubmit}>Да</ButtonStyled>
      </Container>
    </ModalWindow>
  );
}
