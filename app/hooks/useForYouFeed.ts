// hooks/useForYouFeed.ts
import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from './useAuth';

export const useForYouFeed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'forYouScores'),
      where('userId', '==', user.uid),
      orderBy('score', 'desc'),
      orderBy('lastInteracted', 'desc'),
      limit(30)
    );

    const unsub = onSnapshot(q, async (snap) => {
      const authorIds = snap.docs.map(d => d.data().authorId);

      if (authorIds.length === 0) {
        // Cold start: show Explore
        const fallback = query(
          collection(db, 'posts'),
          where('visibility', '==', 'public'),
          orderBy('engagementScore', 'desc'),
          limit(20)
        );
        const fallbackSnap = await getDocs(fallback);
        setPosts(fallbackSnap.docs.map(d => ({id: d.id, ...d.data()})));
        return;
      }

      // Fetch latest public posts from top authors
      const postsQuery = query(
        collection(db, 'posts'),
        where('authorId', 'in', authorIds.slice(0, 10)),
        where('visibility', '==', 'public'),
        orderBy('createdAt', 'desc'),
        limit(30)
      );

      const postsSnap = await getDocs(postsQuery);
      setPosts(postsSnap.docs.map(d => ({id: d.id, ...d.data()})));
    });

    return unsub;
  }, [user]);

  return posts;
};
