import { addDoc, collection, serverTimestamp, type Firestore } from "firebase/firestore";

export const addCustomCard = (db: Firestore, userId: string, label: string) => {
    if (!userId || !label) return Promise.reject("User ID and label are required.");

    const newCard = {
        label,
        userId,
        createdAt: serverTimestamp(),
    };
    
    return addDoc(collection(db, 'users', userId, 'cards'), newCard);
};
