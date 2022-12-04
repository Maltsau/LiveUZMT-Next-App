import AddButton from "./AddButton";
import Image from "next/image";
import AddIcon from "../../public/add-photo.png";
import styled from "styled-components";

const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  padding: 0;
`;

export default function AddPhotoButton() {
  return (
    <AddButton>
      <Image src="/add-photo.png" height={50} width={50} alt="PHOTO" />
    </AddButton>
  );
}
