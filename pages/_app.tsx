import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import UserContextProvider from "./context/UserContext";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const [userBase, setUserBase] = useState();
  useEffect(() => {
    (async function () {
      const response = await fetch("/api/logIn");
      const responseData = await response.json();
      setUserBase(responseData);
    })();
  }, []);
  return (
    <UserContextProvider>
      <Layout userBase={userBase}>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
