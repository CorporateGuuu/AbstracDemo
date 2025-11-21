import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for search results
const friendsData = [
  { id: '1', name: 'Alice Chen', username: '@alicechen', avatar: 'https://i.pravatar.cc/200?img=32', online: true },
  { id: '2', name: 'Bob Rodriguez', username: '@bobgaming', avatar: 'https://i.pravatar.cc/200?img=48', online: false },
  { id: '3', name: 'Carol Thompson', username: '@carolgames', avatar: 'https://i.pravatar.cc/200?img=25', online: true },
  { id: '4', name: 'David Park', username: '@daveplete', avatar: 'https://i.pravatar.cc/200?img=60', online: false },
  { id: '5', name: 'Emma Wilson', username: '@emmawonder', avatar: 'https://i.pravatar.cc/200?img=45', online: true },
];

const challengesData = [
  { id: '1', title: 'Dance Off Challenge', participants: 12, type: 'dare', difficulty: 'medium' },
  { id: '2', title: 'Trivia Master', participants: 8, type: 'dare', difficulty: 'hard' },
  { id: '3', title: 'Food Face Challenge', participants: 6, type: 'truth', difficulty: 'easy' },
  { id: '4', title: 'Karaoke Battle', participants: 15, type: 'dare', difficulty: 'medium' },
  { id: '5', title: 'Truth or Dare Classic', participants: 9, type: 'mixed', difficulty: 'medium' },
];

export default function SearchScreen({ navigation, onBack }) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search effect with 300ms debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query, activeTab);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, activeTab]);

  const performSearch = (searchQuery, tab) => {
    if (!searchQuery.trim()) {
      setResults(tab === 'friends' ? friendsData : challengesData);
      return;
    }

    if (tab === 'friends') {
      const filtered = friendsData.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.username?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      const filtered = challengesData.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const renderFriendItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation?.navigateToFriendProfile?.(parseInt(item.id))}
    >
      <View style={styles.friendInfo}>
        <View style={[styles.avatar, item.online && styles.onlineIndicator]}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendUsername}>{item.username}</Text>
        </View>
      </View>
      {item.online && (
        <View style={styles.onlineDot}>
          <Ionicons name="ellipse" size={8} color="#4CAF50" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderChallengeItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.challengeInfo}>
        <View style={styles.challengeDetails}>
          <Text style={styles.challengeTitle}>{item.title}</Text>
          <View style={styles.challengeMeta}>
            <View style={[styles.badge, getBadgeStyle(item.type)]}>
              <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
            </View>
            <Text style={styles.participants}>{item.participants} players</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'dare': return { backgroundColor: '#FF6B6B' };
      case 'truth': return { backgroundColor: '#4ECDC4' };
      case 'mixed': return { backgroundColor: '#6C5CE7' };
      default: return { backgroundColor: '#666' };
    }
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={64} color="#666" />
      <Text style={styles.emptyText}>No results found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your search</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Search */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#666"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'challenges' && styles.activeTab]}
          onPress={() => setActiveTab('challenges')}
        >
          <Text style={[styles.tabText, activeTab === 'challenges' && styles.activeTabText]}>
            Challenges
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      <FlatList
        style={styles.list}
        data={results}
        renderItem={activeTab === 'friends' ? renderFriendItem : renderChallengeItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={query.length > 0 ? renderEmpty : null}
        showsVerticalScrollIndicator={false}
      />
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A2E',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6C5CE7',
  },
  activeTab: {
    backgroundColor: '#6C5CE7',
  },
  tabText: {
    color: '#6C5CE7',
    fontWeight: '600',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFF',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1A1A2E',
    marginBottom: 8,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  onlineIndicator: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  friendUsername: {
    color: '#666',
    fontSize: 14,
  },
  onlineDot: {
    marginLeft: 8,
  },
  challengeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  challengeDetails: {
    flex: 1,
  },
  challengeTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  challengeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  participants: {
    color: '#666',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#666',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  emptySubtext: {
    color: '#444',
    fontSize: 16,
    marginTop: 8,
  },
});
