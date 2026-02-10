import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

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
  return new Promise((resolve) => {
    if (typeof window !== 'undefined') {
      const { app, auth, firestore } = getFirebase();
      resolve({ app, auth, firestore });
    }
  });
}

export * from './provider';
export * from './client-provider';
export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
