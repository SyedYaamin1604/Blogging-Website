import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC4mlKTXEE4aG4ImLmDThDbeekq44WgulI",
    authDomain: "react-blogging-app-1.firebaseapp.com",
    projectId: "react-blogging-app-1",
    storageBucket: "react-blogging-app-1.appspot.com",
    messagingSenderId: "558707375679",
    appId: "1:558707375679:web:6525b2760e72868c9c428a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };