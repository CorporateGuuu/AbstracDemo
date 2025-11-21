// app/(app)/profile.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebase';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 80) / 3; // 3 cols, 20px total side padding (40px per side)

const mockPosts = [
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
  { id: 13, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  { id: 14, imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400' },
  { id: 15, imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400' },
];

export default function ProfileScreen({ navigation }) {
  const [winRate, setWinRate] = useState(57.4);
  const [friends, setFriends] = useState(81);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setWinRate(50 + Math.random() * 15);
      setFriends(81 + Math.floor(Math.random() * 6));
      setRefreshing(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="search" size={24} color="#FFF" />
        <Text style={styles.username}>willsamrick</Text>
        <Ionicons name="ellipsis-horizontal" size={24} color="#FFF" />
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{winRate.toFixed(1)}%</Text>
            <Text style={styles.statLabel}>win rate</Text>
          </View>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.stat} onPress={() => navigation?.navigateToSearch?.()}>
            <Text style={styles.statValue}>{friends}</Text>
            <Text style={styles.statLabel}>friends</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Light the beam</Text>
        </View>
        {/* Visibility Badge */}
        <View style={styles.visibilityBadge}>
          <Ionicons name="globe" size={16} color="#888" />
          <Text style={styles.visibilityText}>Public profile</Text>
        </View>
      </View>

      {/* Posts Grid */}
      <View style={styles.grid}>
        {mockPosts.map((post) => (
          <Image
            key={post.id}
            source={{ uri: post.imageUrl }}
            style={styles.postImage}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F', paddingTop: 50 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  username: { color: '#FFF', fontSize: 18, fontWeight: 'bold', fontFamily: 'System' },
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
  visibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
  visibilityText: { color: '#888', marginLeft: 6, fontSize: 14 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  postImage: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 16,
    marginBottom: 8,
  },
});
