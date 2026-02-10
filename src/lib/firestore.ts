import { addDoc, collection, serverTimestamp, type Firestore, type CollectionReference } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export const addCustomCard = (db: Firestore, label: string) => {
    if (!label) {
        return Promise.reject(new Error("Label is required."));
    }

    const newCard = {
        label,
        createdAt: serverTimestamp(),
    };
    
    const cardsCollection = collection(db, 'cards');

    // Return the promise from addDoc for the UI to chain .then() and .catch()
    return addDoc(cardsCollection, newCard)
        .catch((serverError) => {
            // Create our rich, contextual error
            const permissionError = new FirestorePermissionError({
                path: (cardsCollection as CollectionReference).path,
                operation: 'create',
                requestResourceData: newCard,
            });

            // Emit the error for our global listener to pick up
            errorEmitter.emit('permission-error', permissionError);
            
            // Re-throw the original error so the component's .catch() block still runs
            throw serverError;
        });
};
