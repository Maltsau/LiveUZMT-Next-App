import styled from "styled-components";

const ButtonStyled = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px;
`;

export default function AddButton({
  children,
  onClick,
}: {
  children: any;
  onClick?: any;
}) {
  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
}
