import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useAbstracDare } from '../hooks/useAbstracDare'; // Assuming you have this hook

export default function AbstracScreen() {
  const { dare, loading } = useAbstracDare();
  const confettiRef = useRef<ConfettiCannon>(null);

  const claim = async (dareId: string) => {
    try {
      // TODO: Implement claim logic using Firebase callable function
      await claimAbstracReward({ dareId });
      // Trigger confetti on success
      confettiRef.current?.start();
    } catch (error) {
      console.error('Failed to claim reward:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.card}>
        <Text>Loading dare...</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Abstrac Dare of the Day</Text>
      <Text style={styles.dare}>{dare?.title || 'No dare available'}</Text>
      <Text style={styles.reward}>+{dare?.reward || 0} stones</Text>

      <Pressable onPress={() => dare?.id && claim(dare.id)} disabled={!dare}>
        <Text style={styles.btn}>I Did It!</Text>
      </Pressable>

      <ConfettiCannon ref={confettiRef} count={80} origin={{x: -10, y: 0}} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dare: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  reward: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#007AFF',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// TODO: Import or define the claimAbstracReward function
const claimAbstracReward = async (data: { dareId: string }) => {
  // Implement Firebase callable function call
};
