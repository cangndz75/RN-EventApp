import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkPcFxnGp4tagNU4cU6UAZGdlh1uFf3JU",
  authDomain: "campusevent-b0f8e.firebaseapp.com",
  projectId: "campusevent-b0f8e",
  storageBucket: "campusevent-b0f8e.firebasestorage.app",
  messagingSenderId: "70265954984",
  appId: "1:70265954984:web:15c7011b3f5c401728589d",
  measurementId: "G-QX841RD5K1",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
