import styled from "styled-components";
import { Link } from "react-router-dom";

import HeaderButton from "../buttons/HeaderButton";
import BNIcon from "../../assets/BNIcon.webp";

const ImgStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  padding: 0;
`;

export default function AllResetButton({ onClick }: { onClick?: any }) {
  return (
    <HeaderButton onClick={onClick}>
      <Link to="/">
        <ImgStyled src={BNIcon} alt={"BELOIL"} />
      </Link>
    </HeaderButton>
  );
}
