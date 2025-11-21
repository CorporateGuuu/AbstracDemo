// screens/LockedFeedScreen.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCanPost } from '../../utils/useCanPost';

export default function LockedFeedScreen() {
  const canPost = useCanPost();
  const router = useRouter();

  return (
    <View style={{justifyContent:'center', alignItems:'center', padding: 32}}>
      <Ionicons name="flame" size={100} color="#FF3B30" />
      <Text style={{fontSize: 28, fontWeight: 'bold', marginTop: 32, textAlign:'center'}}>
        The Feed is for Winners Only
      </Text>
      <Text style={{textAlign:'center', marginTop: 16, color: '#888', fontSize: 16}}>
        {canPost
          ? "You've won! Now post your victory to unlock the global feed."
          : "Win your first dare, post it, and join the elite."
        }
      </Text>

      <Pressable
        style={{marginTop: 32, backgroundColor: '#FF3B30', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 30}}
        onPress={() => router.push(canPost ? '/proofs' : '/search')}
      >
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
          {canPost ? "Post Your Win" : "Find a Dare"}
        </Text>
      </Pressable>
    </View>
  );
}
