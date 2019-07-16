import React,{ Component } from 'react';
import { Image, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {border, styles} from '../styles'
import image from '../assets/placeholder.jpg'

export default class Feedback extends Component {

  static navigationOptions = { header: null }

  state = {
    currentIndex: 0,
  };

  render() {
    const navigate = this.props.navigation.navigate;
    const { width } = Dimensions.get('window');
    return (
        <View style={styles.container}> 
          <Text style={styles.title}>What happens with your Report?</Text>
          <Image style={{width: width, height: width}} source={image}></Image>
          <Text style={styles.boldBig}>Thank you</Text>
          <Text style={styles.textBig}>Your report has been submitted succesfully.</Text>
          <Text style={styles.textBig}>We will forward your delay reports to  MVG and keep you  updated !</Text>
          <TouchableOpacity style ={styles.button} onPress={() => navigate('ChooseName')}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

