import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase/config';

// Mock data (will be replaced with Firebase when configured)
const friendsData = [
  { id: '1', name: 'Alex Chen', username: '@alex', avatar: 'https://i.pravatar.cc/150?img=1', type: 'friend' },
  { id: '2', name: 'Sam Rivera', username: '@samr', avatar: 'https://i.pravatar.cc/150?img=2', type: 'friend' },
  { id: '3', name: 'Carol Thompson', username: '@carolgames', avatar: 'https://i.pravatar.cc/150?img=25', type: 'friend' },
  { id: '4', name: 'David Park', username: '@daveplete', avatar: 'https://i.pravatar.cc/150?img=60', type: 'friend' },
  { id: '5', name: 'Emma Wilson', username: '@emmawonder', avatar: 'https://i.pravatar.cc/150?img=45', type: 'friend' },
];

const challengesData = [
  { id: '1', title: 'Ice Bath Challenge', type: 'Dare', participants: 12, category: 'challenge' },
  { id: '2', title: 'Run 5K', type: 'Fitness', participants: 8, category: 'challenge' },
  { id: '3', title: 'Food Face Challenge', type: 'Truth', participants: 6, category: 'challenge' },
  { id: '4', title: 'Karaoke Battle', type: 'Dare', participants: 15, category: 'challenge' },
  { id: '5', title: 'Truth or Dare Classic', type: 'Mixed', participants: 9, category: 'challenge' },
];

export default function SearchScreen({ navigation, onBack }) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'challenges'>('friends');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Load recent searches from AsyncStorage
  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const saved = await AsyncStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  const saveRecentSearch = async (searchTerm: string) => {
    try {
      const updated = [searchTerm, ...recentSearches.filter(item => item !== searchTerm)].slice(0, 5);
      setRecentSearches(updated);
      await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  const removeRecentSearch = async (index: number) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    try {
      await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing recent search:', error);
    }
  };

  const clearAllRecentSearches = async () => {
    setRecentSearches([]);
    try {
      await AsyncStorage.removeItem('recentSearches');
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  };

  // Debounced autocomplete effect (500ms)
  const debounceAutocomplete = useCallback(
    _.debounce((searchText: string) => {
      if (!searchText.trim()) {
        setAutocompleteSuggestions([]);
        return;
      }

      const allData = [...friendsData, ...challengesData];
      const suggestions = allData.filter(item =>
        item.type === 'friend'
          ? item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.username?.toLowerCase().includes(searchText.toLowerCase())
          : item.title?.toLowerCase().includes(searchText.toLowerCase())
      ).slice(0, 5);

      setAutocompleteSuggestions(suggestions);
    }, 500),
    []
  );

  // Search effect with debouncing (300ms)
  const debouncedSearch = useCallback(
    _.debounce((searchQuery: string) => {
      performSearch(searchQuery);
    }, 300),
    [activeTab]
  );

  useEffect(() => {
    if (query.length > 0) {
      debouncedSearch(query);
      debounceAutocomplete(query);
      setShowDropdown(query.length > 0);
    } else {
      setResults([]);
      setAutocompleteSuggestions([]);
      setShowDropdown(false);
    }
  }, [query]);

  // Clear dropdown when tab changes
  useEffect(() => {
    setShowDropdown(false);
    setAutocompleteSuggestions([]);
  }, [activeTab]);

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    // Simulate API delay with local filtering
    setTimeout(() => {
      const lower = searchQuery.toLowerCase();
      const data = activeTab === 'friends' ? friendsData : challengesData;
      let filtered: any[] = [];
      if (activeTab === 'friends') {
        filtered = (data as typeof friendsData).filter(item =>
          item.name?.toLowerCase().includes(lower) || item.username?.toLowerCase().includes(lower)
        );
      } else {
        filtered = (data as typeof challengesData).filter(item =>
          item.title?.toLowerCase().includes(lower)
        );
      }
      setResults(filtered);
      setLoading(false);

      // Save this search to recent searches
      saveRecentSearch(searchQuery);
    }, 200);
  };

  const selectAutocompleteSuggestion = (suggestion: any) => {
    const searchText = suggestion.type === 'friend' ? suggestion.name : suggestion.title;
    setQuery(searchText);
    setShowDropdown(false);
    setResults([]);
    performSearch(searchText);
  };

  const renderItem = ({ item }: any) => {
    if (activeTab === 'friends') {
      return (
        <TouchableOpacity style={styles.resultItem}>
          <Image source={{ uri: item.avatar || item.avatarUrl }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.username}>{item.username}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.resultItem}>
        <View style={styles.challengeBadge}>
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.challengeTitle}>{item.title}</Text>
          <Text style={styles.participants}>{item.participants} participants</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </TouchableOpacity>
    );
  };

  const renderDropdownItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => selectAutocompleteSuggestion(item)}
    >
      <Ionicons
        name={item.type === 'friend' ? "person" : "trophy"}
        size={18}
        color="#6C5CE7"
        style={styles.dropdownIcon}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.dropdownText}>
          {item.type === 'friend' ? item.name : item.title}
        </Text>
        {item.type === 'friend' && (
          <Text style={styles.dropdownSubtext}>{item.username}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderRecentItem = ({ item, index }: any) => (
    <View style={styles.recentItem}>
      <Ionicons name="time" size={18} color="#666" />
      <Text style={styles.recentText}>{item}</Text>
      <TouchableOpacity onPress={() => removeRecentSearch(index)}>
        <Ionicons name="close" size={16} color="#666" />
      </TouchableOpacity>
    </View>
  );

  const handleClearAll = () => {
    Alert.alert(
      'Clear Recent Searches',
      'Are you sure you want to clear all recent searches?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: clearAllRecentSearches }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Search friends or challenges..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query ? (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close" size={20} color="#888" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Autocomplete/Dropdown */}
      {showDropdown && autocompleteSuggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={autocompleteSuggestions}
            renderItem={renderDropdownItem}
            keyExtractor={(item) => item.id}
            bounces={false}
          />
        </View>
      )}

      {/* Recent Searches (when input is empty) */}
      {!query && recentSearches.length > 0 && (
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentHeaderText}>Recent Searches</Text>
            <TouchableOpacity onLongPress={handleClearAll}>
              <Ionicons name="trash" size={18} color="#666" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentSearches}
            renderItem={renderRecentItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['friends', 'challenges'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => {
              setActiveTab(tab);
              setResults([]);
              setShowDropdown(false);
            }}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color="#6C5CE7" />
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : query ? (
        <Text style={styles.empty}>No {activeTab} found</Text>
      ) : (
        <Text style={styles.empty}>Start typing to search</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F', paddingTop: 50 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 48,
  },
  input: { flex: 1, color: '#FFF', marginLeft: 8, fontSize: 16 },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#2D2D3D',
    marginHorizontal: 4,
    borderRadius: 20,
  },
  activeTab: { backgroundColor: '#6C5CE7' },
  tabText: { color: '#888', fontWeight: '600' },
  activeTabText: { color: '#FFF' },
  list: { paddingHorizontal: 20 },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D3D',
  },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  name: { color: '#FFF', fontWeight: '600' },
  username: { color: '#888', fontSize: 12 },
  challengeBadge: {
    backgroundColor: '#00C853',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  challengeTitle: { color: '#FFF', fontWeight: '600' },
  participants: { color: '#888', fontSize: 12 },
  empty: { color: '#888', textAlign: 'center', marginTop: 60, fontSize: 16 },

  // Dropdown styles
  dropdown: {
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    borderRadius: 12,
    maxHeight: 200,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownIcon: { marginRight: 12 },
  dropdownText: { color: '#FFF', fontWeight: '500' },
  dropdownSubtext: { color: '#888', fontSize: 12, marginTop: 2 },

  // Recent searches styles
  recentSection: { marginHorizontal: 20, marginBottom: 16 },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recentHeaderText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#1A1A2E',
    borderRadius: 8,
    marginBottom: 8,
  },
  recentText: { color: '#CCC', fontSize: 16, flex: 1, marginHorizontal: 8 },
});
