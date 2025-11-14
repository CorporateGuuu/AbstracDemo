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
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');
const AVATAR_SIZE = 60;
const CARD_RADIUS = 18;

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
    <LinearGradient
      colors={['#f093fb', '#f5576c', '#4facfe']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Header: Profile + Logo + Notification */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/profile')}
          >
            <Image
              source={{ uri: 'https://via.placeholder.com/50x50/667eea/FFFFFF?text=👤' }}
              style={styles.profilePic}
            />
          </TouchableOpacity>
          <LinearGradient
            colors={['#ffecd2', '#fcb69f']}
            style={styles.logoContainer}
          >
            <Ionicons name="arrow-forward" size={32} color="#333" />
          </LinearGradient>
          <TouchableOpacity style={styles.notification} activeOpacity={0.8}>
            <LinearGradient
              colors={['#ffecd2', '#fcb69f']}
              style={styles.notificationGradient}
            >
              <Ionicons name="notifications-outline" size={28} color="#333" />
              <View style={styles.badgeContainer}>
                <LinearGradient
                  colors={['#ff6b6b', '#ffa500']}
                  style={styles.badge}
                >
                  <Text style={styles.badgeText}>10</Text>
                </LinearGradient>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Menu Buttons */}
        <View style={styles.menuRow}>
          <TouchableOpacity style={styles.menuButton} onPress={handleAchievements} activeOpacity={0.8}>
            <LinearGradient
              colors={['#ffd700', '#ffed4e']}
              style={styles.menuButtonGradient}
            >
              <Ionicons name="trophy-outline" size={24} color="#fff" style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Achievements</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={handleInviteFriends} activeOpacity={0.8}>
            <LinearGradient
              colors={['#45b7e6', '#7fc8f8']}
              style={styles.menuButtonGradient}
            >
              <Ionicons name="copy-outline" size={24} color="#fff" style={styles.menuIcon} />
              <Text style={styles.menuLabel}>Copy Referral Link</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Create New Challenge Card */}
        <TouchableOpacity style={styles.createCard} onPress={handleCreateChallenge} activeOpacity={0.8}>
          <LinearGradient
            colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)']}
            style={styles.createCardGradient}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.createIconContainer}
            >
              <Ionicons name="add-circle" size={28} color="#fff" />
            </LinearGradient>
            <Text style={styles.createTitle}>Create New Challenge</Text>
          </LinearGradient>
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
              <LinearGradient
                key={i}
                colors={['#ffecd2', '#fcb69f']}
                style={styles.friendAvatar}
              >
                <Image
                  source={{
                    uri: `https://via.placeholder.com/${AVATAR_SIZE}x${AVATAR_SIZE}/45b7e6/FFFFFF?text=F${i + 1}`,
                  }}
                  style={styles.avatar}
                />
              </LinearGradient>
            ))}
          </ScrollView>
        </View>

        {/* Hidden logout button for demo */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8}>
          <LinearGradient
            colors={['#ff6b6b', '#ffa500']}
            style={styles.logoutButtonGradient}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 44,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 24,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  notification: {
    position: 'relative',
  },
  notificationGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 24,
    marginBottom: 32,
  },
  menuButton: {
    borderRadius: CARD_RADIUS,
    minWidth: (width - 72) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  menuButtonGradient: {
    borderRadius: CARD_RADIUS,
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  menuLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  createCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
  },
  createCardGradient: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  createTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  friendsSection: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  friendsScroll: {
    paddingRight: 24,
  },
  friendAvatar: {
    marginRight: 16,
    borderRadius: AVATAR_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  logoutButtonGradient: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
