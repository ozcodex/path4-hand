import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Image from 'react-native-scalable-image';
import Nav from './Nav';
import {border, styles} from '../styles'

export default class Info extends Component {

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
        <Image
          style={styles.image} 
          width={Dimensions.get('window').width - border * 4}
          source={require('../assets/dragon.png')}
        />
        <Text style={styles.bold}>Level 2</Text>
        <Text style={styles.text}>97 min collected </Text>
        <Text style={styles.text}> (23 min. left to reach) </Text>
        <Text style={styles.text}> Place 1.033 in Munich Ranklist </Text>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('TBD')}>
          <Text>Redem your points here</Text>
        </TouchableOpacity>
        <Nav navigation={this.props.navigation} hideInfo={true}/>
      </View>
    );
  }
}

