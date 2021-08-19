import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useTodosActions } from '../../context/TodosContext';

export const Detail = ({ navigation, route }) => {
  const { removeTodo } = useTodosActions();
  const { todo } = route.params;

  return (
    <View>
      <Text>{JSON.stringify(todo, null, 2)}</Text>
      <Button
        title="Remove"
        color="#f00"
        onPress={() => {
          removeTodo(todo.title);
          navigation.pop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
