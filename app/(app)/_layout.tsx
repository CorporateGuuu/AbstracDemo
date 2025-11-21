import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FeedProvider } from '../../contexts/FeedContext';

export default function AppLayout() {
  // TODO: Implement unreadFriendPosts calculation
  const unreadFriendPosts = 0; // Placeholder - would come from useFriendsFeed hook

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6C5CE7', // Your app's purple
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#0A0A0F', borderTopWidth: 0 },
        headerShown: false,
      }}
    >
      {/* FRIENDS TAB */}
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: () => <Ionicons name="people" size={26} />,
          tabBarBadge: unreadFriendPosts > 0 ? unreadFriendPosts : undefined,
        }}
      />

      {/* FOLLOWING TAB */}
      <Tabs.Screen
        name="following"
        options={{
          title: 'Following',
          tabBarIcon: () => <Ionicons name="compass" size={26} />,
        }}
      />

      {/* FOR YOU TAB */}
      <Tabs.Screen
        name="forYou"
        options={{
          title: 'For You',
          tabBarIcon: () => <Ionicons name="sparkles" size={28} color="#FF3B30" />,
        }}
      />

      {/* EXPLORE TAB */}
      <Tabs.Screen
        name="index" // Default home tab
        options={{
          title: 'Explore',
          tabBarIcon: () => <Ionicons name="flame" size={28} color="#FF9500" />,
        }}
      />

      {/* Existing screens */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="frames"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="aperture-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
