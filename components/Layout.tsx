import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
}
