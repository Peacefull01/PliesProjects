import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from '../components/Icon';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppSelector} from '../hooks/reduxHooks';
import EventListingScreen from '../screens/EventListingScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import LoginScreen from '../screens/LoginScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabIcons = {
  Search: {active: 'search', inactive: 'search-outline'},
  Events: {active: 'calendar', inactive: 'calendar-outline'},
  Favourites: {active: 'heart', inactive: 'heart-outline'},
  Profile: {active: 'person', inactive: 'person-outline'},
};

const renderTabIcon = (routeName, focused) => {
  const config = tabIcons[routeName];
  const iconName = focused ? config.active : config.inactive;

  return (
    <Icon
      name={iconName}
      size={22}
      color={focused ? colors.black : colors.textGray}
    />
  );
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: colors.black,
      tabBarInactiveTintColor: colors.textGray,
      tabBarLabelStyle: styles.tabLabel,
      tabBarIcon: ({focused}) => renderTabIcon(route.name, focused),
    })}>
    <Tab.Screen name="Search">
      {() => <PlaceholderScreen title="Search" />}
    </Tab.Screen>
    <Tab.Screen name="Events" component={EventListingScreen} />
    <Tab.Screen name="Favourites" component={FavouritesScreen} />
    <Tab.Screen name="Profile">
      {() => <PlaceholderScreen title="Profile" />}
    </Tab.Screen>
  </Tab.Navigator>
);

const AppNavigator = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: fonts.medium,
  },
});

export default AppNavigator;
