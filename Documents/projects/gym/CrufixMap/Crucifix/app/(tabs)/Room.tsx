
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';  

export default function HomeScreen() {
  return (
      <View style={styles.titleContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.centeredText}>
            Cruifix
          </Text>
        </View>

      </View>
      
  
  
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 15,
    backgroundColor: 'black',
  },
  textContainer: {
    backgroundColor: '#f0f4ff',
    padding: 0,
    width: '100%',
    borderRadius: 0,
    shadowColor: '#000',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  centeredText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
});
