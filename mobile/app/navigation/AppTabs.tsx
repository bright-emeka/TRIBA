import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet} from 'react-native';
import FeedScreen from '../features/feed/FeedScreen';
import SearchScreen from '../features/search/SearchScreen';
import ChatScreen from '../features/chat/ChatScreen';
import NotificationsScreen from '../features/notifications/NotificationsScreen';
import ProfileScreen from '../features/profile/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Feed':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Chat':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Notifications':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{tabBarLabel: 'Feed'}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{tabBarLabel: 'Search'}}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{tabBarLabel: 'Chat'}}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{tabBarLabel: 'Alerts'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
