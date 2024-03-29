import { ReactNode } from "react";
import styled from "styled-components";

import HeaderButton from "./buttons/HeaderButton";

const Rectangle = styled.div`
  display: flex;
  background-color: red;
  width: 100%;
`;

const UserLabel = styled.label`
  margin: auto 5px;
  color: white;
`;
export default function Header({
  children,
}: {
  children?: ReactNode | string;
}) {
  return (
    <Rectangle>
      <HeaderButton>Header</HeaderButton>
      {children}
    </Rectangle>
  );
}
