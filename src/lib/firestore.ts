import { addDoc, collection, serverTimestamp, type Firestore } from "firebase/firestore";

export const addCustomCard = (db: Firestore, label: string) => {
    if (!label) return Promise.reject("Label is required.");

    const newCard = {
        label,
        createdAt: serverTimestamp(),
    };
    
    return addDoc(collection(db, 'cards'), newCard);
};
