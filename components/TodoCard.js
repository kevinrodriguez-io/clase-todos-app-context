import React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useTodosActions } from '../context/TodosContext';
import { useNavigation } from '@react-navigation/native';

export const TodoCard = ({ todo }) => {
  const { done: isDone, title } = todo;
  const navigation = useNavigation();
  const { toggleTodo } = useTodosActions();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('TODO_DETAIL', { todo });
      }}
      style={styles.card}
    >
      <Switch onValueChange={() => toggleTodo(title)} value={isDone} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    // border radius
    borderRadius: 5,
  },
});
