// app/(app)/index.tsx
import React, { useState } from 'react';
import { FeedProvider } from '../../contexts/FeedContext';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChallengeModal from '../../components/ChallengeModal';

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const shareReferral = async () => {
    await Share.share({
      message: 'Join me on the challenge app! myapp://referral/willsamrick',
    });
  };

  return (
    <FeedProvider>
      <View style={styles.container}>
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation?.navigateToProfile?.()}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?img=1' }} style={styles.profilePic} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/logo-white.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* FORCE HIDE stones on home screen only - entire block removed */}
            {/* <TouchableOpacity>
              <View style={styles.stonesBadge}>
                <Ionicons name="time" size={16} color="#B8B8B8" />
                <Text style={styles.stonesCount}>125</Text>
              </View>
            </TouchableOpacity> */}
          </View>

        {/* Menu Buttons */}
        <View style={styles.menuRow}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation?.navigateToAchievements?.()}
          >
            <Ionicons name="trophy-outline" size={20} color="#FFF" />
            <Text style={styles.menuLabel}>Achievements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={shareReferral}>
            <Ionicons name="copy-outline" size={20} color="#FFF" />
            <Text style={styles.menuLabel}>Copy Referral Link</Text>
          </TouchableOpacity>
        </View>

        {/* Create Challenge Card */}
        <TouchableOpacity style={styles.createCard} onPress={() => setModalVisible(true)}>
          <Text style={styles.createTitle}>Create New Challenge</Text>
        </TouchableOpacity>

        {/* Friends */}
        <View style={styles.friendsSection}>
          <Text style={styles.sectionTitle}>1v1 Your Best Friends</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.friendsScroll}>
            {[1, 2, 3, 4].map((i) => (
              <TouchableOpacity key={i} style={styles.friendAvatar} onPress={() => navigation?.navigateToFriendProfile?.(i)}>
                <Image
                  source={{ uri: `https://i.pravatar.cc/150?img=${i + 10}` }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Challenge Modal */}
      <ChallengeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onNavigateToFrames={() => navigation?.navigateToFrames?.()}
      />
      </View>
    </FeedProvider>
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
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 40,
  },
  logoText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  menuButton: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  menuLabel: { color: '#FFF', fontSize: 14, fontWeight: '600', marginTop: 5 },
  createCard: {
    backgroundColor: '#2D2D3D',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  createTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  friendsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: { color: '#A0A0A0', fontSize: 16, fontWeight: '500', marginBottom: 15 },
  friendAvatar: { marginRight: 15 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  stonesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D3D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  stonesCount: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  friendsScroll: { marginLeft: -20, paddingLeft: 20 },
});
