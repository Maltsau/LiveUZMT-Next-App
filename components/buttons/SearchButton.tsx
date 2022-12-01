import styled from "styled-components";

import HeaderButton from "./HeaderButton";
import SearchIcon from "../../assets/search.svg";
import { Link } from "react-router-dom";

const ImgStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  padding: 0;
`;
export default function SearchButton() {
  return (
    <HeaderButton>
      <Link to="/search">
        <ImgStyled src={SearchIcon}></ImgStyled>
      </Link>
    </HeaderButton>
  );
}
