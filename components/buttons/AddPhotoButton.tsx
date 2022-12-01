import AddButton from "./AddButton";
import AddIcon from "../../assets/add-photo.png";
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
      <ImageStyled src={AddIcon} alt="PHOTO" />
    </AddButton>
  );
}
