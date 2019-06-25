import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Image from 'react-native-scalable-image';
import {border, styles} from '../styles'

export default class Home extends Component {

static navigationOptions = { header: null } 

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => navigate('Welcome')}
        >
        <View style={styles.container}>
        <Image
          style={styles.image} 
          width={Dimensions.get('window').width - border * 2}
          source={require('../assets/banner.png')}
        />
        <Text style={styles.text}>Turn public transportation delays into experiences</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

