
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MenuProvider } from './src/contexts/MenuContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </MenuProvider>
  );
}
