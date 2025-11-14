import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const achievements = [
  {
    id: '1',
    title: 'Win a Challenge',
    progress: '0/1',
    stones: 5,
  },
  {
    id: '2',
    title: 'Lose a Challenge',
    progress: '0/1',
    stones: 5,
  },
  {
    id: '3',
    title: 'Refer 3 friends',
    progress: '0/3',
    stones: 20,
    hasReferral: true,
  },
  {
    id: '4',
    title: 'Activate 5 Dare Challenges',
    progress: '0/5',
    stones: 10,
  },
];

export default function AchievementsScreen() {
  const handleClaimStones = (stones: number) => {
    Alert.alert('Stones Claimed!', `You earned ${stones} free stones!`);
  };

  const handleCopyReferral = () => {
    Alert.alert('Referral Link Copied!', 'Share with friends to earn bonus stones!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.logo}>
          <Ionicons name="arrow-forward" size={30} color="#FFF" />
        </View>

        <View style={styles.notification}>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>10</Text>
          </View>
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.titleCard}>
        <Text style={styles.titleText}>Achievements</Text>
        <Text style={styles.subtitleText}>0 complete</Text>
      </View>

      {/* Achievements List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementCard}>
            {/* Row 1: Title + Progress */}
            <View style={styles.row1}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementProgress}>{achievement.progress}</Text>
            </View>

            {/* Row 2: Buttons */}
            <View style={styles.row2}>
              <TouchableOpacity
                style={styles.claimButton}
                onPress={() => handleClaimStones(achievement.stones)}
                activeOpacity={0.9}
              >
                <Text style={styles.claimButtonText}>
                  {achievement.stones} Free Stones
                </Text>
              </TouchableOpacity>

              {achievement.hasReferral && (
                <TouchableOpacity
                  style={styles.referralButton}
                  onPress={handleCopyReferral}
                  activeOpacity={0.9}
                >
                  <Text style={styles.referralButtonText}>Copy Referral Link</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#FF4757',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 18,
  },
  titleCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    alignItems: 'center',
  },
  titleText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitleText: {
    color: '#888',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  achievementCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  achievementProgress: {
    color: '#6C5CE7',
    fontSize: 16,
    fontWeight: '500',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  claimButton: {
    backgroundColor: '#00C853',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    shadowColor: '#00C853',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    marginRight: 12,
  },
  claimButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  referralButton: {
    backgroundColor: '#2D2D3D',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
  },
  referralButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
