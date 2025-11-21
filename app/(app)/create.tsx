import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CreateScreen({ navigation }) {
  const quickChallenges = [
    {
      title: 'Ice Bath Challenge',
      description: '15 minutes in freezing water',
      difficulty: 'Hard',
      points: 100,
      participants: 'Both'
    },
    {
      title: 'Truth or Dare',
      description: 'Classic party game with consequences',
      difficulty: 'Medium',
      points: 75,
      participants: 'Multiple'
    },
    {
      title: 'Extreme Sports',
      description: 'Base jumping or wingsuit flying',
      difficulty: 'Extreme',
      points: 200,
      participants: 'Individual'
    },
    {
      title: 'Food Challenge',
      description: 'Eat the spiciest foods available',
      difficulty: 'Hard',
      points: 90,
      participants: 'Individual'
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Challenge</Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Choose challenge type</Text>

      {/* Custom Challenge Button */}
      <TouchableOpacity style={styles.customButton}>
        <Ionicons name="create-outline" size={32} color="#6C5CE7" />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.customTitle}>Create Custom Challenge</Text>
          <Text style={styles.customDesc}>Design your own unique dare</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#6C5CE7" />
      </TouchableOpacity>

      {/* Quick Challenges */}
      <Text style={styles.sectionHeader}>Quick Challenges</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {quickChallenges.map((challenge, index) => (
          <TouchableOpacity key={index} style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <View style={[styles.difficultyBadge,
                { backgroundColor: challenge.difficulty === 'Extreme' ? '#FF4757' :
                                   challenge.difficulty === 'Hard' ? '#FFA502' : '#2ECC71' }]}>
                <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
              </View>
            </View>

            <Text style={styles.challengeDesc}>{challenge.description}</Text>

            <View style={styles.challengeFooter}>
              <View style={styles.pointsContainer}>
                <Ionicons name="trophy" size={16} color="#FFD700" />
                <Text style={styles.pointsText}>{challenge.points} pts</Text>
              </View>
              <Text style={styles.participantsText}>{challenge.participants}</Text>
            </View>
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
  subtitle: { color: '#888', fontSize: 16, textAlign: 'center', marginBottom: 30 },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
  },
  customTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  customDesc: { color: '#888', fontSize: 14, marginTop: 4 },
  sectionHeader: { color: '#FFF', fontSize: 18, fontWeight: '600', marginHorizontal: 20, marginBottom: 16 },
  challengeCard: {
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  challengeTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  challengeDesc: { color: '#CCC', fontSize: 14, lineHeight: 20, marginBottom: 12 },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pointsText: { color: '#FFD700', fontSize: 14, fontWeight: 'bold' },
  participantsText: { color: '#888', fontSize: 12 },
});
