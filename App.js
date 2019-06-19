import React from 'react';
import { View } from 'react-native';
import Welcome from './components/Welcome'
import Home from './components/Home'
import Line from './components/Line'
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    Welcome: {screen: Welcome},
    Line: {screen: Line},
    //Profile: {screen: ProfileScreen},
  },
  {
    initialRouteName: "Home"
  });

const App = createAppContainer(MainNavigator);

export default App;
