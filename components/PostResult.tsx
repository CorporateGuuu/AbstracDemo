import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TrendingBadge from './TrendingBadge';

interface PostResultProps {
  post: {
    id: string;
    content: string;
    authorId: string;
    authorUsername?: string;
    hashtags?: string[];
    createdAt?: any;
    trendingScore?: number;
  };
}

export default function PostResult({ post }: PostResultProps) {
  return (
    <Pressable style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0', position: 'relative' }}>
      {/* Trending Badge */}
      <TrendingBadge score={post.trendingScore || 0} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#4ecdc4', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
          <Ionicons name="document" size={20} color="white" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, lineHeight: 22 }} numberOfLines={2}>
            {post.content}
          </Text>
          {post.authorUsername && (
            <Text style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
              @{post.authorUsername}
            </Text>
          )}
          {post.hashtags && post.hashtags.length > 0 && (
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              {post.hashtags.slice(0, 3).map((tag, index) => (
                <Text key={index} style={{ color: '#007bff', fontSize: 12, marginRight: 8 }}>
                  #{tag}
                </Text>
              ))}
            </View>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </View>
    </Pressable>
  );
}
