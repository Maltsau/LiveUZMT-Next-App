import styled from "styled-components";
import Link from "next/link";
import ModalDialog from "./ModalDialog";

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

export default function AreYouSureDialog(isVisible: boolean) {
  return (
    <ModalDialog isVisible={isVisible}>
      <Container>
        <Warning>
          Неавторизованные пользователи не могут добавлять данные
        </Warning>
        <Question>Хотоите выйти?</Question>
        <Link href={"/"}>
          <ButtonStyled>Да</ButtonStyled>
        </Link>
        <ButtonStyled>Нет</ButtonStyled>
      </Container>
    </ModalDialog>
  );
}
