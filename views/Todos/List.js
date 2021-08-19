import React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { TodoCard } from '../../components/TodoCard';
import { useTodos } from '../../context/TodosContext';

export const List = ({ navigation }) => {
  const { loading, todos } = useTodos();

  if (loading) return <ActivityIndicator color="#000" />;

  return (
    <>
      <Button
        title="Add Todo"
        onPress={() => {
          navigation.push('TODO_ADD');
        }}
      />
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoCard todo={item} />}
        keyExtractor={(item) => item.title}
      />
    </>
  );
};

const styles = StyleSheet.create({});
