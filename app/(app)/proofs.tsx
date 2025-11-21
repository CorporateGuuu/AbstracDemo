import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock proof submissions - in a real app, this would come from Firebase
const proofSubmissions = [
  {
    id: '1',
    challengeTitle: 'Ice Bath Challenge',
    submittedBy: 'Alice Chen',
    timestamp: '2h ago',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-5002b359c9bc?w=400',
    description: 'Did it! The water was FREEZING 🥶',
    votes: 24,
    approved: true,
  },
  {
    id: '2',
    challengeTitle: 'Killer bee stings',
    submittedBy: 'You',
    timestamp: '4h ago',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    description: 'The bees were intense! Did not expect that 😰',
    votes: 18,
    approved: false,
  },
  {
    id: '3',
    challengeTitle: 'Eat 20 hot peppers',
    submittedBy: 'Bob Rodriguez',
    timestamp: '6h ago',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
    description: 'Fire in my mouth! 🔥 Won 50 points though!',
    votes: 32,
    approved: true,
  },
  {
    id: '4',
    challengeTitle: 'Truth or Dare Classic',
    submittedBy: 'Carol Thompson',
    timestamp: '1d ago',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
    description: 'Told the truth about my biggest secret! 🙊',
    votes: 15,
    approved: true,
  },
  {
    id: '5',
    challengeTitle: 'Run 5K in under 20 min',
    submittedBy: 'David Park',
    timestamp: '2d ago',
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400',
    description: 'Made it in 18:45! PR achieved! 🏃‍♂️',
    votes: 28,
    approved: true,
  },
  {
    id: '6',
    challengeTitle: 'Food Face Challenge',
    submittedBy: 'You',
    timestamp: '3d ago',
    imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400',
    description: 'Pie in my face! What a mess... but fun! 🥧',
    votes: 22,
    approved: true,
  },
];

export default function ProofsScreen({ navigation }) {
  const [filter, setFilter] = useState<'all' | 'mine' | 'approved'>('all');

  const getFilteredProofs = () => {
    switch (filter) {
      case 'mine':
        return proofSubmissions.filter(proof => proof.submittedBy === 'You');
      case 'approved':
        return proofSubmissions.filter(proof => proof.approved);
      default:
        return proofSubmissions;
    }
  };

  const renderProof = (proof: any) => (
    <TouchableOpacity key={proof.id} style={styles.proofCard}>
      <View style={styles.proofHeader}>
        <Text style={styles.challengeTitle}>{proof.challengeTitle}</Text>
        <View style={styles.proofMeta}>
          <Text style={styles.submittedBy}>{proof.submittedBy}</Text>
          <Text style={styles.timestamp}>{proof.timestamp}</Text>
        </View>
      </View>

      <Image source={{ uri: proof.imageUrl }} style={styles.proofImage} />

      <Text style={styles.proofDescription}>{proof.description}</Text>

      <View style={styles.proofFooter}>
        <View style={[styles.statusBadge, { backgroundColor: proof.approved ? '#00C853' : '#FF8C00' }]}>
          <Ionicons
            name={proof.approved ? 'checkmark' : 'time'}
            size={14}
            color="#FFF"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.statusText}>{proof.approved ? 'Approved' : 'Pending'}</Text>
        </View>

        <View style={styles.votesContainer}>
          <Ionicons name="heart" size={16} color="#FF6B6B" />
          <Text style={styles.votesCount}>{proof.votes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Challenge Proofs</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {(['all', 'mine', 'approved'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, filter === tab && styles.activeTab]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.tabText, filter === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Proofs List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.proofsContainer}>
        {getFilteredProofs().map(renderProof)}
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
  filterTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#2D2D3D',
    marginHorizontal: 4,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#6C5CE7'
  },
  tabText: {
    color: '#888',
    fontWeight: '600'
  },
  activeTabText: {
    color: '#FFF'
  },
  proofsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  proofCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  proofHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  challengeTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  proofMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submittedBy: {
    color: '#6C5CE7',
    fontSize: 14,
    fontWeight: '600',
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
  proofImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  proofDescription: {
    color: '#CCC',
    fontSize: 14,
    padding: 16,
    paddingBottom: 8,
    lineHeight: 20,
  },
  proofFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  votesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  votesCount: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
