import SQLite from 'react-native-sqlite-storage';

// Open (or create) the database
const db = SQLite.openDatabase(
  { name: 'myapp.db', location: 'default' },
  () => { console.log('Database opened'); },
  error => { console.log('Error: ', error); }
);

// Create a table
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
    );
  });
};

// Insert a user
export const insertUser = (name) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO users (name) VALUES (?);', [name]);
  });
};

// Get all users
export const getUsers = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM users;', [], (tx, results) => {
      let users = [];
      for (let i = 0; i < results.rows.length; i++) {
        users.push(results.rows.item(i));
      }
      callback(users);
    });
  });
};

// In your component file (e.g., App.js or any screen)
import { createTable, insertUser, getUsers } from './Documents/util/sqlite';

// Create the table (usually on app start)
createTable();

// Insert a user
insertUser('Jane Doe');

// Get all users
getUsers(users => {
  console.log(users);
});