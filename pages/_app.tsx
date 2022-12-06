import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useCallback, useEffect, useState } from "react";
import UserContextProvider from "./context/UserContext";
import { useUserContext } from "./context/UserContext";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const { user, setUser } = useUserContext();

  const getUser = useCallback(async (login: string, password: string) => {
    const response = await fetch("/api/login2", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: { "Content-Type": "application/json" },
    });
    const responseData = await response.json();
    setUser(responseData);
    console.log("Res", responseData);
  }, []);
  console.log("App user", user, setUser);
  return (
    <UserContextProvider>
      <Layout
        onLogIn={(login: string, password: string) => {
          console.log("App", login, password);
          getUser(login, password);
        }}
        onSignOut={() => {
          getUser("", "");
        }}
        user={user}
      >
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
