import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@search_history';

export const addToSearchHistory = async (query: string) => {
  if (!query.trim()) return;

  const cleanQuery = query.trim().toLowerCase();

  try {
    const existing = await AsyncStorage.getItem(HISTORY_KEY);
    let history: string[] = existing ? JSON.parse(existing) : [];

    // Remove duplicate + add to top
    history = history.filter(q => q !== cleanQuery);
    history.unshift(cleanQuery);

    // Keep only last 20
    history = history.slice(0, 20);

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {}
};

export const getSearchHistory = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const clearSearchHistory = async () => {
  await AsyncStorage.removeItem(HISTORY_KEY);
};

export const removeFromHistory = async (queryToRemove: string) => {
  try {
    const existing = await AsyncStorage.getItem(HISTORY_KEY);
    if (!existing) return;

    let history: string[] = JSON.parse(existing);
    history = history.filter(q => q !== queryToRemove);

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {}
};
