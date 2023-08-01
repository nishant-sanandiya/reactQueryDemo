import React, {useMemo} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {useIsFetching} from '@tanstack/react-query';
import {Colors} from '../../constants';

export const Loader = () => {
  const isFetching = useIsFetching();

  const isVisible = useMemo(
    (): boolean => (isFetching === 1 ? true : false),
    [isFetching],
  );

  return (
    <Modal transparent={true} visible={isVisible} style={styles.modalStyle}>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={Colors.skyBlue} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.semiTransparent,
  },
  modalStyle: {
    flex: 1,
  },
});
