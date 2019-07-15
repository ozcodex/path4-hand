import React,{ Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Picker, Alert } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';
import {border, styles} from '../styles'
import { YellowBox } from 'react-native';
import Constants from 'expo-constants';
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;

export default class ReportDelay extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    const navigation = this.props.navigation;
    //get the name of the line
    const line = navigation.getParam('line')
    const station = navigation.getParam('station')
    const direction = navigation.getParam('direction')
    if (!line || !station || !direction) {
      //if there are no line redirect to the begining
      navigation.navigate('ReportStation')
    }
    let ranges= [
      'No delay',          //0
      '1 - 5 minutes',     //1
      '6 - 10 minutes',    //2
      '11 - 15 minutes',   //3
      '16 or more minutes' //4
    ]
    this.state = {
      line: line,
      station: station,
      direction: direction,
      delay: '0',
      ranges: ranges
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    //Ignoring it is not the best approach, but if you're using Firebase Realtime Database.
    //They are looking into solving this issue with their library
    // https://github.com/firebase/firebase-js-sdk/issues/97
  }

  render() {
    const navigate = this.props.navigation.navigate;
    const saveAndContinue = () => {
      let uuid = Constants.deviceId;
      let data = {
        user: uuid,
        tiemstamp: Date.now(),
        line: this.state.line,
        direction: this.state.direction,
        station: this.state.station,
        delay: this.state.delay
        }
      console.log('data2save: ',data)
      let ref = db.collection('delays').doc();
      ref.set(data).then(()=> {
        Alert.alert('Information stored successfully')
        navigate('Home')
      }).catch(error => Alert.alert('error saving the info :('))
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>How much delay did you had?</Text>
        <View style={{borderColor: 'gray', borderWidth: 1}}>
          <Picker
            selectedValue={this.state.delay}
            style={styles.picker}
            mode='dropdown'
            onValueChange={(itemValue) =>
              this.setState({delay: itemValue})
            }>
            {this.state.ranges.map((item,key) => (
              <Picker.Item label={item} key={key} value={key} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={saveAndContinue}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

