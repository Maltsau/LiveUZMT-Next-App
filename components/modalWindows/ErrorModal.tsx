import styled from "styled-components";
import ModalWindow from "./ModalWindow";

const Container = styled.div`
  padding: 16px;
  margin: auto;
  border: solid red 1px;
  text-align: center;
`;

export default function ErrorModal({
  onClose,
  isVisible,
}: {
  onClose: () => void;
  isVisible: boolean;
}) {
  return (
    <ModalWindow isVisible={isVisible} onClose={onClose}>
      <Container>
        <h2>Что-то пошло не так</h2>
        <h2>Повторите попытку</h2>
      </Container>
    </ModalWindow>
  );
}
