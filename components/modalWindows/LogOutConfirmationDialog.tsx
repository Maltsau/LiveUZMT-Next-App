import Link from "next/link";
import ModalDialog from "./ModalDialog";
import { useUserStore } from "../../stores/useUserStore";
import { useLogin } from "../../hooks/useLoginHook";

import {
  DialogContainer,
  Warning,
  Question,
  ButtonStyled,
} from "../menuComponents/ModalDialogComponents";

interface LogOutConfirmationDialogPropsType {
  isVisible: boolean;
  onSubmit: () => void;
  onAbort: () => void;
}

export default function LogOutConfirmationDialog({
  isVisible,
  onSubmit,
  onAbort,
}: LogOutConfirmationDialogPropsType) {
  const user = useUserStore();
  const { mutate: logOut, data: logOutResponse } = useLogin({
    onSuccess: (logOutResponse) => {
      user?.setUser(logOutResponse.userName, logOutResponse.role);
      onSubmit();
    },
    onError: () => {},
  });
  return (
    <ModalDialog isVisible={isVisible} onClose={onAbort}>
      <DialogContainer>
        <Warning>
          Неавторизованные пользователи не могут добавлять данные
        </Warning>
        <Question>Хотоите выйти?</Question>
        <Link href={"/"}>
          <ButtonStyled
            onClick={() => {
              logOut({ login: "Tweenpipe", password: "Fuch" });
            }}
          >
            Да
          </ButtonStyled>
        </Link>
        <ButtonStyled onClick={onAbort}>Нет</ButtonStyled>
      </DialogContainer>
    </ModalDialog>
  );
}
