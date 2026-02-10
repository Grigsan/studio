'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';
import { FirestorePermissionError } from '@/firebase/errors';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: unknown) => {
      // We only want to handle our custom FirestorePermissionError
      if (error instanceof FirestorePermissionError) {
        console.error("Firestore Permission Error:", error.message);

        // In development, throw the error to show the Next.js overlay
        if (process.env.NODE_ENV === 'development') {
          // Use a timeout to escape the current call stack and allow Next.js to catch it
          setTimeout(() => {
            throw error;
          }, 0);
        } else {
          // In production, show a user-friendly toast.
          toast({
            variant: 'destructive',
            title: 'Ошибка доступа',
            description: 'У вас нет прав для выполнения этого действия.',
          });
        }
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.removeListener('permission-error', handleError);
    };
  }, [toast]);

  return null; // This component does not render anything
}
