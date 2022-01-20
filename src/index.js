import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './navigator/navigator';

const Main = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Main;
