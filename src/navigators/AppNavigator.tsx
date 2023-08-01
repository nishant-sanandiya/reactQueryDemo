import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddTodo, Home, TodoList} from '../screens/index';
import {UserList} from '../screens/userList/UserList';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="userList" component={UserList} />
      <Stack.Screen name="addTodo" component={AddTodo} />
      <Stack.Screen name="todoList" component={TodoList} />
    </Stack.Navigator>
  );
};
