import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useUnreadNotifications } from '../hooks/useUnreadNotifications';

interface NotificationItem {
  id: string;
  recipientId: string;
  senderId: string;
  title: string;
  body: string;
  type: string;
  read: boolean;
  createdAt: Date;
  metadata?: any;
}

const functions = getFunctions();

export default function NotificationCenter() {
  const [user] = useAuthState(auth);
  const { unreadCount } = useUnreadNotifications();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  // TODO: Implement real-time listener for notifications
  useEffect(() => {
    if (!user) return;
    // Mock data for now - replace with Firestore query
    setNotifications([
      {
        id: '1',
        recipientId: user.uid,
        senderId: 'other_user',
        title: 'Dare Completed!',
        body: 'Someone won the dare!',
        type: 'dare_completed',
        read: false,
        createdAt: new Date(),
      }
    ]);
    setLoading(false);
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    if (updatingIds.has(notificationId)) return;

    setUpdatingIds(prev => new Set([...prev, notificationId]));

    try {
      // Optimistic UI update
      updateNotificationAsRead(notificationId);

      const readNotification = httpsCallable(functions, 'readNotification');
      await readNotification({
        notificationId,
      });
    } catch (error) {
      console.error('Failed to mark as read:', error);
      // Revert optimistic update on error
      Alert.alert('Error', 'Failed to mark notification as read');
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  const markAllRead = async () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
    if (unreadIds.length === 0) return;

    try {
      const readNotification = httpsCallable(functions, 'readNotification');
      await readNotification({
        notificationIds: unreadIds,
      });

      // Update all as read
      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      );
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      Alert.alert('Error', 'Failed to mark all notifications as read');
    }
  };

  const updateNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const renderNotification = ({ item }: { item: NotificationItem }) => {
    const renderRightActions = () => (
      <View style={styles.swipeAction}>
        <Text style={styles.swipeActionText}>Mark Read</Text>
      </View>
    );

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={() => markAsRead(item.id)}
      >
        <TouchableOpacity
          style={[styles.notificationItem, item.read && styles.readNotification]}
          onPress={() => !item.read && markAsRead(item.id)}
          disabled={updatingIds.has(item.id)}
        >
          <View style={styles.notificationContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.timestamp}>
              {item.createdAt.toLocaleDateString()}
            </Text>
          </View>
          {!item.read && <View style={styles.unreadDot} />}
        </TouchableOpacity>
      </Swipeable>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading notifications...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity
            onPress={markAllRead}
            style={styles.markAllButton}
          >
            <Text style={styles.markAllText}>
              Mark all as read ({unreadCount})
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  markAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  markAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  readNotification: {
    backgroundColor: '#f8f8f8',
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  swipeAction: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  swipeActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});
