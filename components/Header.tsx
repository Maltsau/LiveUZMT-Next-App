import { ReactNode } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import HeaderButton from "./buttons/HeaderButton";

const Rectangle = styled.div`
  display: flex;
  background-color: red;
  width: 100%;
  padding: 1px;
`;

const ButtonBar = styled.div`
  display: flex;
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
  user?: string | undefined;
  onAllReset?: any;
}) {
  const router = useRouter();
  if (router.asPath === "/search") {
    var content = (
      <ButtonBar>
        <HeaderButton>
          <Link href={"/"}>X</Link>
        </HeaderButton>
      </ButtonBar>
    );
  } else {
    var content = (
      <ButtonBar>
        <HeaderButton>
          <Link href={"/"}>X</Link>
        </HeaderButton>
        <HeaderButton>
          <Link href={"/search"}>
            <Image src="/search.svg" alt="Search" width={15} height={15} />
          </Link>
        </HeaderButton>
      </ButtonBar>
    );
  }
  return (
    <Rectangle>
      {content}
      <UserLabel>{user}</UserLabel>
      {children}
    </Rectangle>
  );
}
