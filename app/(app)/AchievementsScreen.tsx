import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

export default function AchievementsScreen({ navigation, onBack }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
            style={styles.profilePic}
          />
          <View style={styles.logo} />
          <View style={styles.notification}>
            <Ionicons name="time" size={16} color="#B8B8B8" />
            <Text style={styles.badge}>10</Text>
          </View>
        </View>

        {/* Back Arrow and Filter (outside title card) */}
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Title Card */}
        <View style={styles.titleCard}>
          <Text style={styles.title}>Achievements</Text>
          <Text style={styles.complete}>0 complete</Text>
        </View>

        {/* Achievement Cards */}
        {achievements.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.progress}>{item.progress}</Text>
            </View>
            <View style={styles.row}>
              <LinearGradient
                colors={['#00C853', '#00E676']}
                style={styles.rewardButton}
              >
                <Text style={styles.rewardText}>{item.reward}</Text>
              </LinearGradient>
              {item.hasCopy && (
                <TouchableOpacity style={styles.copyButton}>
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
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  logo: {
    width: 30,
    height: 30,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  notification: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D3D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badge: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCard: {
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  complete: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
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
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progress: {
    color: '#4FC3F7',
    fontSize: 16,
    fontWeight: '600',
  },
  rewardButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#00C853',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  rewardText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  copyButton: {
    backgroundColor: '#2D2D3D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  copyText: {
    color: '#AAA',
    fontSize: 14,
  },
});
