import { FC, ReactElement, ReactNode } from "react";
import { useRef, useEffect } from "react";
import styled from "styled-components";

interface DialogPropsType {
  children: React.ReactNode | string;
  isVisible: boolean;
  isNotTransparent: boolean;
  onClose: () => void;
}

const DialogStyled = styled.dialog<{
  isNotTransparent: boolean;
}>`
  background-color: ${({ isNotTransparent }) =>
    isNotTransparent ? "#f3f5f6" : "transparent"};
  max-width: 90%;
  min-width: 60%;
  border: 0;
  padding: 0;
  margin: auto;
  text-align: center;
  z-index: 9999;
  ::backdrop {
    background: white;
    opacity: 0.8;
  }
`;

export default function ModalDialog({
  children,
  isVisible,
  isNotTransparent,
  onClose,
}: DialogPropsType) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (dialogRef.current) {
      if (isVisible) dialogRef.current.showModal();
      else dialogRef.current.close();
    }
  }, [isVisible]);

  return isVisible ? (
    <DialogStyled
      isNotTransparent={isNotTransparent}
      ref={dialogRef}
      onClick={onClose}
    >
      {children}
    </DialogStyled>
  ) : null;
}
