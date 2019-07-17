import React,{ Component } from 'react';
import { Image, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {border, styles} from '../styles'
import image1 from '../assets/egg1.png'
import image2 from '../assets/egg2.png'
import image3 from '../assets/egg3.png'

export default class Home extends Component {

  static navigationOptions = { header: null }

  state = {
    currentIndex: 0,
  };

  render() {
    const navigate = this.props.navigation.navigate;
    const color = this.props.navigation.getParam('color','red')  //second param is the default option
    const { width } = Dimensions.get('window');
    if(color == 'yellow'){
      image = image1
    }else if(color == 'blue'){
      image = image2
    }else{
      image = image3
    }
    return (
        <View style={styles.container}> 
          <Text style={styles.title}>You can hatch an egg by submitting your first delay!</Text>
          <Image style={{width: width, height: width}}source={image}></Image>
          <TouchableOpacity style ={styles.button} onPress={() => navigate('ReportStation')}>
            <Text style={styles.buttonText}>Submit Delay!</Text>
          </TouchableOpacity> 
        </View>
    );
  }
}

