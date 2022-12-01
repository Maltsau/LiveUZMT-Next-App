import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import styled from "styled-components";

const Wraper = styled.div`
  border: 1px solid red;
`;

const Container = styled.div`
  width: 100%;
  border: 1px solid red;
  min-height: 200px;
`;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Wraper>
      <Header></Header>
      <Container>{children}</Container>
      <Footer></Footer>
    </Wraper>
  );
}
