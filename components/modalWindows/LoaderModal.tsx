import React from "react";
import styled, { keyframes } from "styled-components";

const ModalBackground = styled.div`
  display: "block";
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
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
  border-left: 4px solid red;
  background: transparent;
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export default function LoaderModal() {
  return (
    <ModalBackground>
      <Spinner></Spinner>
    </ModalBackground>
  );
}
