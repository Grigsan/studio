'use client';
import { GoogleAuthProvider, signInWithRedirect, getAuth } from 'firebase/auth';
import { useFirebaseApp } from '@/firebase';
import { Button } from '@/components/ui/button';
import { MessageCircleHeart } from 'lucide-react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  if (isLoading || user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-sm p-8 space-y-8 bg-card text-card-foreground rounded-2xl shadow-lg border">
        <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
                <div className="bg-primary p-3 rounded-xl">
                    <MessageCircleHeart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="text-4xl font-bold text-foreground">Говоруша</h1>
            </div>
          <p className="text-muted-foreground">Войдите, чтобы сохранять свои карточки</p>
        </div>
        <Button onClick={handleGoogleSignIn} className="w-full" size="lg">
          <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 64.5C308.6 102.3 279.2 88 248 88c-86.5 0-157.2 70.2-157.2 156.8s70.7 156.8 157.2 156.8c99.9 0 134.8-82.9 138.9-124.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
          Войти через Google
        </Button>
      </div>
    </div>
  );
}
