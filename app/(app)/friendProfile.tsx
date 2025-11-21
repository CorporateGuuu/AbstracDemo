import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock friend data - in a real app, this would come from an API or database
const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 80) / 3; // 3 cols, 20px total side padding (40px per side)

const friendsData = {
  1: {
    id: 1,
    name: 'Alice Chen',
    username: '@alicechen',
    avatar: 'https://i.pravatar.cc/200?img=32',
    level: 15,
    wins: 47,
    losses: 23,
    bio: 'Challenge champion and puzzle master! Always up for a game.',
    stats: {
      challengesWon: 47,
      challengesLost: 23,
      totalChallenges: 70,
      winRate: '67%',
      favoriteGame: 'Mind Games'
    },
    recentAchievements: ['Mind Bender', 'Quick Thinker', 'Streak Master'],
    posts: [
      { id: 1, imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400' },
      { id: 2, imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400' },
      { id: 3, imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
      { id: 4, imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34f19?w=400' },
      { id: 5, imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400' },
      { id: 6, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
      { id: 7, imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' },
      { id: 8, imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400' },
      { id: 9, imageUrl: 'https://images.unsplash.com/photo-1511884642898-4c922225c15c?w=400' },
      { id: 10, imageUrl: 'https://images.unsplash.com/photo-1494500764479-0c8f4544f368?w=400' },
      { id: 11, imageUrl: 'https://images.unsplash.com/photo-1506197061612-5a1d3e6d8b8b?w=400' },
      { id: 12, imageUrl: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125322?w=400' },
      { id: 13, imageUrl: 'https://images.unsplash.com/photo-1506905925346-5002b359c9bc?w=400' },
      { id: 14, imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400' },
      { id: 15, imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' }
    ]
  },
  2: {
    id: 2,
    name: 'Bob Rodriguez',
    username: '@bobgaming',
    avatar: 'https://i.pravatar.cc/200?img=48',
    level: 12,
    wins: 38,
    losses: 19,
    bio: 'Tech enthusiast and gaming pro. Speed runs are my specialty!',
    stats: {
      challengesWon: 38,
      challengesLost: 19,
      totalChallenges: 57,
      winRate: '67%',
      favoriteGame: 'Speed Challenges'
    },
    recentAchievements: ['Speed Demon', 'Tech Savvy', 'Puzzle Solver'],
    posts: [
      { id: 1, imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400' },
      { id: 2, imageUrl: 'https://images.unsplash.com/photo-1502905835126-8b68c9b7c240?w=400' },
      { id: 3, imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400' },
      { id: 4, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
      { id: 5, imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' },
      { id: 6, imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400' },
      { id: 7, imageUrl: 'https://images.unsplash.com/photo-1511884642898-4c922225c15c?w=400' },
      { id: 8, imageUrl: 'https://images.unsplash.com/photo-1494500764479-0c8f4544f368?w=400' },
      { id: 9, imageUrl: 'https://images.unsplash.com/photo-1506197061612-5a1d3e6d8b8b?w=400' },
      { id: 10, imageUrl: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125322?w=400' },
      { id: 11, imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34f19?w=400' },
      { id: 12, imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
      { id: 13, imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400' },
      { id: 14, imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400' },
      { id: 15, imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400' }
    ]
  },
  3: {
    id: 3,
    name: 'Carol Thompson',
    username: '@carolgames',
    avatar: 'https://i.pravatar.cc/200?img=25',
    level: 18,
    wins: 62,
    losses: 28,
    bio: 'Strategy master and trivia queen. Knowledge is power!',
    stats: {
      challengesWon: 62,
      challengesLost: 28,
      totalChallenges: 90,
      winRate: '69%',
      favoriteGame: 'Trivia Battles'
    },
    recentAchievements: ['Trivia Queen', 'Strategy Master', 'Knowledge Vault'],
    posts: [
      { id: 1, imageUrl: 'https://images.unsplash.com/photo-1506905925346-5002b359c9bc?w=400' },
      { id: 2, imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400' },
      { id: 3, imageUrl: 'https://images.unsplash.com/photo-1511884642898-4c922225c15c?w=400' },
      { id: 4, imageUrl: 'https://images.unsplash.com/photo-1494500764479-0c8f4544f368?w=400' },
      { id: 5, imageUrl: 'https://images.unsplash.com/photo-1506197061612-5a1d3e6d8b8b?w=400' },
      { id: 6, imageUrl: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125322?w=400' },
      { id: 7, imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34f19?w=400' },
      { id: 8, imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
      { id: 9, imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400' },
      { id: 10, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
      { id: 11, imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' },
      { id: 12, imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400' },
      { id: 13, imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400' },
      { id: 14, imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400' },
      { id: 15, imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' }
    ]
  },
  4: {
    id: 4,
    name: 'David Park',
    username: '@daveplete',
    avatar: 'https://i.pravatar.cc/200?img=60',
    level: 9,
    wins: 24,
    losses: 18,
    bio: 'New to the scene but learning fast! Open to any challenge.',
    stats: {
      challengesWon: 24,
      challengesLost: 18,
      totalChallenges: 42,
      winRate: '57%',
      favoriteGame: 'Mixed Challenges'
    },
    recentAchievements: ['Rookie Champion', 'Quick Learner', 'Team Player'],
    posts: [
      { id: 1, imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400' },
      { id: 2, imageUrl: 'https://images.unsplash.com/photo-1502905835126-8b68c9b7c240?w=400' },
      { id: 3, imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400' },
      { id: 4, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
      { id: 5, imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400' },
      { id: 6, imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400' },
      { id: 7, imageUrl: 'https://images.unsplash.com/photo-1511884642898-4c922225c15c?w=400' },
      { id: 8, imageUrl: 'https://images.unsplash.com/photo-1494500764479-0c8f4544f368?w=400' },
      { id: 9, imageUrl: 'https://images.unsplash.com/photo-1506197061612-5a1d3e6d8b8b?w=400' },
      { id: 10, imageUrl: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125322?w=400' },
      { id: 11, imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34f19?w=400' },
      { id: 12, imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
      { id: 13, imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400' },
      { id: 14, imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400' },
      { id: 15, imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400' }
    ]
  },
};

export default function FriendProfile({ friendId, onBack, navigation }) {
  const friend = friendsData[friendId];

  if (!friend) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Friend not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Image source={{ uri: friend.avatar }} style={styles.profilePic} />
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Name and Level */}
      <View style={styles.nameSection}>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.username}>{friend.username}</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Level {friend.level}</Text>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.bioSection}>
        <Text style={styles.bio}>{friend.bio}</Text>
      </View>

      {/* Challenge Button */}
      <TouchableOpacity style={styles.challengeButton}>
        <Text style={styles.challengeButtonText}>Challenge {friend.name.split(' ')[0]}</Text>
        <Ionicons name="game-controller" size={16} color="#FFF" style={{ marginLeft: 8 }} />
      </TouchableOpacity>

      {/* Stats - Match Main Profile Layout */}
      <View style={styles.card}>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{friend.stats.winRate}</Text>
            <Text style={styles.statLabel}>win rate</Text>
          </View>
          <Image
            source={{ uri: friend.avatar }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.stat} onPress={() => navigation?.navigateToSearch?.()}>
            <Text style={styles.statValue}>{Math.floor(Math.random() * 200) + 50}</Text>
            <Text style={styles.statLabel}>friends</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Challenge Champion</Text>
        </View>
      </View>

      {/* Recent Achievements */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        <View style={styles.achievementList}>
          {friend.recentAchievements.map((achievement, index) => (
            <View key={index} style={styles.achievementBadge}>
              <Text style={styles.achievementText}>{achievement}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Posts Grid */}
      {friend.posts && friend.posts.length > 0 && (
        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <FlatList
            data={friend.posts}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            )}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={styles.row}
          />
        </View>
      )}
    </ScrollView>
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
  backButton: {
    padding: 8,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#6C5CE7',
  },
  nameSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  name: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  username: {
    color: '#A0A0A0',
    fontSize: 16,
    marginBottom: 12,
  },
  levelBadge: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bioSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  bio: {
    color: '#CCC',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  challengeButton: {
    backgroundColor: '#00C853',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    shadowColor: '#00C853',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  challengeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    marginBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stat: { alignItems: 'center' },
  statValue: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  statLabel: { color: '#A0A0A0', fontSize: 14 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  badge: {
    backgroundColor: '#2D2D3D',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 16,
  },
  badgeText: { color: '#FFF', fontWeight: '600' },
  achievementsSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  achievementList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementBadge: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6C5CE7',
  },
  achievementText: {
    color: '#CCC',
    fontSize: 14,
    fontWeight: '500',
  },
  postsSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  postImage: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 16,
  },
  grid: { paddingTop: 16 },
  row: { justifyContent: 'space-between', marginBottom: 8 },
  error: {
    color: '#FF4757',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});
