import React from "react";
import styled, { keyframes } from "styled-components";

const ModalBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #18020e;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: auto;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  border-left: 4px solid #3c3e3f;
  background: transparent;
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const LabelStyled = styled.label`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: white;
`;

export default function LoaderModal({ text }: { text: string }) {
  return (
    <ModalBackground>
      <Spinner></Spinner>
      <LabelStyled>{text}</LabelStyled>
    </ModalBackground>
  );
}
