import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {UserTypes} from '../../../types/index';

interface PropTypes {
  data: UserTypes;
  style: ViewStyle;
}

export const UserItem = (props: PropTypes) => {
  const {data, style} = props;
  return (
    <View style={[styles.container, {...style}]}>
      <Text>{data.first_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 150,
  },
});
