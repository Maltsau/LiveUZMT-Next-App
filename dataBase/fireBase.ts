import { initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

import admin from "firebase-admin";

// import serviceAccount from "../liveuzmt-firebase-adminsdk-uwgys-1f0306b01f.json";
const serviceAccount = require("../liveuzmt-firebase-adminsdk-uwgys-1f0306b01f.json");

// const {
//   API_KEY,
//   AUTH_DOMAIN,
//   DATABASE_URL,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGIND_SEND_ID,
//   APP_ID,
//   MEASUREMENT_ID,
// } = process.env;

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGIND_SEND_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID,
// };
!admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL:
        "https://liveuzmt-default-rtdb.europe-west1.firebasedatabase.app",
    })
  : admin.app();

const db = admin.database();
const usersRef = db.ref("users");

// export function getUserFireBase() {
//   usersRef.on("value", (snapshot) => {
//     console.log("Firebase", snapshot.val());
//   });
// }

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// const usersRef = db.ref("users");

export function getUserFireBase() {
  usersRef.on(
    "value",
    (snapshot) => {
      console.log("Function resolved", snapshot.val());
    },
    (error) => {
      console.log("Function error", error);
    }
  );
}

export function getAllFireBase() {
  return usersRef.get();
}
