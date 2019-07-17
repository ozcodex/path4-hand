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
import ReportDelay from './components/ReportDelay'
import Map from './components/Map'
import Pick from './components/Pick'
import Egg from './components/Egg'
import Thanks from './components/Thanks'
import Feedback from './components/Feedback'
import BabyDragon from './components/BabyDragon'
import ChooseName from './components/ChooseName'
import BroadChat from './components/BroadChat'
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
    ReportDelay: {screen: ReportDelay},
    Pick: {screen: Pick},
    Map: {screen: Map},
    Egg: {screen: Egg},
    Thanks: {screen: Thanks},
    Feedback: {screen: Feedback},
    BabyDragon: {screen: BabyDragon},
    ChooseName: {screen: ChooseName},
    BroadChat: {screen: BroadChat},
  },
  {
    initialRouteName: "Home"
  });

const App = createAppContainer(MainNavigator);

export default App;
