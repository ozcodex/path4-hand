import React,{ Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Picker } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';
import {border, styles} from '../styles'
import { YellowBox } from 'react-native';
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;

export default class ReportDirection extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    const navigation = this.props.navigation;
    //get the name of the line
    const line = navigation.getParam('line')
    const station = navigation.getParam('station')
    if (!line || !station) {
      //if there are no line redirect to the begining
      navigation.navigate('ReportStation')
    }else{
      db.collection('lines').doc(line).get().then(
        snapshot => {
          var directions = Object.keys(snapshot.data().direction)
          this.setState({
            directions: directions,
            direction: directions[0]
          })
        }
      );
    }
    this.state = {
      line: line,
      station: station,
      direction: 'false',
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
        <Text style={styles.text}>In which diretion are you driving?</Text>
        <View style={{borderColor: 'gray', borderWidth: 1}}>
          <Picker
            selectedValue={this.state.direction}
            style={styles.picker}
            mode='dropdown'
            onValueChange={(itemValue) =>
              this.setState({direction: itemValue})
            }>
            {this.state.directions? this.state.directions.map((item) => (
              <Picker.Item label={item} key={item} value={item} />
            )) : <Picker.Item label='Loading...' key='undef' value='false' />}
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{navigate('ReportDelay',{line: this.state.line,direction: this.state.direction,station: this.state.station})}}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

