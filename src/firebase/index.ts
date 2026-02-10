
// This file is the public API for the firebase module.
// It re-exports the necessary providers and hooks for the rest of the application.
// The actual initialization logic has been moved to client-provider.tsx to ensure
// it only runs on the client and without delay.

export * from './provider';
export * from './client-provider';
export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
