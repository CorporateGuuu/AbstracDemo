// utils/useHasPosted.ts
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../app/hooks/useAuth';

export const useHasPosted = () => {
  const { user } = useAuth();
  const [hasPosted, setHasPosted] = useState(false);

  useEffect(() => {
    if (!user) {
      setHasPosted(false);
      return;
    }

    const q = query(
      collection(db, 'posts'),
      where('authorId', '==', user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setHasPosted(!snapshot.empty);
    });

    return unsub;
  }, [user]);

  return hasPosted;
};
