// hooks/useForYouScores.ts
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from './useAuth';

interface Author {
  id: string;
  displayName?: string;
  email?: string;
  username: string;
}

export const useForYouScores = () => {
  const { user } = useAuth();
  const [topAuthors, setTopAuthors] = useState<Author[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'forYouScores'),
      where('userId', '==', user.uid),
      orderBy('score', 'desc'),
      limit(15)
    );

    const unsub = onSnapshot(q, async (snap) => {
      const authorIds = snap.docs.map(d => d.data().authorId);

      if (authorIds.length === 0) {
        setTopAuthors([]);
        return;
      }

      const usersSnap = await Promise.all(
        authorIds.map(id => getDoc(doc(db, 'users', id)))
      );

      const authors = usersSnap
        .map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Author))
        .filter(u => !isFollowing(u.id)) // exclude already followed
        .slice(0, 10);

      setTopAuthors(authors);
    });

    return unsub;
  }, [user]);

  return { topAuthors };
};

// Placeholder function - would integrate with actual following system
function isFollowing(userId: string): boolean {
  // Implement following check logic here
  // For now, assume no one is followed to show all recommendations
  return false;
}
