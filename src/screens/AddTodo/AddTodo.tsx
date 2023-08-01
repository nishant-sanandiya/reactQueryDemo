import {Alert, Button, SafeAreaView, TextInput} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addUser} from '../../utility/db.mock';
import {UserTypes} from '../../types';

export const AddTodo = (props: any) => {
  const queryClient = useQueryClient();

  const {mutate} = useMutation(
    (newUser: UserTypes) => {
      return addUser(newUser);
    },
    {
      onError: error => {
        console.log('Error :- ', error);
        Alert.alert('Error', JSON.stringify(error));
      },
      onSuccess: (data, variable, context) => {
        console.log(
          'data variable context :- ',
          JSON.stringify(data),
          JSON.stringify(variable),
          JSON.stringify(context),
        );
        Alert.alert('Success', 'User Added', [
          {onPress: onOkPressHandler, text: 'Done'},
        ]);
      },
      onMutate: async newUser => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['getUserList']);
        // // // Snapshot the previous value
        const previousTodos = queryClient.getQueryData(['getUserList']);
        // // // Optimistically update to the new value
        queryClient.setQueryData(['getUserList'], (oldUsers: any) => {
          return [newUser, ...oldUsers];
        });
        // // Return a context object with the snapshotted value
        return {previousTodos};
      },
    },
  );

  const [userName, setUserName] = useState<string>('');

  const userNameChangeHandler = (text: string) => {
    setUserName(text);
  };

  const onAddUserPressHandler = () => {
    if (userName) {
      mutate({
        avatar: 123,
        email: 'email@gmail.com',
        first_name: userName,
        id: '123',
        last_name: 'last name',
      });
    } else {
      Alert.alert('Warn', 'Please Add username first !!');
    }
  };

  const onOkPressHandler = () => {
    setUserName('');

    // we can use after mutation for invalidate previous data.
    // this method is not optimistic update.
    // queryClient.invalidateQueries(['getUserList']);

    props.navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Username"
        style={styles.inputStyle}
        value={userName}
        onChangeText={userNameChangeHandler}
      />
      <Button onPress={onAddUserPressHandler} title="Add User" />
    </SafeAreaView>
  );
};
