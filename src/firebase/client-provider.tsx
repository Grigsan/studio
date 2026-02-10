'use client';

import { FirebaseProvider } from './provider';
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';
import type { ReactNode } from 'react';

// Initialize Firebase synchronously. This ensures that all Firebase services
// are available immediately on the client-side.
const app: FirebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);

export function FirebaseClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  // The provider now simply passes the already initialized instances down.
  // This removes the useEffect/useState delay which caused the auth error.
  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
