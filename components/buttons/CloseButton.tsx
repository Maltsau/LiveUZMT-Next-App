import { Link } from "react-router-dom";

import HeaderButton from "./HeaderButton";

export default function CloseButton() {
  return (
    <HeaderButton>
      Home
      <Link to={"/"} />
    </HeaderButton>
  );
}
