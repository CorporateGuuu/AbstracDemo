import React from 'react';
import { useIsInFeed } from '../../contexts/FeedContext';

export const useRewardFeedback = () => {
  const isInFeed = useIsInFeed();

  const trigger = async (amount: number) => {
    // BLOCK ALL VISUAL REWARDS IN FEED
    if (isInFeed) return;

    // Everything else (profile, wallet, rewards tab, etc.) still gets full glory
    await Feedback.reward();
    confettiRef.current?.start();
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(800),
      Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();

    // Show floating +stones text, etc.
  };

  return { trigger };
};
