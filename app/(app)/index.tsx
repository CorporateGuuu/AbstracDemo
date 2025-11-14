import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');
const AVATAR_SIZE = 60;
const CARD_RADIUS = 12;

export default function Home() {
  const router = useRouter();

  const logout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    router.replace('/(auth)/login');
  };

  const handleAchievements = () => {
    Alert.alert('Achievements', 'Coming soon! Trophy case unlocks at level 5.');
  };

  const handleInviteFriends = () => {
    Alert.alert('Referral Link Copied!', 'Share with friends to earn bonus points!');
  };

  const handleCreateChallenge = () => {
    Alert.alert('Create Challenge', 'Challenge creation feature coming in next update!');
  };

  return (
    <View style={styles.container}>
      {/* Top Header: Profile + Logo + Notification */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=👤' }} // Replace with your profile pic
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/logo.png')} // Your app logo (white arrow from splash)
          style={styles.logo}
        />
        <TouchableOpacity style={styles.notification}>
          <Ionicons name="notifications-outline" size={28} color="#FFFFFF" />
          <Text style={styles.badge}>10</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Buttons */}
      <View style={styles.menuRow}>
        <TouchableOpacity style={styles.menuButton} onPress={handleAchievements}>
          <Ionicons name="trophy-outline" size={20} color="#FFD700" style={styles.menuIcon} />
          <Text style={styles.menuLabel}>Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={handleInviteFriends}>
          <Ionicons name="copy-outline" size={20} color="#4ECDC4" style={styles.menuIcon} />
          <Text style={styles.menuLabel}>Copy Referral Link</Text>
        </TouchableOpacity>
      </View>

      {/* Create New Challenge Card */}
      <TouchableOpacity style={styles.createCard} onPress={handleCreateChallenge}>
        <Ionicons name="add-circle" size={24} color="#007AFF" style={{ marginBottom: 8 }} />
        <Text style={styles.createTitle}>Create New Challenge</Text>
      </TouchableOpacity>

      {/* Friends Section */}
      <View style={styles.friendsSection}>
        <Text style={styles.sectionTitle}>1v1 Your Best Friends</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.friendsScroll}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={styles.friendAvatar}>
              <Image
                source={{
                  uri: `https://via.placeholder.com/${AVATAR_SIZE}x${AVATAR_SIZE}/4ECDC4/FFFFFF?text=F${i + 1}`,
                }} // Replace with real friend avatars
                style={styles.avatar}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Hidden logout button for demo */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F', // Dark navy bg
    paddingTop: 50, // Status bar offset
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  logo: {
    width: 30,
    height: 30,
    // Assume your white arrow logo PNG here
  },
  notification: {
    position: 'relative',
  },
  badge: {
    backgroundColor: '#FF4757', // Red badge
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
    borderWidth: 2,
    borderColor: '#0A0A0F',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  menuButton: {
    backgroundColor: '#1E1E2E', // Gray card
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: CARD_RADIUS,
    minWidth: (width - 60) / 2, // Equal split
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  menuLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  createCard: {
    backgroundColor: '#2D2D3D', // Lighter gray for create card
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#A0A0A0', // Light gray
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  friendsScroll: {
    paddingRight: 20,
  },
  friendAvatar: {
    marginRight: 15,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
