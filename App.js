import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { createTable, insertUser, getUsers } from './Documents/util/sqlite';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    createTable();
    getUsers(setUsers);
  }, []);

  const handleAddUser = () => {
    insertUser('Jane Doe');
    getUsers(setUsers);
  };

  return (
    <View>
      <Button title="Add User" onPress={handleAddUser} />
      {users.map(user => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
};

export default App;
