
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './screens/DashboardScreen';
import MenuScreen from './screens/MenuScreen';
import AddMenuItemScreen from './screens/AddMenuItemScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{title: 'Dashboard'}}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{title: 'Manage Menu'}}
      />
      <Tab.Screen
        name="Add Item"
        component={AddMenuItemScreen}
        options={{title: 'Add Item'}}
      />
    </Tab.Navigator>
  );
}
