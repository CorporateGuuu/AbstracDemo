import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase/index';

export interface WeeklyChallenge {
  id: string;
  title: string;
  reward: number;
  weekStart: Date;
  weekEnd: Date;
  participants?: string[];
  leaderboard?: Record<string, any>;
}

export const useWeeklyAbstrac = () => {
  const [challenge, setChallenge] = useState<WeeklyChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentChallenge = async () => {
      try {
        const now = new Date();

        // Get current week's Monday and next Monday
        const getMonday = (d: Date) => {
          const date = new Date(d);
          const day = date.getDay();
          const diff = date.getDate() - day + (day === 0 ? -6 : 1);
          return new Date(date.setDate(diff));
        };

        const weekStart = getMonday(now);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);

        const challengesRef = collection(db, 'weeklyAbstrac');
        const q = query(
          challengesRef,
          where('weekEnd', '>', now),
          orderBy('weekEnd', 'desc'),
          limit(1)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setChallenge(null);
        } else {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setChallenge({
            id: doc.id,
            ...data,
            weekStart: data.weekStart?.toDate(),
            weekEnd: data.weekEnd?.toDate(),
          } as WeeklyChallenge);
        }
      } catch (err) {
        console.error('Failed to fetch weekly challenge:', err);
        setError('Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentChallenge();
  }, []);

  return {
    challenge,
    loading,
    error,
    refetch: () => setLoading(true),
  };
};
