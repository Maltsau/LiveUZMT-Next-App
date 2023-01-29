import ModalDialog from "./ModalDialog";
import Image from "next/image";
import {
  DialogContainer,
  Warning,
  ButtonStyled,
} from "../menuComponents/ModalDialogComponents";

export default function ErrorDialog({
  onClose,
  isVisible,
  message,
}: {
  onClose: () => void;
  isVisible: boolean;
  message: string;
}) {
  return (
    <ModalDialog onClose={onClose} isVisible={isVisible}>
      <DialogContainer>
        <Warning>{message}</Warning>
        <div>
          <Image
            src={"/error.png"}
            alt={"Success"}
            height={50}
            width={50}
          ></Image>
        </div>
        <ButtonStyled onClick={onClose}>Закрыть</ButtonStyled>
      </DialogContainer>
    </ModalDialog>
  );
}
