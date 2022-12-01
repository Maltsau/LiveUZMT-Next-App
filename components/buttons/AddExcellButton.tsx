import AddButton from "./AddButton";
import AddIcon from "../../assets/excell.svg";
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
      <ImageStyled src={AddIcon} alt="PHOTO" />
    </AddButton>
  );
}
