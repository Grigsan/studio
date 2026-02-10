import { EventEmitter } from 'events';

// This is a simple, shared event emitter for the application.
// It's used here to globally handle Firestore permission errors.
export const errorEmitter = new EventEmitter();
