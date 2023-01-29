import { FC, ReactElement, ReactNode } from "react";
import { useRef, useEffect } from "react";
import styled from "styled-components";

interface DialogPropsType {
  children: React.ReactNode | string;
  isVisible: boolean;
  onClose: () => void;
}

const DialogStyled = styled.dialog`
  position: absolute;
  top: 20%;
  max-width: 90%;
  min-width: 60%;
  border: 0;
  padding: 0;
  text-align: center;
  z-index: 1000;
  ::backdrop {
    background: rgba(255, 0, 0, 0.25);
    opacity: 0.9;
  }
`;

// const ModalHeader = styled.div`
//   display: flex;
//   background-color: red;
//   width: 100%;
//   padding: 1px;
// `;

export default function ModalDialog({
  children,
  isVisible,
  onClose,
}: DialogPropsType) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.show();
    }
  }, []);
  console.log(dialogRef);
  return isVisible ? (
    <DialogStyled ref={dialogRef} open onClick={onClose}>
      {children}
    </DialogStyled>
  ) : null;
}
