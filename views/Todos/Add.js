import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTodosActions } from '../../context/TodosContext';

export const Add = ({ navigation }) => {
  const { addTodo } = useTodosActions();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const handleSave = () => {
    const todo = {
      title,
      detail,
    };
    addTodo(todo);
    navigation.pop();
  };

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
      />
      <View style={styles.separator} />
      <TextInput
        style={[styles.input, { height: 150 }]}
        placeholder="Detail"
        multiline
        onChangeText={setDetail}
      />
      <View style={styles.separator} />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    margin: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    // border radius
    borderRadius: 5,
  },
  input: {
    // text input with border and shadow
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    height: 40,
  },
});
