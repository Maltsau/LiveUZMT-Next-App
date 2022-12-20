import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div<{
  isVisible: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
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

const ModalContent = styled.div`
  display: block;
  width: 100%;
  min-height: 100px;
  background-color: white;
  margin: auto;
  border: 1px solid #888;
  width: 50%;
`;

const ModalHeader = styled.div`
  display: flex;
  background-color: red;
  width: 100%;
  padding: 1px;
`;

export default function ModalWindow({
  isVisible,
  children,
  onClose,
}: {
  isVisible: boolean;
  children: React.ReactNode | string;
  onClose: any;
}) {
  return (
    <ModalBackground isVisible={isVisible} onClick={onClose}>
      <ModalContent onClick={(e: any) => e.stopPropagation()}>
        <ModalHeader>
          <button onClick={onClose}>X</button>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalBackground>
  );
}
