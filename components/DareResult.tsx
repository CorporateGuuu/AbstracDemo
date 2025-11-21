import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DareResultProps {
  dare: {
    id: string;
    title: string;
    description?: string;
    participants?: number;
  };
}

export default function DareResult({ dare }: DareResultProps) {
  return (
    <Pressable style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#ff6b6b', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
          <Ionicons name="flame" size={20} color="white" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{dare.title}</Text>
          {dare.description && (
            <Text style={{ color: '#666', marginTop: 4 }}>{dare.description}</Text>
          )}
          {dare.participants && (
            <Text style={{ color: '#666', fontSize: 12, marginTop: 2 }}>
              {dare.participants} participants
            </Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </View>
    </Pressable>
  );
}
