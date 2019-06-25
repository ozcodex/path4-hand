import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Image from 'react-native-scalable-image';
import {border, styles} from '../styles'

export default class Main extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
  }

  render() {
    const navigate = this.props.navigation.navigate;
    var delay = this.props.navigation.getParam('delay', 0)
    delay = Math.ceil(delay*60/360)
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Line')}>
          <Text style={styles.text}>Are you currently facing a delay with public transport?</Text>
        </TouchableOpacity>
          <Text style={styles.text}>or</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Board')}>
          <Text style={styles.text}>Do you want to see who is waiting with you?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

