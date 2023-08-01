import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from '../constants/index';

export const EmptyList = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.skyBlue} size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
