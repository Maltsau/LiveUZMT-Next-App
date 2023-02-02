import ModalDialog from "./ModalDialog";
import {
  DialogContainer,
  Warning,
  Question,
  ButtonStyled,
} from "../menuComponents/ModalDialogComponents";

export default function AddMonthModal({
  isVisible,
  onClose,
  onSubmit,
}: {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <ModalDialog
      isNotTransparent={true}
      isVisible={isVisible}
      onClose={onClose}
    >
      <DialogContainer>
        <Warning>
          Похоже, что вы первый, кто решил добавить запись в этом месяце
        </Warning>
        <Question>Введите дополнительную информацию</Question>
        <ButtonStyled onClick={onSubmit}>Ввести</ButtonStyled>
        <ButtonStyled onClick={onClose}>Отмена</ButtonStyled>
      </DialogContainer>
    </ModalDialog>
  );
}
