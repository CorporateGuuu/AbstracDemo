// app/(app)/payout.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const tabs = ['1st', '2nd', '3rd', '4th', 'Last'];
const formulas = {
  '1st': '8 x 20 = 160',
  '2nd': '6 x 20 = 120',
  '3rd': '4 x 20 = 80',
  '4th': '2 x 20 = 40',
  'Last': '0 x 20 = 0',
};

export default function PayoutPunishmentScreen() {
  const [activeTab, setActiveTab] = useState('1st');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payout & Punishment</Text>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Formula */}
      <Text style={styles.formula}>{formulas[activeTab]}</Text>

      {/* Rank List */}
      <View style={styles.rankList}>
        {tabs.map((rank) => (
          <Text
            key={rank}
            style={[
              styles.rankText,
              activeTab === rank && styles.activeRankText,
            ]}
          >
            {rank}
          </Text>
        ))}
      </View>

      {/* Agree Button */}
      <LinearGradient
        colors={['#A0D8F1', '#6C5CE7']}
        style={styles.agreeButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.agreeText}>Agree to Terms</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    paddingTop: 50,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  tab: {
    backgroundColor: '#2D2D3D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 18,
    marginHorizontal: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#6C5CE7',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFF',
  },
  formula: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
  },
  rankList: {
    alignItems: 'center',
    marginBottom: 40,
  },
  rankText: {
    color: '#FFF',
    fontSize: 48,
    marginBottom: 30,
    opacity: 0.3,
  },
  activeRankText: {
    fontWeight: 'bold',
    opacity: 1,
    color: '#6C5CE7',
  },
  agreeButton: {
    marginHorizontal: 20,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  agreeText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
