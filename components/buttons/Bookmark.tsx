import { text } from "stream/consumers";
import styled from "styled-components";

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 16.6%;
`;

const OuterTrapezoid = styled.div`
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-bottom: 30px solid #3c3e3f;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  height: 0;
  padding: 0;
`;

const InnerTrapezoid = styled.div`
  position: relative;
  top: 2px;
  right: 9px;
  border-bottom: 30px solid #f3f5f6;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  height: 0;
  width: 110%;
`;

const ButtonStyled = styled.span`
  position: relative;
  top: 5px;
  font-size: 80%;
  background-color: transparent;
  color: #3c3e3f;
`;

//   border-bottom: ${({ isHighlighted }) =>
//   isHighlighted ? "30px solid #f3f5f6" : "30px solid transparent"};

export default function Bookmark({ text }: { text: string }) {
  return (
    <Container>
      <OuterTrapezoid>
        <InnerTrapezoid>
          <ButtonStyled>{text}</ButtonStyled>
        </InnerTrapezoid>
      </OuterTrapezoid>
    </Container>
  );
}
