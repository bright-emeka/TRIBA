import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuthStore} from '../store/authStore';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import AdminStack from './AdminStack';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {user, isLoading} = useAuthStore();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : user.role === 'admin' ? (
          <Stack.Screen name="Admin" component={AdminStack} />
        ) : (
          <Stack.Screen name="App" component={AppTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default AppNavigator;
