import React, { createContext, useReducer, useEffect, useState } from 'react';
import { useContext } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const initialState = {
  loading: true,
  todos: [],
};

const TodosStateContext = createContext(initialState);
const TodosDispatchContext = createContext(() => {});

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'INITIAL_LOAD':
      return { ...state, loading: false, todos: payload };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, payload] };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.title !== payload),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.title === payload) {
            todo.done = !todo.done;
          }
          return todo;
        }),
      };
  }
};

export const TodosProvider = ({ children }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { getItem, setItem } = useAsyncStorage('TODOS');

  useEffect(() => {
    (async () => {
      const persistedTodos = await getItem();
      if (persistedTodos) {
        dispatch({ type: 'INITIAL_LOAD', payload: JSON.parse(persistedTodos) });
      } else {
        dispatch({ type: 'INITIAL_LOAD', payload: [] });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isSaving) {
        return;
      }
      setIsSaving(true);
      await setItem(JSON.stringify(state.todos));
      setIsSaving(false);
    })();
  }, [state, dispatch, isSaving]);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={state}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
};

export const useTodos = () => useContext(TodosStateContext);
export const useTodosActions = () => {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) {
    throw new Error('YOU MUST INSTANTIATE TodosProvider FIRST');
  }

  const addTodo = ({ title, detail }) => {
    dispatch({
      type: 'ADD_TODO',
      payload: {
        title,
        detail,
        done: false,
      },
    });
  };

  const removeTodo = (title) => {
    dispatch({
      type: 'REMOVE_TODO',
      payload: title,
    });
  };

  const toggleTodo = (title) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: title,
    });
  };

  return {
    addTodo,
    removeTodo,
    toggleTodo,
  };
};
