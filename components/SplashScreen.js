import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function SplashScreen({ onNavigateToAuth }) {
  useEffect(() => {
    // Simulate loading time (2 seconds) then navigate to auth
    const timer = setTimeout(() => {
      onNavigateToAuth();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onNavigateToAuth]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <ActivityIndicator size="large" color="#000" style={styles.loader} />
      <Text style={styles.subtitle}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loader: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
