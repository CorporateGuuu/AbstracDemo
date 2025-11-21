// hooks/useExploreFeed.ts – Highest engagement (last 24h)
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export const useExploreFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const twentyFourHoursAgo = Timestamp.fromDate(
      new Date(Date.now() - 24 * 60 * 60 * 1000)
    );

    const q = query(
      collection(db, 'posts'),
      where('visibility', '==', 'public'),
      where('createdAt', '>', twentyFourHoursAgo),
      orderBy('createdAt', 'desc'),
      orderBy('engagementScore', 'desc'), // likes + comments*2 + shares*3
      limit(50)
    );

    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, []);

  return posts;
};
