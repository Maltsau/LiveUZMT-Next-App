import AddButton from "./AddButton";
import Image from "next/image";
import AddIcon from "../../public/excell.svg";
import styled from "styled-components";

const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  padding: 0;
`;

export default function AddExcellButton() {
  return (
    <AddButton>
      <Image src="/excell.svg" height={50} width={50} alt="EXSELL" />
    </AddButton>
  );
}
