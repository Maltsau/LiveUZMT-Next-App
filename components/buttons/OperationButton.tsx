import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UpperTrapezoid = styled.div<{
  isCurrent: boolean;
}>`
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
  position: relative;
  background-color: transparent;
  top: 27px;
  padding-left: 5px;
  color: ${({ isCurrent }) => (isCurrent ? "white" : "black")}};
`;

const ButtonStyledActive = styled.span<{
  isCurrent: boolean;
}>`
  position: relative;
  background-color: transparent;
  top: 19px;
  font-size: 0.9em;
  padding-left: 5px;
  color: ${({ isCurrent }) => (isCurrent ? "white" : "black")}};
`;

const InnerContainer = styled.span`
  position: relative;
  display: flex;
`;

export default function OperationButton({
  onClick,
  onSecondClick,
  text,
  isHighlighted,
  isCurrent,
  table,
}: {
  onClick?: any;
  onSecondClick?: any;
  text: string;
  isHighlighted: boolean;
  isCurrent: boolean;
  table: JSX.Element | string;
}) {
  if (!isHighlighted) {
    return (
      <Container onClick={onClick}>
        <UpperTrapezoid isCurrent={isCurrent}>
          <ButtonStyled isCurrent={isCurrent}>{text}</ButtonStyled>
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
