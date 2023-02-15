import styled from "styled-components";

export const InputSimple = styled.input<{
  isNotValid?: boolean;
}>`
  height: 50px;
  box-sizing: border-box;
  min-width: 0px;
  max-width: 100%;
  font-size: 1.2em;
  margin: 5px;
  padding: 10px;
  border: solid #3c3e3f 1px;
  border-radius: 5px;
  background-color: ${({ isNotValid }) => (isNotValid ? "pink" : "white")};
  :disabled {
    background-color: #d3d3d3;
  }
`;

export const InputVanishing = styled.input<{
  isVisible: boolean;
  isNotValid?: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  min-height: 50px;
  font-size: 1.2em;

  margin: 5px;
  padding: 10px;
  border: solid #3c3e3f 1px;
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
  min-width: 100px;
  max-width: 100%;
  font-size: 1.2em;
  margin: 5px;
  padding: 0 5px;
  border: solid #3c3e3f 1px;
  border-radius: 5px;
  background-color: white;
`;

export const ErrorDiv = styled.div`
  color: red;
  margin: 0;
  padding: 0;
  height: 20px;
  font-size: 0.6em;
`;

export const ErrorParagraph = styled.p`
  margin: 0 10px;
`;
