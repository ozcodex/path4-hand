import React,{ Component } from 'react';
import { Image, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {border, styles} from '../styles'
import image from '../assets/egg.png'

export default class Thanks extends Component {

  static navigationOptions = { header: null }

  state = {
    currentIndex: 0,
  };

  render() {
    const navigate = this.props.navigation.navigate;
    const { width } = Dimensions.get('window');
    return (
        <View style={styles.container}> 
          <Text style={styles.title}>Thanks for your report. Click your egg to hatch it!</Text>
          <Image style={{width: width, height: width}} source={image}></Image>
          <TouchableOpacity style ={styles.button} onPress={() => navigate('BabyDragon')}>
            <Text style={styles.buttonText}>Hatch your Egg</Text>
          </TouchableOpacity> 
        </View>
    );
  }
}

