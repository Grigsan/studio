import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "studio-6463950600-edbff",
  "appId": "1:267858110872:web:9dcb9b0ab7fd565a82a3ed",
  "apiKey": "AIzaSyBjlPR841YvcLvKNnbBxNakxDiExjj7B8A",
  "authDomain": "studio-6463950600-edbff.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "267858110872"
};

function getFirebase() {
  const apps = getApps();
  const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}

export async function initializeFirebase(): Promise<{
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}> {
    const { app, auth, firestore } = getFirebase();
    return { app, auth, firestore };
}

export * from './provider';
export * from './client-provider';
export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
