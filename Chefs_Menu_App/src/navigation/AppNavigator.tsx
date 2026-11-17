
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={() => null}
      />
      <Tab.Screen
        name="Menu"
        component={() => null}
      />
      <Tab.Screen
        name="Add Item"
        component={() => null}
      />
    </Tab.Navigator>
  );
}
