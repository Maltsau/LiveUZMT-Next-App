import { FC, ReactElement, ReactNode } from "react";
import { useRef, useEffect } from "react";
import styled from "styled-components";

interface DialogPropsType {
  children: React.ReactNode | string;
  isVisible: boolean;
  isTransparent?: boolean;
  onClose: () => void;
}

const DialogStyled = styled.dialog<{
  isTransparent?: boolean;
}>`
  background-color: ${({ isTransparent }) =>
    isTransparent ? "transparent" : "#f3f5f6"};
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
  isTransparent,
  onClose,
}: DialogPropsType) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (dialogRef.current) {
      if (isVisible) {
        dialogRef.current.close();
        dialogRef.current.showModal();
      } else dialogRef.current.close();
    }
  }, [isVisible]);

  return isVisible ? (
    <DialogStyled
      isTransparent={isTransparent}
      ref={dialogRef}
      onClick={onClose}
    >
      {children}
    </DialogStyled>
  ) : null;
}
