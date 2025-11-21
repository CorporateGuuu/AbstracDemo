import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, Alert, StyleSheet } from 'react-native';
import { useWeeklyAbstrac } from '../hooks/useWeeklyAbstrac';

export default function AbstracWeeklyScreen() {
  const { challenge, loading } = useWeeklyAbstrac();
  const [claiming, setClaiming] = useState(false);

  // Mock data for leaderboard display (replace with real user data)
  const [leaderboard, setLeaderboard] = useState<Array<{ userId: string; username: string; completedAt: Date }>>([]);

  useEffect(() => {
    if (challenge?.leaderboard) {
      // Convert leaderboard object to array for FlatList
      const leaderboardArray = Object.entries(challenge.leaderboard).map(([userId, data]) => ({
        userId,
        username: data.username || `User${userId.slice(-6)}`, // Mock username if not provided
        completedAt: data.completedAt?.toDate?.() || new Date(),
      }));
      setLeaderboard(leaderboardArray);
    }
  }, [challenge]);

  const claim = async (challengeId: string, proof: string) => {
    try {
      setClaiming(true);
      // TODO: Implement claimWeeklyAbstracReward Firebase callable function call
      Alert.alert('Success!', 'Reward claimed! Check your stones.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to claim reward');
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading challenge...</Text>
      </View>
    );
  }

  if (!challenge) {
    return (
      <View style={styles.center}>
        <Text>No active challenge this week</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mega}>WEEKLY CHALLENGE</Text>
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.prize}>Reward: +{challenge.reward} stones</Text>

      <Pressable
        onPress={() => claim(challenge.id, "I did it!")}
        disabled={claiming}
        style={styles.claimButton}
      >
        <Text style={styles.claim}>
          {claiming ? 'Claiming...' : 'Claim Reward'}
        </Text>
      </Pressable>

      {leaderboard.length > 0 && (
        <>
          <Text style={styles.leaderboardTitle}>Leaderboard</Text>
          <FlatList
            data={leaderboard}
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => (
              <View style={styles.leaderboardItem}>
                <Text style={styles.leaderboardText}>
                  @{item.username} – Completed!
                </Text>
                <Text style={styles.timestamp}>
                  {item.completedAt.toLocaleDateString()}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mega: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  prize: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  claimButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
  claim: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leaderboardText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
});
