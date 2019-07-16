import React,{ Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Picker } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';
import {border, styles} from '../styles'
import { YellowBox } from 'react-native';
import MapView from 'react-native-maps';
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;

export default class Map extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    this.state = {
      no: false,
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    //Ignoring it is not the best approach, but if you're using Firebase Realtime Database.
    //They are looking into solving this issue with their library
    // https://github.com/firebase/firebase-js-sdk/issues/97
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <MapView style={{flex: 1}} />
        <Text style={styles.text}>The Spanish Inquisition, because nobody expects the spanish inquisition</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{navigate('Home')}}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

