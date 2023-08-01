import React from 'react';
import {Button, View} from 'react-native';
import {styles} from './styles';

export const Login = () => {
  const onLoginPressHandler = () => {};

  return (
    <View style={styles.container}>
      <Button onPress={onLoginPressHandler} title="Click to Login" />
    </View>
  );
};
