import { ReactNode } from "react";
import styled from "styled-components";
import Link from "next/link";

import HeaderButton from "./buttons/HeaderButton";

const Rectangle = styled.div`
  display: flex;
  background-color: red;
  width: 100%;
  padding: 1px;
`;

const UserLabel = styled.label`
  margin: auto 5px;
  color: white;
`;
export default function Header({
  children,
  user,
  onAllReset,
}: {
  children?: ReactNode | string;
  user: string;
  onAllReset?: any;
}) {
  return (
    <Rectangle>
      <HeaderButton>
        <Link href={"/"}>X</Link>
      </HeaderButton>
      <UserLabel>{user}</UserLabel>
      {children}
    </Rectangle>
  );
}
