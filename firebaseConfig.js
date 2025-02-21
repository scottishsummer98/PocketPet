import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvEvX5LAlL84rMuq91cppDv1KDA4r3yAo",
  authDomain: "pocketpet-34148.firebaseapp.com",
  projectId: "pocketpet-34148",
  storageBucket: "pocketpet-34148.appspot.com",
  messagingSenderId: "888432875243",
  appId: "1:888432875243:web:96f97828ceea93396450ae",
  measurementId: "G-7CDDGGM2X3",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
