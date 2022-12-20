import styled from "styled-components";
import Image from "next/image";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const UpperTrapezoid = styled.div<{
  isCurrent: boolean;
}>`
  max-height: 0px;
  border-bottom: 20px solid ${({ isCurrent }) =>
    isCurrent ? "red" : "#c0c0c0"}};
  border-right: 10px solid transparent;
`;

const LowerTrapezoid = styled.div<{
  isCurrent: boolean;
}>`
  border-top: 20px solid ${({ isCurrent }) => (isCurrent ? "red" : "#c0c0c0")}};
  border-right: 10px solid transparent;
`;

const ButtonStyled = styled.span<{
  isCurrent: boolean;
}>`
  display: flex;
  position: relative;
  background-color: transparent;
  top: 10px;
  padding-left: 5px;
  color: ${({ isCurrent }) => (isCurrent ? "white" : "black")}};
`;

const ButtonStyledActive = styled.div<{
  isCurrent: boolean;
}>`
  position: relative;
  background-color: transparent;
  display: flex;
  top: 2px;
  font-size: 0.9em;
  padding-left: 5px;
  color: ${({ isCurrent }) => (isCurrent ? "white" : "black")}};
`;

const InnerContainer = styled.span`
  position: relative;
  display: flex;
`;

const DeleteButton = styled.span<{
  isVisible: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: auto;
`;

export default function OperationButton({
  onClick,
  onSecondClick,
  text,
  isHighlighted,
  isDeleteble,
  isCurrent,
  table,
}: {
  onClick?: any;
  onSecondClick?: any;
  text: string;
  isHighlighted: boolean;
  isDeleteble: boolean;
  isCurrent: boolean;
  table: JSX.Element | string;
}) {
  if (!isHighlighted) {
    return (
      <Container onClick={onClick}>
        <UpperTrapezoid isCurrent={isCurrent}>
          <ButtonStyled isCurrent={isCurrent}>
            <span>{text}</span>
            <DeleteButton isVisible={isDeleteble}>
              <Image src="/delete.png" height={20} width={20} alt="DELETE" />
            </DeleteButton>
          </ButtonStyled>
        </UpperTrapezoid>
        <LowerTrapezoid isCurrent={isCurrent} />
      </Container>
    );
  } else {
    return (
      <Container onClick={onSecondClick}>
        <UpperTrapezoid isCurrent={isCurrent}>
          <ButtonStyledActive isCurrent={isCurrent}>{text}</ButtonStyledActive>
        </UpperTrapezoid>
        <InnerContainer>{table}</InnerContainer>
        <LowerTrapezoid isCurrent={isCurrent} />
      </Container>
    );
  }
}
