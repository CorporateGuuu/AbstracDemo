import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VISIBILITY_OPTIONS = [
  { label: "Public",   icon: "globe",       value: "public" },
  { label: "Friends",  icon: "people",      value: "friends" },
  { label: "Private",  icon: "lock-closed", value: "private" },
];

interface VisibilityPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function VisibilityPicker({ value, onChange }: VisibilityPickerProps) {
  return (
    <View style={{flexDirection: 'row', gap: 16, padding: 16}}>
      {VISIBILITY_OPTIONS.map(opt => (
        <Pressable
          key={opt.value}
          onPress={() => onChange(opt.value)}
          style={{
            alignItems: 'center',
            opacity: value === opt.value ? 1 : 0.5,
          }}
        >
          <Ionicons
            name={opt.icon as keyof typeof Ionicons.glyphMap}
            size={28}
            color={value === opt.value ? "#6C5CE7" : "#888"}
          />
          <Text style={{marginTop: 6, fontWeight: value === opt.value ? 'bold' : 'normal'}}>
            {opt.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
