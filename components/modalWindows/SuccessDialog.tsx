import ModalDialog from "./ModalDialog";
import Image from "next/image";
import {
  DialogContainer,
  Warning,
} from "../menuComponents/ModalDialogComponents";

export default function SuccessDialog({
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
        <Image
          src={"/Success.svg"}
          alt={"Success"}
          height={50}
          width={50}
        ></Image>
      </DialogContainer>
    </ModalDialog>
  );
}
