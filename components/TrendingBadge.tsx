import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TrendingBadge({ score }: { score: number }) {
  if (score < 50) return null;

  const intensity = score > 200 ? "high" : score > 100 ? "medium" : "low";

  return (
    <View style={{
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: intensity === "high" ? '#FF3B30' : intensity === "medium" ? '#FF9500' : '#FFD60A',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      zIndex: 10,
    }}>
      <Ionicons
        name="flame"
        size={14}
        color="white"
      />
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
        {intensity === "high" ? "ON FIRE" : intensity === "medium" ? "HOT" : "TRENDING"}
      </Text>
    </View>
  );
}
