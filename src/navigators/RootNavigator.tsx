import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator, AuthNavigator} from './index';
import {Loader} from '../components/Modals/Loader';

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      {false ? <AuthNavigator /> : <AppNavigator />}
      <Loader />
    </NavigationContainer>
  );
};
