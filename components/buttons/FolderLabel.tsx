import styled from "styled-components";

const Container = styled.div`
  width: 16.6%;
  box-sizing: border-box;
  @media (min-width: 460px) {
    width: 80px;
    height: 30px;
  }
`;

const OuterTrapezoid = styled.div<{
  isHighlighted: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-bottom: 6vw solid #3c3e3f;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  height: 0;
  width: 100%;
  height: 0;
  padding: 0;
  @media (min-width: 460px) {
    border-width: 0 10px 30px 10px;
  }
  @media (max-width: 460px) {
    border-left: 2vw solid transparent;
    border-right: 2vw solid transparent;
  }
`;

const InnerTrapezoid = styled.div<{
  isHighlighted: boolean;
}>`
  display: flex;
  justify-content: center;
  box-sizing: content-box;
  position: relative;
  top: 17px;
  right: 9px;
  border-bottom: ${({ isHighlighted }) =>
    isHighlighted ? "6vw solid #f3f5f6" : "6vw solid transparent"};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  width: 96%;
  height: 0;
  @media (min-width: 460px) {
    border-width: 0 10px 30px 10px;
  }
  @media (max-width: 460px) {
    top: 3.2vw;
    right: 1.5vw;
    border-left: 2vw solid transparent;
    border-right: 2vw solid transparent;
  }
`;

const TextLabel = styled.div<{
  isHighlighted: boolean;
}>`
  position: relative;
  color: ${({ isHighlighted }) => (isHighlighted ? "#3c3e3f" : "#f3f5f6")};
  top: 1vw;
  font-size: 2.5vw;
  //   font-stretch: ultra-condensed;
  @media (min-width: 460px) {
    font-size: 12px;
  }
`;

export default function FolderLabel({
  isHighlighted,
  text,
  onClick,
}: {
  isHighlighted: boolean;
  text: string | number;
  onClick: (e: React.SyntheticEvent) => void;
}) {
  return (
    <Container onClick={onClick}>
      <OuterTrapezoid isHighlighted={isHighlighted}>
        <InnerTrapezoid isHighlighted={isHighlighted}>
          <TextLabel isHighlighted={isHighlighted}>{text}</TextLabel>
        </InnerTrapezoid>
      </OuterTrapezoid>
    </Container>
  );
}
