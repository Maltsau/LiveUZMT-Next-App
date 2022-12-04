import { useRouter } from "next/router";
import Link from "next/link";
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

export default function AreYouSureModal({
  onClose,
  isVisible,
  onFormSubmit,
}: {
  onClose: any;
  isVisible: boolean;
  onFormSubmit: any;
}) {
  const router = useRouter();
  const handleSubmit = () => {
    localStorage.removeItem("user");
    onFormSubmit();
  };

  if (router.asPath === "/add") {
    var button = (
      <ButtonStyled onClick={handleSubmit}>
        <Link href={"/"}>Да</Link>
      </ButtonStyled>
    );
  } else {
    var button = <ButtonStyled onClick={handleSubmit}>Да</ButtonStyled>;
  }
  return (
    <ModalWindow onClose={onClose} isVisible={isVisible}>
      <Container>
        <Warning>
          Неавторизованные пользователи не могут добавлять данные
        </Warning>
        <Question>Хотоите выйти?</Question>
        {button}
      </Container>
    </ModalWindow>
  );
}
