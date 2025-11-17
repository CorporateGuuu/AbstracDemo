import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import DareCard from '../../components/DareCard';

const frames = [
  { id: '1', name: 'Gold Frame', price: 50, iconColor: '#FFD700', owned: true },
  { id: '2', name: 'Fire Border', price: 100, iconColor: '#FF4500', owned: false },
  { id: '3', name: 'Neon Glow', price: 150, iconColor: '#00BFFF', owned: false },
  { id: '4', name: 'Diamond Edge', price: 200, iconColor: '#00D4FF', owned: false },
];

export default function FramesStore({ navigation }) {
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  // Load initially selected frame
  React.useEffect(() => {
    const loadSelectedFrame = async () => {
      try {
        const frame = await AsyncStorage.getItem('selectedFrame');
        if (frame) {
          setSelectedFrame(frame);
        }
      } catch (error) {
        console.error('Error loading selected frame:', error);
      }
    };
    loadSelectedFrame();
  }, []);

  const purchaseFrame = async (frame: any) => {
    if (frame.owned) {
      setSelectedFrame(frame.id);
      // Save globally for ChallengeModal access
      try {
        await AsyncStorage.setItem('selectedFrame', frame.id);
      } catch (error) {
        console.error('Error saving frame:', error);
      }
      Alert.alert('Applied!', `${frame.name} applied to your Dare Cards.`);
    } else {
      Alert.alert('Purchase', `Buy ${frame.name} for ${frame.price} Stones?`, [
        { text: 'Cancel' },
        { text: 'Buy', onPress: async () => {
          // Mark as owned and save globally
          try {
            await AsyncStorage.setItem('selectedFrame', frame.id);
            setSelectedFrame(frame.id);
          } catch (error) {
            console.error('Error purchasing frame:', error);
          }
          Alert.alert('Success', 'Frame purchased and applied!');
        }},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Frames Store</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Customize your Dare Cards</Text>

      {/* Preview */}
      <View style={styles.preview}>
        <DareCard frameId={selectedFrame} />
      </View>

      {/* Frames List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {frames.map((frame) => (
          <TouchableOpacity
            key={frame.id}
            style={styles.frameItem}
            onPress={() => purchaseFrame(frame)}
          >
            <View style={[styles.frameIcon, { backgroundColor: frame.iconColor }]}></View>
            <View style={styles.frameInfo}>
              <Text style={styles.frameName}>{frame.name}</Text>
              <Text style={styles.framePrice}>
                {frame.owned ? 'Owned' : `${frame.price} Stones`}
              </Text>
            </View>
            <Ionicons
              name={frame.owned ? 'checkmark-circle' : 'add-circle-outline'}
              size={24}
              color={frame.owned ? '#00C853' : '#6C5CE7'}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#888', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  preview: {
    alignItems: 'center',
    marginBottom: 24,
  },
  frameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
  },
  frameIcon: { width: 48, height: 48, marginRight: 16 },
  frameInfo: { flex: 1 },
  frameName: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  framePrice: { color: '#888', fontSize: 14 },
});
