import styled from "styled-components";

export const InputSimple = styled.input<{
  isNotValid?: boolean;
}>`
  height: 50px;
  width: 95%;
  font-size: 1.2em;
  overflow: auto;
  margin: 5px;
  padding: 10px;
  border: solid red 1px;
  border-radius: 5px;
  background-color: ${({ isNotValid }) => (isNotValid ? "pink" : "white")};
`;

export const InputVanishing = styled.input<{
  isVisible: boolean;
  isNotValid?: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  min-height: 50px;
  font-size: 1.2em;
  overflow: auto;
  margin: 5px;
  padding: 10px;
  border: solid red 1px;
  border-radius: 5px;
  background-color: ${({ isNotValid }) => (isNotValid ? "pink" : "white")};
`;

export const InputSubmit = styled.input`
  font-size: 1.2em;
  background-color: red;
  color: white;
  margin: 10px;
  border: solid red 1px;
  border-radius: 5px;
`;

export const SelectStyled = styled.select`
  min-height: 50px;
  font-size: 1.2em;
  overflow: auto;
  margin: 5px;
  border: solid red 1px;
  border-radius: 5px;
  background-color: white;
`;
