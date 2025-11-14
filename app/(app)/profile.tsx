import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = (width - 64) / 3; // 3 columns with padding

const mockPosts = [
  { id: 1, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=focalpoint&auto=format' },
  { id: 2, imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150ad67d42e?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=focalpoint&auto=format' },
  { id: 3, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=focalpoint&auto=format' },
  { id: 4, imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150ad67d42e?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=focalpoint&auto=format' },
  { id: 5, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=focalpoint&auto=format' },
  { id: 6, imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150ad67d42e?ixlib=rb-4.0.3&w=400&h=400&fit=crop&crop=focalpoint&auto=format' },
];

const ProfileScreen = () => {
  const renderPost = ({ item }: { item: { id: number; imageUrl: string } }) => (
    <Image
      source={{ uri: item.imageUrl }}
      style={styles.postImage}
    />
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.username}>willsamrick</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.statsRow}>
          <View style={styles.statColumn}>
            <Text style={styles.statNumber}>57.4%</Text>
            <Text style={styles.statLabel}>win rate</Text>
          </View>

          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/80x80/667eea/FFFFFF?text=👤' }}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.statColumn}>
            <Text style={styles.statNumber}>81</Text>
            <Text style={styles.statLabel}>friends</Text>
          </View>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Light the beam</Text>
        </View>
      </View>

      {/* Posts Grid */}
      <FlatList
        data={mockPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
  },
  profileCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 24,
    padding: 20,
    margin: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 4,
  },
  profileImageContainer: {
    flex: 0,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#2D2D3D',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  postsContainer: {
    paddingHorizontal: 20,
  },
  postImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 16,
    margin: 4,
  },
});

export default ProfileScreen;
