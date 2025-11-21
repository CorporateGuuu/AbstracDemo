// components/UserActionButtons.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function UserActionButtons({ userId }: { userId: string }) {
  // Placeholder implementations - would use real social hooks
  const isFollowing = false; // useIsFollowing(userId);
  const isFriend = false; // useIsFriend(userId);
  const requestSent = false; // useFriendRequestSent(userId);

  const followUser = (userId: string) => {
    console.log('Follow user:', userId);
    // Implement follow logic using Cloud Function
  };

  const unfollowUser = (userId: string) => {
    console.log('Unfollow user:', userId);
    // Implement unfollow logic using Cloud Function
  };

  const sendFriendRequest = (userId: string) => {
    console.log('Send friend request to:', userId);
    // Implement friend request logic using Cloud Function
  };

  if (isFriend) {
    return <Text style={{color: '#00C853', fontWeight: 'bold'}}>Friends</Text>;
  }

  if (requestSent) {
    return <Text style={{color: '#888'}}>Request Sent</Text>;
  }

  return (
    <View style={{flexDirection: 'row', gap: 12}}>
      <Pressable
        onPress={() => isFollowing ? unfollowUser(userId) : followUser(userId)}
        style={{
          backgroundColor: isFollowing ? '#333' : '#6C5CE7',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
        }}
      >
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {isFollowing ? "Following" : "Follow"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => sendFriendRequest(userId)}
        style={{
          borderWidth: 2,
          borderColor: '#6C5CE7',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
        }}
      >
        <Text style={{color: '#6C5CE7', fontWeight: 'bold'}}>Add Friend</Text>
      </Pressable>
    </View>
  );
}
