import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "./context/UserContext";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
