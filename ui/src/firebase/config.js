import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidV4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyDScPcOO5A6UGVSB6wnhVsKWBNOGg3Pjc8",
  authDomain: "crespo-app-5ee01.firebaseapp.com",
  projectId: "crespo-app-5ee01",
  storageBucket: "crespo-app-5ee01.appspot.com",
  messagingSenderId: "1086472846079",
  appId: "1:1086472846079:web:7a86373168386ad3df2aca",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default async function uploadfile(file) {
  const storageRef = ref(storage, `reclamosImags/${uuidV4()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
