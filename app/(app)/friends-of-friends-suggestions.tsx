// screens/FriendsOfFriendsSuggestionsScreen.tsx or component
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useFriendsOfFriendsSuggestions } from '../hooks/useFriendsOfFriendsSuggestions';

export default function FriendsOfFriendsSuggestions() {
  const suggestions = useFriendsOfFriendsSuggestions();

  if (suggestions.length === 0) {
    return (
      <View style={{padding: 20}}>
        <Text style={{fontSize: 18, textAlign: 'center', color: '#888'}}>
          Add some friends to discover more people
        </Text>
      </View>
    );
  }

  return (
    <View style={{padding: 16}}>
      <Text style={{fontSize: 20, fontWeight: '800', marginBottom: 12}}>
        Friends of friends
      </Text>
      {suggestions.map((user) => (
        <View key={user.id} style={styles.userCard}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.displayName || user.email}</Text>
            <Text style={styles.mutualFriends}>
              {user.mutualCount} mutual {user.mutualCount === 1 ? 'friend' : 'friends'}
            </Text>
          </View>
          <Pressable
            onPress={() => console.log('Follow user:', user.id)}
            style={styles.followButton}
          >
            <Text style={styles.followButtonText}>Follow</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mutualFriends: {
    color: '#666',
    fontSize: 14,
  },
  followButton: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
