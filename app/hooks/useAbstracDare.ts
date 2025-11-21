import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase/index';

export interface AbstracDare {
  id: string;
  title: string;
  reward: number;
  claimedBy?: string[];
  expiresAt?: Date;
}

export const useAbstracDare = () => {
  const [dare, setDare] = useState<AbstracDare | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentDare = async () => {
      try {
        const now = new Date();
        const daresRef = collection(db, 'abstracDares');
        const q = query(
          daresRef,
          where('expiresAt', '>', now),
          orderBy('expiresAt', 'desc'),
          limit(1)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setDare(null);
        } else {
          const doc = querySnapshot.docs[0];
          setDare({
            id: doc.id,
            ...doc.data(),
            expiresAt: doc.data().expiresAt?.toDate(),
          } as AbstracDare);
        }
      } catch (err) {
        console.error('Failed to fetch dare:', err);
        setError('Failed to load dare');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentDare();
  }, []);

  return {
    dare,
    loading,
    error,
    refetch: () => setLoading(true), // Trigger re-fetch by resetting loading
  };
};
