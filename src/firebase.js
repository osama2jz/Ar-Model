// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyAqi8EioZAZgTT5MAhxqBUqYTpcEPUtO3M",
//   authDomain: "decimal-solutions-8c191.firebaseapp.com",
//   projectId: "decimal-solutions-8c191",
//   storageBucket: "decimal-solutions-8c191.appspot.com",
//   messagingSenderId: "674398346861",
//   appId: "1:674398346861:web:0f1d877901c2d7e30da964",
//   measurementId: "G-C7V3M8PVCB",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDq_j8jmjQ-xRN25zsvw7YyZNpRxJFDZvA",
  authDomain: "teamawep-6eff2.firebaseapp.com",
  projectId: "teamawep-6eff2",
  storageBucket: "teamawep-6eff2.appspot.com",
  messagingSenderId: "93911136966",
  appId: "1:93911136966:web:e0b0151e5c7fc3b436b5c7",
  measurementId: "G-BJKQPFVYZD",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAgzOm3UDpKsZvVkv429gx_G65iRSbRMZI",
//   authDomain: "awep-92675.firebaseapp.com",
//   projectId: "awep-92675",
//   storageBucket: "awep-92675.appspot.com",
//   messagingSenderId: "401104168960",
//   appId: "1:401104168960:web:fac1489ee067a4329cd0e5",
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
export const uploadSingleFile = ({
  file,
  folderName,
  urlSetter = () => {},
  setProgress = () => {},
}) => {
  folderName = folderName || "uploads";
  if (!file) return;
  const storageRef = ref(storage, `/${folderName}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(true);
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(
        (url) => {
          urlSetter(url);
          setProgress(false);
        }
        // url fetched... store it
        // handleChangeCategory({ name: "image", value: url })
      );
    }
  );
};
