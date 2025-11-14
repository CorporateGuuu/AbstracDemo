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

const ranks = ['1st', '2nd', '3rd', 'Last'];
const formulas = {
  '1st': '8 x 20 = 160',
  '2nd': '6 x 20 = 120',
  '3rd': '4 x 20 = 80',
  '4th': '2 x 20 = 40',
  'Last': '0 x 20 = 0',
};

export default function PayoutPunishmentScreen() {
  const [activeTab, setActiveTab] = useState('1st');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const tabs = ['1st', '2nd', '3rd', '4th', 'Last'];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Payout & Punishment</Text>

      {/* Tab Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabPill,
              activeTab === tab ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Formula */}
      <View style={styles.formula}>
        <Text style={styles.formulaText}>{formulas[activeTab]}</Text>
      </View>

      {/* Rank List */}
      <View style={styles.rankList}>
        {ranks.map((rank) => (
          <View key={rank} style={styles.rankItem}>
            <Text style={[
              styles.rankText,
              activeTab === rank ? styles.selectedRankText : styles.unselectedRankText,
            ]}>
              {rank}
            </Text>
          </View>
        ))}
      </View>

      {/* Bottom Button */}
      <LinearGradient
        colors={['#A0D8F1', '#6C5CE7']}
        style={styles.bottomButton}
      >
        <TouchableOpacity activeOpacity={0.8} style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Agree to Terms</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  tabPill: {
    width: 60,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  activeTab: {
    backgroundColor: '#6C5CE7',
  },
  inactiveTab: {
    backgroundColor: '#2D2D3D',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#FFF',
  },
  inactiveTabText: {
    color: '#888',
  },
  formula: {
    alignItems: 'center',
    marginVertical: 40,
  },
  formulaText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  rankList: {
    flex: 1,
    justifyContent: 'center',
  },
  rankItem: {
    alignItems: 'center',
    marginBottom: 40,
  },
  rankText: {
    fontSize: 48,
    color: '#FFF',
    fontWeight: 'bold',
  },
  selectedRankText: {
    color: '#6C5CE7',
    fontWeight: 'bold',
  },
  unselectedRankText: {
    color: '#FFF',
    fontWeight: 'normal',
  },
  bottomButton: {
    marginHorizontal: 20,
    height: 56,
    borderRadius: 28,
    marginBottom: 20,
  },
  buttonTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
