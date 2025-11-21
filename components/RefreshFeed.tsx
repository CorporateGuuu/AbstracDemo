// components/RefreshFeed.tsx
import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function RefreshableFeed({ data, renderItem, onRefresh: customOnRefresh }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setRefreshing(true);

    // Custom refresh logic if provided, otherwise default behavior
    if (customOnRefresh) {
      await customOnRefresh();
    } else {
      // Default refresh logic (simulated)
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setRefreshing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#6C5CE7"
          colors={["#6C5CE7"]}
          progressViewOffset={20}
        />
      }
    />
  );
}
