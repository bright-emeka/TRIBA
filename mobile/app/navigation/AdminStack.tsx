import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, StyleSheet} from 'react-native';
import AdminScreen from '../features/admin/AdminScreen';

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: '#ffffff'},
      }}>
      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  );
};

export default AdminStack;
