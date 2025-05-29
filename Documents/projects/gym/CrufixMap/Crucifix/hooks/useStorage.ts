import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStorage(key: string) {
  const save = async (value: string) => {
    await AsyncStorage.setItem(key, value);
  };
  const load = async () => {
    return await AsyncStorage.getItem(key);
  };
  const remove = async () => {
    await AsyncStorage.removeItem(key);
  };
  return { save, load, remove };
}