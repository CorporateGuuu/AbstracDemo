// hooks/useFriendsOfFriendsSuggestions.ts
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from './useAuth';

interface UserSuggestion {
  id: string;
  displayName?: string;
  email?: string;
  friends?: string[];
  mutualCount: number;
}

interface FirestoreUser {
  displayName?: string;
  email?: string;
  friends?: string[];
}

export const useFriendsOfFriendsSuggestions = () => {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'friends'),
      where('userId', '==', user.uid)
    );

    return onSnapshot(q, async (snap) => {
      const friendIds = snap.docs.map(d => d.data().friendId);

      const fofQueries = friendIds.map(id =>
        query(collection(db, 'friends'), where('userId', '==', id))
      );

      const results = await Promise.all(fofQueries.map(q => getDocs(q)));
      const fofIds = new Set(
        results.flatMap(r => r.docs.map(d => d.data().friendId))
      );

      // Remove self, existing friends, blocked
      const blockedSnap = await getDocs(
        query(collection(db, 'blocks'), where('blockerId', '==', user.uid))
      );
      const blockedIds = blockedSnap.docs.map(d => d.data().blockedId);

      const candidates = Array.from(fofIds)
        .filter(id => id !== user.uid)
        .filter(id => !friendIds.includes(id))
        .filter(id => !blockedIds.includes(id))
        .slice(0, 20);

      const usersSnap = await Promise.all(
        candidates.map(id => getDoc(doc(db, 'users', id)))
      );

      const users: UserSuggestion[] = usersSnap
        .map(docSnap => ({ id: docSnap.id, ...(docSnap.data() as FirestoreUser) }))
        .map(u => ({
          ...u,
          mutualCount: u.friends?.filter((f: string) => friendIds.includes(f))?.length || 0
        }))
        .sort((a, b) => b.mutualCount - a.mutualCount);

      setSuggestions(users);
    });
  }, [user]);

  return suggestions;
};
