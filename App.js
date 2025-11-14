import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const navigateToAuth = () => {
    setCurrentScreen('auth');
  };

  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  const navigateToSplash = () => {
    setCurrentScreen('splash');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onNavigateToAuth={navigateToAuth} />;
      case 'auth':
        return <AuthScreen onLoginSuccess={navigateToHome} />;
      case 'home':
        return <HomeScreen onLogout={navigateToSplash} />;
      default:
        return <SplashScreen onNavigateToAuth={navigateToAuth} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
