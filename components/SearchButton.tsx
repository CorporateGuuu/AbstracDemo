// components/SearchButton.tsx
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

export default function SearchButton() {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync();
        router.push('/search');
      }}
      style={({ pressed }) => [
        {
          padding: 8,
          borderRadius: 20,
          backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'transparent',
        },
      ]}
    >
      <Ionicons name="search" size={24} color="#000" />
    </Pressable>
  );
}
