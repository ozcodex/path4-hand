import React,{ Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Picker } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';
import {border, styles} from '../styles'
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;

export default class ReportLine extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    const navigation = this.props.navigation;
    //get the name of the station
    const station = navigation.getParam('station')
    if (!station) {
      //if there are no station redirect back
      navigation.navigate('ReportStation')
    }else{
      db.collection('stations').where('name', '==', station).get().then(
        snapshot => {
          var lines = snapshot.docs[0]
          console.log(lines)
        }
      );
    }
    this.state = { 
      line: 's1',
      lines: ['a','b']
    };
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Which line are you using?</Text>
        <View style={{borderColor: 'gray', borderWidth: 1}}>
          <Picker
            selectedValue={this.state.line}
            style={styles.picker}
            mode='dropdown'
            onValueChange={(itemValue, itemIndex) =>
              this.setState({line: itemValue})
            }>
            {this.state.lines.map((item) => (
              <Picker.Item label={item.toUpperCase()} key={item} value={item} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{navigate('ReportDirection',{line: this.state.text})}}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

