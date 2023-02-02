import "../styles/globals.css";
import "../styles/reactSelect.scss";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// import { getAnalytics } from "firebase/analytics";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import UserContextProvider from "./context/UserContext";
import EditModeContextProvider from "./context/EditModeContext";
import Layout from "../components/Layout";

const firebaseConfig = {
  apiKey: "AIzaSyCou46RJqbZCKZo2tRyqpMgjdV751MG1_I",
  authDomain: "liveuzmt.firebaseapp.com",
  projectId: "liveuzmt",
  storageBucket: "liveuzmt.appspot.com",
  messagingSenderId: "974301975601",
  appId: "1:974301975601:web:78555214e4663f70983110",
  measurementId: "G-2PX6H49JKV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// console.log("app", db);
async function getUsers() {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const userList = usersSnapshot.docs.map((item) => item.data());
  return userList;
}
getUsers();

// const analytics = getAnalytics(app);

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <EditModeContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </EditModeContextProvider>
      </UserContextProvider>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
}
