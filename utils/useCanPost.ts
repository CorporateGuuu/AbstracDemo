// utils/useCanPost.ts
import { useAuth } from '../app/hooks/useAuth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';

export const useCanPost = () => {
  const { user } = useAuth();
  const [canPost, setCanPost] = useState(false);

  useEffect(() => {
    if (!user) {
      setCanPost(false);
      return;
    }

    // User can post if they have at least ONE completed dare where they WON
    const q = query(
      collection(db, 'dares'),
      where('acceptedParticipants', 'array-contains', user.uid),
      where('status', '==', 'completed'),
      where('winnerId', '==', user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setCanPost(!snapshot.empty);
    });

    return unsub;
  }, [user]);

  return canPost;
};
