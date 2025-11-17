// components/DareCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { SvgXml } from 'react-native-svg'; // For SVG frames

interface Props {
  frameId: string | null;
}

const frameAssets = {
  '1': '<svg width="300" height="200"><rect width="300" height="200" fill="none" stroke="#FFD700" strokeWidth="6"/><rect width="280" height="180" fill="none" stroke="#FFD700" strokeWidth="3" x="10" y="10"/></svg>', // Gold Frame
  '2': '<svg width="300" height="200"><rect width="300" height="200" fill="none" stroke="#FF4500" strokeWidth="8"/><rect width="294" height="194" fill="none" stroke="#FF4500" strokeWidth="2" x="3" y="3"/></svg>', // Fire Border
  '3': '<svg width="300" height="200"><rect width="300" height="200" fill="none" stroke="#00BFFF" strokeWidth="4"/><circle cx="150" cy="100" r="60" fill="none" stroke="#00BFFF" strokeWidth="2"/><circle cx="150" cy="100" r="40" fill="none" stroke="#00BFFF" strokeWidth="2"/></svg>', // Neon Glow
  '4': '<svg width="300" height="200"><polygon points="150,10 290,100 150,190 10,100" fill="none" stroke="#00D4FF" strokeWidth="6"/><polygon points="150,30 250,100 150,170 50,100" fill="none" stroke="#00D4FF" strokeWidth="3"/></svg>', // Diamond Edge
};

export default function DareCard({ frameId }: Props) {
  const content = (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Dare: Eat a Ghost Pepper</Text>
      <Text style={styles.cardDesc}>Challenge your friends!</Text>
    </View>
  );

  if (!frameId) return content;

  const frameSvg = frameAssets[frameId];
  return (
    <View style={styles.frameContainer}>
      <SvgXml xml={frameSvg} style={StyleSheet.absoluteFill} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  frameContainer: { width: 300, height: 200, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: 280,
    height: 180,
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cardTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  cardDesc: { color: '#888', fontSize: 14, marginTop: 8 },
});
