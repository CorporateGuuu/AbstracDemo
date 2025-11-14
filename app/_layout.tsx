import { Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Asset } from 'expo-asset';
import * as SecureStore from 'expo-secure-store';

// Prevent native splash from hiding too early
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    async function prepare() {
      try {
        // 1. Preload logo
        await Asset.loadAsync(require('../assets/logo.png'));

        // 2. Check auth token
        const token = await SecureStore.getItemAsync('authToken');

        // 3. Start animation
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
        ]).start();

        // Add pulsing effect
        setTimeout(() => {
          Animated.loop(
            Animated.sequence([
              Animated.timing(scaleAnim, { toValue: 1.1, duration: 800, useNativeDriver: true }),
              Animated.timing(scaleAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            ])
          ).start();
        }, 800);

        // 4. Wait for animation + minimum 2 sec splash
        await Promise.all([
          new Promise(r => setTimeout(r, 2000)),
          new Promise(r => fadeAnim.addListener(({ value }) => value > 0.9 && r())),
        ]);

      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // Show animated splash until ready
  if (!isReady) {
    return (
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
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
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </LinearGradient>
    );
  }

  // After splash: normal routing
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
});
