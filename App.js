import React from 'react';
import { View } from 'react-native';
import Welcome from './components/Welcome'
import Home from './components/Home'
import Line from './components/Line'
import Delay from './components/Delay'
import Score from './components/Score'
import Board from './components/Board'
import Info from './components/Info'
import Main from './components/Main'
import North from './components/GameNorth'
import Intro from './components/Intro'
import ReportStation from './components/ReportStation'
import ReportLine from './components/ReportLine'
import ReportDirection from './components/ReportDirection'
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    Intro: {screen: Intro},
    Welcome: {screen: Welcome},
    Line: {screen: Line},
    Delay: {screen: Delay},
    Score: {screen: Score},
    Board: {screen: Board},
    Info: {screen: Info},
    Main: {screen: Main},
    North: {screen: North},
    ReportStation: {screen: ReportStation},
    ReportLine: {screen: ReportLine},
    ReportDirection: {screen: ReportDirection},
  },
  {
    initialRouteName: "Home"
  });

const App = createAppContainer(MainNavigator);

export default App;
