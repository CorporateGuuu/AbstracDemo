// hooks/useMutualFriends.ts
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from './useAuth';

export const useMutualFriends = (targetId: string) => {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user || user.uid === targetId) return;

    const q1 = query(
      collection(db, 'friends'),
      where('userId', '==', user.uid)
    );
    const q2 = query(
      collection(db, 'friends'),
      where('userId', '==', targetId)
    );

    const unsub1 = onSnapshot(q1, (snap1) => {
      const myFriends = snap1.docs.map(d => d.data().friendId);

      const unsub2 = onSnapshot(q2, (snap2) => {
        const theirFriends = snap2.docs.map(d => d.data().friendId);
        const mutual = myFriends.filter(id => theirFriends.includes(id));
        setCount(mutual.length);
      });

      return unsub2;
    });

    return unsub1;
  }, [user, targetId]);

  return count;
};
