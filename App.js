import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ChallengeModal from './components/ChallengeModal';
import Home from './app/(app)/index';
import Profile from './app/(app)/profile';
import FriendProfile from './app/(app)/friendProfile';
import SearchScreen from './app/(app)/search';
import AchievementsScreen from './app/(app)/achievements';
import Frames from './app/(app)/frames';
import Proofs from './app/(app)/proofs';
import Create from './app/(app)/create';
import Payouts from './app/(app)/payouts';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.3))[0];

  useEffect(() => {
    // Splash screen simulation
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => setIsReady(true), 1500); // Show splash for 1.5s
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const navigationProps = {
    navigateToAchievements: () => setCurrentScreen('achievements'),
    navigateToProfile: () => setCurrentScreen('profile'),
    navigateToSearch: () => setCurrentScreen('search'),
    navigateToFrames: () => setCurrentScreen('frames'),
    navigateToFriendProfile: (friendId) => {
      setSelectedFriend(friendId);
      setCurrentScreen('friendProfile');
    },
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'proofs':
        return (
          <Proofs
            navigation={navigationProps}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'frames':
        return (
          <Frames
            navigation={navigationProps}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'create':
        return (
          <Create
            navigation={navigationProps}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'payouts':
        return (
          <Payouts
            navigation={navigationProps}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'home':
        return <Home navigation={navigationProps} />;
      case 'profile':
        return <Profile />;
      case 'friendProfile':
        return (
          <FriendProfile
            friendId={selectedFriend}
            onBack={() => setCurrentScreen('home')}
            navigation={navigationProps}
          />
        );
      case 'search':
        return (
          <SearchScreen
            navigation={navigationProps}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'achievements':
        return (
          <AchievementsScreen
            navigation={navigationProps}
            onBack={() => setCurrentScreen('home')}
          />
        );
      default:
        return <Home navigation={navigationProps} />;
    }
  };

  // Show splash screen
  if (!isReady) {
    return (
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={require('./assets/logo-white.png')}
            style={styles.splashLogoImage}
            resizeMode="contain"
          />
        </Animated.View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navButton, currentScreen === 'proofs' && styles.activeNav]}
          onPress={() => setCurrentScreen('proofs')}
        >
          <Ionicons name="image-outline" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentScreen === 'frames' && styles.activeNav]}
          onPress={() => setCurrentScreen('frames')}
        >
          <Ionicons name="aperture" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentScreen === 'create' && styles.activeNav]}
          onPress={() => setCurrentScreen('create')}
        >
          <Ionicons name="add" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentScreen === 'payouts' && styles.activeNav]}
          onPress={() => setCurrentScreen('payouts')}
        >
          <Ionicons name="cash" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentScreen === 'profile' && styles.activeNav]}
          onPress={() => setCurrentScreen('profile')}
        >
          <Ionicons name="person" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Challenge Modal */}
      <ChallengeModal
        visible={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        onNavigateToFrames={() => setCurrentScreen('frames')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F'
  },
  content: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogoImage: {
    width: 150,
    height: 60,
  },
  logoText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
    paddingBottom: 20, // Safe area for iOS bottom
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNav: {
    backgroundColor: '#6C5CE7',
  },
  navText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
