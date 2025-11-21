import { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { collection, query, where, orderBy, limit, startAfter, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/index';
import { addToSearchHistory, getSearchHistory, clearSearchHistory, removeFromHistory } from '../../utils/searchHistory';
import UserResult from '../../components/UserResult';
import DareResult from '../../components/DareResult';
import PostResult from '../../components/PostResult';

export default function SearchScreen() {
  const [queryText, setQueryText] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load history on mount
  useEffect(() => {
    (async () => {
      const saved = await getSearchHistory();
      setHistory(saved);
    })();
  }, []);

  // Debounced search
  useEffect(() => {
    if (!queryText.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      performSearch(queryText.toLowerCase());
    }, 300);

    return () => clearTimeout(timer);
  }, [queryText]);

  // Save to history when user submits
  const handleSubmit = () => {
    if (queryText.trim()) {
      addToSearchHistory(queryText);
      Haptics.selectionAsync();
      performSearch(queryText);
    }
  };

  const handleHistoryPress = (query: string) => {
    setQueryText(query);
    performSearch(query);
    Haptics.selectionAsync();
  };

  const handleClearAll = async () => {
    await clearSearchHistory();
    setHistory([]);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const performSearch = async (q: string) => {
    setLoading(true);

    const usersQuery = query(
      collection(db, 'users'),
      where('usernameLower', '>=', q),
      where('usernameLower', '<=', q + '\\uf8ff'),
      limit(5)
    );

    const daresQuery = query(
      collection(db, 'dares'),
      where('titleLower', '>=', q),
      where('titleLower', '<=', q + '\\uf8ff'),
      limit(5)
    );

    const postsQuery = query(
      collection(db, 'posts'),
      where('hashtags', 'array-contains-any', [q, `#${q}`]),
      where('visibility', '==', 'public'),
      orderBy('trendingScore', 'desc'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const [usersSnap, daresSnap, postsSnap] = await Promise.all([
      getDocs(usersQuery),
      getDocs(daresQuery),
      getDocs(postsQuery),
    ]);

    const results = [
      ...usersSnap.docs.map(d => ({ type: 'user', ...d.data(), id: d.id })),
      ...daresSnap.docs.map(d => ({ type: 'dare', ...d.data(), id: d.id })),
      ...postsSnap.docs.map(d => ({ type: 'post', ...d.data(), id: d.id })),
    ];

    setResults(results);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Search Bar */}
      <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" style={{ marginRight: 12 }} />
        </Pressable>
        <TextInput
          placeholder="Search users, dares, #hashtags..."
          value={queryText}
          onChangeText={setQueryText}
          onSubmitEditing={handleSubmit}
          style={{ flex: 1, fontSize: 16 }}
          autoFocus
        />
        {queryText ? (
          <Pressable onPress={() => setQueryText('')}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </Pressable>
        ) : null}
      </View>

      {/* History */}
      {!queryText && history.length > 0 && (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
            <Text style={{ fontWeight: '600', color: '#666' }}>Recent Searches</Text>
            <Pressable onPress={handleClearAll}>
              <Text style={{ color: '#FF3B30' }}>Clear All</Text>
            </Pressable>
          </View>

          {history.map((item) => (
            <Pressable
              key={item}
              onPress={() => handleHistoryPress(item)}
              style={({ pressed }) => [
                { padding: 16, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: pressed ? '#f0f0f0' : '#fff' }
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="time-outline" size={18} color="#888" />
                <Text style={{ marginLeft: 12 }}>{item}</Text>
              </View>
              <Pressable
                onPress={async (e: any) => {
                  e.stopPropagation();
                  await removeFromHistory(item);
                  setHistory(prev => prev.filter(h => h !== item));
                }}
              >
                <Ionicons name="close" size={18} color="#888" />
              </Pressable>
            </Pressable>
          ))}
        </View>
      )}

      {/* Live Results */}
      {queryText && (
        <FlatList
          data={results}
          keyExtractor={item => item.id + item.type}
          renderItem={({ item }) => {
            if (item.type === 'user') return <UserResult user={item} />;
            if (item.type === 'dare') return <DareResult dare={item} />;
            if (item.type === 'post') return <PostResult post={item} />;
            return null;
          }}
          ListEmptyComponent={
            !loading && queryText ? (
              <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>
                No results found
              </Text>
            ) : null
          }
        />
      )}
    </View>
  );
}
