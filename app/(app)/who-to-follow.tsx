// screens/WhoToFollowScreen.tsx or component
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useForYouScores } from '../hooks/useForYouScores';

export default function WhoToFollow() {
  const { topAuthors } = useForYouScores(); // returns top 10 authors user interacts with

  if (topAuthors.length === 0) {
    return (
      <View style={{padding: 20}}>
        <Text style={{fontSize: 18, textAlign: 'center', color: '#888'}}>
          Like some posts to get personalized suggestions
        </Text>
      </View>
    );
  }

  return (
    <View style={{padding: 16}}>
      <Text style={{fontSize: 22, fontWeight: '800', marginBottom: 16}}>
        Who to follow
      </Text>

      {topAuthors.map((author) => (
        <View key={author.id} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee'}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{author.displayName || author.email}</Text>
            <Text style={{color: '#666'}}>@{author.username}</Text>
          </View>
          <Pressable
            onPress={() => followUser(author.id)}
            style={{
              backgroundColor: '#6C5CE7',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{color: 'white', fontWeight: 'bold'}}>Follow</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

// Placeholder follow function - would integrate with actual follow logic
function followUser(userId: string) {
  console.log('Follow user:', userId);
  // Implement follow logic here
}
