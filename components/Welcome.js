import React,{ Component } from 'react';
import { Alert,View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import {border, styles} from '../styles'

export default class Welcome extends Component {

  state = {
    location: 'Unknown'
  };
  static navigationOptions = { header: null } 

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>
          Your Unique Id is:
        </Text>
        <Text style={styles.text}>{Constants.deviceId}</Text>
        <TouchableOpacity style ={styles.button} onPress={this.findCoordinates}>
          <Text style={styles.buttonText}>Find My Coords?</Text>
        </TouchableOpacity>
        <Text>Location: {this.state.location}</Text>
        <TouchableOpacity style ={styles.button} onPress={() => navigate('North')}>
          <Text style={styles.buttonText}>Play a Game!</Text>
        </TouchableOpacity>
      </View>
    );
  }
    
}

