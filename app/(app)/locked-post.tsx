// screens/LockedPostScreen.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LockedPostScreen() {
  const router = useRouter();

  return (
    <View style={{justifyContent:'center', alignItems:'center', padding: 32}}>
      <Ionicons name="lock-closed" size={80} color="#666" />
      <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 24, textAlign:'center'}}>
        Win Your First Dare to Unlock Posting
      </Text>
      <Text style={{textAlign:'center', marginTop: 16, color: '#888'}}>
        Only winners get to flex. Complete a dare and come back.
      </Text>
      <Pressable style={styles.btn} onPress={() => router.push('/search')}>
        <Text style={styles.btnText}>Find a Dare</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
