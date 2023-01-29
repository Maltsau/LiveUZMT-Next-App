import styled, { StyledComponent } from "styled-components";

export const DialogContainer = styled.div`
  display: block;
  padding: 16px;
  margin: auto;
  border: solid #3c3e3f 1px;
  justify-content: center;
`;

export const Warning = styled.h2`
  font-size: 1.2em;
  margin: auto 5px;
  text-align: center;
`;

export const Question = styled.h2`
  font-size: 1.5em;
  margin: auto 10px;
  text-align: center;
`;

export const ButtonStyled = styled.button`
  width: 100px;
  font-size: 1.2em;
  margin: 10px;
  border: solid #3c3e3f 1px;
  border-radius: 5px;
`;
