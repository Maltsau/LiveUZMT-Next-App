import { ReactNode } from "react";
import styled from "styled-components";

const Rectangle = styled.div`
  display: flex;
  background-color: red;
  width: 100%;
  padding: 1px;
  margin: 0 -5px;
`;

const UserLabel = styled.label`
  margin: auto 5px;
  color: white;
`;
export default function Footer({
  children,
}: {
  children?: ReactNode | string;
}) {
  return <Rectangle>{children}</Rectangle>;
}
