import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDG_tHXVl_LOysT6vnf36fQ_l7iC2Yff9E",
  authDomain: "typestore-react.firebaseapp.com",
  projectId: "typestore-react",
  storageBucket: "typestore-react.firebasestorage.app",
  messagingSenderId: "305311569830",
  appId: "1:305311569830:web:7822d3cf91d36ece236167",
  measurementId: "G-K7B4HZ6ZHK"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

export default app;
