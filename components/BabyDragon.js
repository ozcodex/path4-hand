import React,{ Component } from 'react';
import { Image, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {border, styles} from '../styles'
import image from '../assets/baby.png'

export default class BabyDragon extends Component {

  static navigationOptions = { header: null }

  state = {
    currentIndex: 0,
  };

  render() {
    const navigate = this.props.navigation.navigate;
    const { width } = Dimensions.get('window');
    return (
        <View style={styles.container}> 
          <Text style={styles.title}>Great! Your baby dragon is born!</Text>
          <Image style={{width: width, height: width}} source={image}></Image>
          <TouchableOpacity style ={styles.button} onPress={() => navigate('Feedback')}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity> 
        </View>
    );
  }
}

