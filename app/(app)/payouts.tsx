import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PayoutsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState<'rewards' | 'penalties'>('rewards');

  const rewards = [
    {
      title: 'Challenge Victory',
      description: 'Successfully complete any challenge',
      payout: '+50 Points',
      icon: 'trophy',
      color: '#FFD700'
    },
    {
      title: 'Speed Demon',
      description: 'Complete challenge in under 5 minutes',
      payout: '+100 Bonus Points',
      icon: 'timer',
      color: '#FF6B6B'
    },
    {
      title: 'Community Favorite',
      description: 'Your proof gets 50+ votes',
      payout: '+75 Reputation',
      icon: 'heart',
      color: '#FF69B4'
    },
    {
      title: 'Streak Master',
      description: 'Complete 10 challenges in a row',
      payout: '+500 Mega Points',
      icon: 'flame',
      color: '#FFA500'
    },
    {
      title: 'Elite Challenger',
      description: 'Reach Level 50',
      payout: 'Exclusive Title + Avatar',
      icon: 'star',
      color: '#9C27B0'
    },
  ];

  const penalties = [
    {
      title: 'Challenge Failure',
      description: 'Fail to complete accepted challenge',
      penalty: '-25 Points',
      icon: 'close-circle',
      color: '#FF4757'
    },
    {
      title: 'No Show',
      description: 'Accept challenge but never submit proof',
      penalty: '-50 Points',
      icon: 'remove-circle',
      color: '#FF3838'
    },
    {
      title: 'Community Report',
      description: 'Proof flagged as inappropriate',
      penalty: '-100 Points + Warning',
      icon: 'warning',
      color: '#FFA502'
    },
    {
      title: 'Account Suspension',
      description: 'Multiple violations in 7 days',
      penalty: '3 Day Ban',
      icon: 'ban',
      color: '#DC143C'
    },
  ];

  const currentData = activeTab === 'rewards' ? rewards : penalties;
  const isRewards = activeTab === 'rewards';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payouts & Penalties</Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'rewards' && styles.activeTab]}
          onPress={() => setActiveTab('rewards')}
        >
          <Ionicons name="trending-up" size={20} color="#FFF" />
          <Text style={styles.tabText}>Rewards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'penalties' && styles.activeTab]}
          onPress={() => setActiveTab('penalties')}
        >
          <Ionicons name="trending-down" size={20} color="#FFF" />
          <Text style={styles.tabText}>Penalties</Text>
        </TouchableOpacity>
      </View>

      {/* Current Points Display */}
      <View style={styles.pointsDisplay}>
        <View style={styles.pointsCard}>
          <Ionicons name="cash" size={24} color="#FFD700" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.pointsLabel}>Current Points</Text>
            <Text style={styles.pointsValue}>1,250</Text>
          </View>
        </View>
      </View>

      {/* Rules List */}
      <Text style={styles.sectionHeader}>
        {isRewards ? 'Reward System' : 'Penalty System'}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {currentData.map((item, index) => (
          <View key={index} style={styles.ruleCard}>
            <View style={styles.ruleHeader}>
              <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.ruleTitle}>{item.title}</Text>
                <Text style={styles.ruleDesc}>{item.description}</Text>
              </View>
            </View>

            <View style={styles.ruleFooter}>
              <Text style={[styles.ruleValue, { color: isRewards ? '#00C853' : '#FF4757' }]}>
                {isRewards ? item.payout : item.penalty}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Info */}
      <View style={styles.infoBox}>
        <Ionicons name="information-circle" size={20} color="#6C5CE7" />
        <Text style={styles.infoText}>
          {isRewards
            ? 'Rewards are awarded immediately upon challenge approval'
            : 'Penalties encourage fair play and community standards'
          }
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#6C5CE7',
  },
  tabText: { color: '#FFF', fontSize: 14, fontWeight: '600', marginLeft: 6 },
  pointsDisplay: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  pointsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  pointsLabel: { color: '#888', fontSize: 14 },
  pointsValue: { color: '#FFD700', fontSize: 32, fontWeight: 'bold' },
  sectionHeader: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    marginBottom: 16
  },
  ruleCard: {
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  ruleDesc: { color: '#CCC', fontSize: 14, lineHeight: 20 },
  ruleFooter: {
    alignItems: 'flex-end',
  },
  ruleValue: { fontSize: 14, fontWeight: 'bold' },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  infoText: { color: '#CCC', fontSize: 14, marginLeft: 12, flex: 1, lineHeight: 20 },
});
