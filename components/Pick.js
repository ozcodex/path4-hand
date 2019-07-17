import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {border, styles} from '../styles'
import image1 from '../assets/egg1.png'
import image2 from '../assets/egg2.png'
import image3 from '../assets/egg3.png'

export default class Pick extends Component {

  static navigationOptions = { header: null }

  state = {
    currentIndex: 0,
  };

  render() {
    const navigate = this.props.navigation.navigate;
    const egg_size = 30;
    return (
        <View style={styles.container}> 
          <Text style={styles.title}>Pick an Egg:</Text>
          <TouchableOpacity style ={styles.eggButton} onPress={() => navigate('Egg',{color:'yellow'})}>
            <Image style={{width: egg_size, height: egg_size}}source={image1}></Image>
            <Text style={styles.buttonText}>   Yellow Egg</Text>
          </TouchableOpacity> 
          <TouchableOpacity style ={styles.eggButton} onPress={() => navigate('Egg',{color:'blue'})}>
            <Image style={{width: egg_size, height: egg_size}}source={image2}></Image>
            <Text style={styles.buttonText}>   Blue Egg</Text>
          </TouchableOpacity> 
          <TouchableOpacity style ={styles.eggButton} onPress={() => navigate('Egg',{color:'red'})}>
            <Image style={{width: egg_size, height: egg_size}}source={image3}></Image>
            <Text style={styles.buttonText}>   Red Egg</Text>
          </TouchableOpacity> 
        </View>
    );
  }
}

