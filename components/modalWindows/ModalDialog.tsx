import { FC, ReactElement, ReactNode } from "react";
import { useRef, useEffect } from "react";
import styled from "styled-components";

interface DialogPropsType {
  children: React.ReactNode | string;
  isVisible: boolean;
  onClose?: () => void;
}

const DialogStyled = styled.dialog`
  border: 0;
  text-align: center;
`;

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
  return isVisible ? (
    <DialogStyled ref={dialogRef} open onClick={onClose}>
      {children}
    </DialogStyled>
  ) : null;
}
