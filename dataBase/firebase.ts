import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";

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

export async function getUsers() {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const userList = usersSnapshot.docs.map((item) => item.data());
  return userList;
}

export async function getDataBase() {
  const dataBaseCol = collection(db, "dataBase");
  const dataBaseSnapshot = await getDocs(dataBaseCol);
  const dataBase = dataBaseSnapshot.docs.map((item) => item.data());
  return dataBase;
}
