'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, type Query, type DocumentData, type CollectionReference } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useCollection<T extends DocumentData>(query: Query | null) {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    // The path is not directly on the Query type, so we need a cast.
    // It's safe here because we know we are passing collection references.
    const queryPath = (query as CollectionReference).path;

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const result: T[] = [];
        snapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(result);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        const permissionError = new FirestorePermissionError({
            path: queryPath,
            operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);

        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, isLoading, error };
}
