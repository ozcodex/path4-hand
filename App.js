import React from 'react';
import { View } from 'react-native';
import Welcome from './components/Welcome'
import Home from './components/Home'
import Line from './components/Line'
import Delay from './components/Delay'
import Score from './components/Score'
import Board from './components/Board'
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    Welcome: {screen: Welcome},
    Line: {screen: Line},
    Delay: {screen: Delay},
    Score: {screen: Score},
    Board: {screen: Board},
  },
  {
    initialRouteName: "Home"
  });

const App = createAppContainer(MainNavigator);

export default App;
