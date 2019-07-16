import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {border, styles} from '../styles'
export default class Home extends Component {

  static navigationOptions = { header: null }

  state = {
    currentIndex: 0,
  };

  render() {
    const navigate = this.props.navigation.navigate;
    return (
        <View style={styles.container}> 
          <TouchableOpacity style ={styles.button} onPress={() => navigate('Welcome')}>
            <Text style={styles.buttonText}>Run GPS Test</Text>
          </TouchableOpacity> 
          <TouchableOpacity style ={styles.button} onPress={() => navigate('ReportStation')}>
            <Text style={styles.buttonText}>Report a Delay</Text>
          </TouchableOpacity> 
          <TouchableOpacity style ={styles.button} onPress={() => navigate('North')}>
            <Text style={styles.buttonText}>Play a Game!</Text>
          </TouchableOpacity> 
          <TouchableOpacity style ={styles.button} onPress={() => navigate('Map')}>
            <Text style={styles.buttonText}>See the HeatMap</Text>
          </TouchableOpacity> 
        </View>
    );
  }
}

