// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-zQnWWKaSZokvU2IcjV4ZvmQS3ogOjtI",
  authDomain: "toys-marketplace-e1c65.firebaseapp.com",
  projectId: "toys-marketplace-e1c65",
  storageBucket: "toys-marketplace-e1c65.appspot.com",
  messagingSenderId: "341249913692",
  appId: "1:341249913692:web:d44d828e32581e661c8799"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;