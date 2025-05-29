import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, PanResponder, Animated, Text, FlatList } from 'react-native';

export default function AddTask() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task.trim()]);
      setTask('');
    }
  };

  return (
    <Animated.View
      style={[styles.container, { transform: pan.getTranslateTransform() }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
          placeholderTextColor="#888"
        />
        <Button title="Add" onPress={handleAddTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item}</Text>
          </View>
        )}
        style={styles.list}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222b45', // deep blue background
    borderRadius: 14,
    padding: 14,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#3366ff', // blue border
    color: '#222b45',
    fontSize: 16,
  },
  list: {
    maxHeight: 220,
  },
  taskItem: {
    backgroundColor: '#3366ff', // blue background
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 0,
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
  },
});

