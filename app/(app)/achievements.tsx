// app/(app)/achievements.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const achievements = [
  { title: 'Win a Challenge', progress: '0/1', reward: '5 Free Stones' },
  { title: 'Lose a Challenge', progress: '0/1', reward: '5 Free Stones' },
  {
    title: 'Refer 3 friends',
    progress: '0/3',
    reward: '20 Free Stones',
    hasCopy: true,
  },
  {
    title: 'Activate 5 Dare Challenges',
    progress: '0/5',
    reward: '10 Free Stones',
  },
];

export default function AchievementsScreen() {
  const router = useRouter();

  const copyReferral = async () => {
    await Share.share({
      message: 'Join me! Use my link: myapp://referral/willsamrick',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>

        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
          style={styles.profilePic}
        />

        <View style={styles.logo} />

        <View style={styles.notification}>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
          <Text style={styles.badge}>10</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Title Card */}
      <View style={styles.titleCard}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.complete}>0 complete</Text>
      </View>

      {/* Achievements List */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {achievements.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.progress}>{item.progress}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.rewardButton}>
                <Text style={styles.rewardText}>{item.reward}</Text>
              </View>
              {item.hasCopy && (
                <TouchableOpacity style={styles.copyButton} onPress={copyReferral}>
                  <Text style={styles.copyText}>Copy Referral Link</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F', paddingTop: 50 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  logo: { width: 30, height: 30 },
  notification: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#FF4757',
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    width: 18,
    height: 18,
    borderRadius: 9,
    textAlign: 'center',
    lineHeight: 18,
  },
  titleCard: {
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  complete: { color: '#888', fontSize: 14, marginTop: 4 },
  scroll: { flex: 1 },
  card: {
    backgroundColor: '#1E1E2E',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  progress: { color: '#6C5CE7', fontSize: 16, fontWeight: '600' },
  rewardButton: {
    backgroundColor: '#00C853',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#00C853',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  rewardText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  copyButton: {
    backgroundColor: '#2D2D3D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  copyText: { color: '#AAA', fontSize: 14 },
});

</content>
