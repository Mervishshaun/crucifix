// Example usage of AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

// Retrieve data
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if(value !== null) {
      // value previously stored
      return value;
    }
  } catch(e) {
    // error reading value
  }
};

// Storing an object
await AsyncStorage.setItem('user', JSON.stringify({ name: 'John' }));

// Retrieving an object
const user = JSON.parse(await AsyncStorage.getItem('user'));