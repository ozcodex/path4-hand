import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import {border, styles} from '../styles'

export default class Welcome extends Component {

static navigationOptions = { header: null } 

  render() {
    console.log(Constants.deviceId)
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Text style={styles.bold}>Let's get started:</Text>
        <View style={styles.central}>
          <Text>We are sure that you are angry because of facing a delay with public transportation.</Text>
          <Text>Path4 is helping you leave out the stress and find out who is travelling with you while collecting delay minutes.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Main')}>
          <Text style={styles.buttonText}>Start to grow your MVG-dragon!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

