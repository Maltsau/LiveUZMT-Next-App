import { ReactNode } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "../stores/useUserStore";

import HeaderButton from "./buttons/HeaderButton";

const Rectangle = styled.div`
  display: flex;
  background-color: #3c3e3f;
  width: 100%;
  padding: 1px;
`;

const ButtonBar = styled.div`
  display: flex;
`;

const UserLabel = styled.label`
  margin: auto 5px;
  color: white;
  margin-left: auto;
`;
export default function Header({
  children,
}: {
  children?: ReactNode | string;
}) {
  const router = useRouter();
  const user = useUserStore();
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
      <UserLabel>{user?.user.label}</UserLabel>
      {children}
    </Rectangle>
  );
}
