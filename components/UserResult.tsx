import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserResultProps {
  user: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
  };
}

export default function UserResult({ user }: UserResultProps) {
  return (
    <Pressable style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#ccc', marginRight: 12 }}>
          {user.avatar && (
            <View style={{ width: 40, height: 40, borderRadius: 20 }}>
              {/* Replace with Image component if needed */}
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{user.displayName || user.username}</Text>
          <Text style={{ color: '#666' }}>@{user.username}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </View>
    </Pressable>
  );
}
