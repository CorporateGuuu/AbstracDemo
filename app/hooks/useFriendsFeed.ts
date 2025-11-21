// hooks/useFriendsFeed.ts
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from './useAuth';

interface Post {
  id: string;
  content: string;
  authorId: string;
  createdAt: any;
  engagementScore: number;
  visibility: 'public' | 'friends' | 'private';
  media?: string[];
}

export const useFriendsFeed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!user) return;

    // Get your friends' IDs
    const friendsQuery = query(
      collection(db, 'friends'),
      where('userId', '==', user.uid)
    );

    const unsubFriends = onSnapshot(friendsQuery, async (snap) => {
      const friendIds = snap.docs.map(d => d.data().friendId);
      friendIds.push(user.uid); // include yourself

      const q = query(
        collection(db, 'posts'),
        where('authorId', 'in', friendIds.length > 0 ? friendIds : ['__null__']),
        where('visibility', '!=', 'private'),
        orderBy('createdAt', 'desc'),
        limit(50)
      );

      const unsubPosts = onSnapshot(q, (postSnap) => {
        setPosts(postSnap.docs.map(d => ({ id: d.id, ...d.data() } as Post)));
      });

      return unsubPosts;
    });

    return () => unsubFriends();
  }, [user]);

  return posts;
};
