// utils/isBlocked.ts
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../app/hooks/useAuth';

export const useIsBlocked = (targetId: string) => {
  const { user } = useAuth();
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!user) return;
    return onSnapshot(
      doc(db, 'blocks', `${user.uid}_${targetId}`),
      snap => setBlocked(snap.exists)
    );
  }, [user, targetId]);

  return blocked;
};
