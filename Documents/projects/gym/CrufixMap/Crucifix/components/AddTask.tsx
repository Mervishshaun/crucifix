import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, PanResponder, Animated, Text, FlatList } from 'react-native';
import { useStorage } from '@/hooks/useStorage'; // <-- Add this import

export default function AddTask() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const pan = useRef(new Animated.ValueXY()).current;
  const { save, load } = useStorage('tasks'); // <-- Add this line

  // Load tasks from storage when the component mounts
  useEffect(() => {
    (async () => {
      const stored = await load();
      if (stored) setTasks(JSON.parse(stored));
    })();
  }, []);

  // Save tasks to storage whenever they change
  useEffect(() => {
    save(JSON.stringify(tasks));
  }, [tasks]);

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
    backgroundColor: '#1e1e2f', // deep purple-blue
    borderRadius: 16,
    padding: 16,
    marginVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
    width: '100%',
    borderWidth: 2,
    borderColor: '#ffbe0b', // gold accent border
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#3a86ff', // vibrant blue border
    color: '#1e1e2f',
    fontSize: 17,
  },
  list: {
    maxHeight: 240,
  },
  taskItem: {
    backgroundColor: '#ffbe0b', // gold background
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#3a86ff', // blue border for contrast
    shadowColor: '#3a86ff',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  taskText: {
    color: '#1e1e2f',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

