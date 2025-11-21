// hooks/useFollowingFeed.ts
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from './useAuth';

export const useFollowingFeed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) return;

    const followingQuery = query(
      collection(db, 'follows'),
      where('followerId', '==', user.uid)
    );

    const unsub = onSnapshot(followingQuery, async (snap) => {
      const followedIds = snap.docs.map(d => d.data().followedId);

      if (followedIds.length === 0) {
        setPosts([]);
        return;
      }

      const q = query(
        collection(db, 'posts'),
        where('authorId', 'in', followedIds),
        where('visibility', '==', 'public'),
        orderBy('createdAt', 'desc'),
        limit(50)
      );

      const unsubPosts = onSnapshot(q, (postSnap) => {
        setPosts(postSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      });

      return unsubPosts;
    });

    return unsub;
  }, [user]);

  return posts;
};
