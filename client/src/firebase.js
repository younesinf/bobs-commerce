import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDQAfivCYjvuADsCPcFgkWpH5bUXebrB4M",
  authDomain: "mern-auth-8b5f6.firebaseapp.com",
  projectId: "mern-auth-8b5f6",
  storageBucket: "mern-auth-8b5f6.appspot.com",
  messagingSenderId: "968809270416",
  appId: "1:968809270416:web:aca57d7d2958ff5e355c15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);