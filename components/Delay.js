import React,{ Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';
import {border, styles} from '../styles'

export default class Delay extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  changeValue(x){
    return Math.ceil(x*60/360)
  }

  saveAndContinue(){
    const navigate = this.props.navigation.navigate;
    let angle = this.refs.delayedMinutes.state.angle
    let line = this.props.navigation.getParam('line', undefined)
    let delay = Math.ceil(angle*60/360)
    var data = {
      "delayTime": delay,
      "stationName": line,
      "direction": "North!"
    }
    fetch('https://mvp-brain-dot-project-path4.appspot.com/api/reportdelay',{
      method: 'POST',
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      navigate('Score',{delay:delay})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image} 
          width={Dimensions.get('window').width - border * 4}
          source={require('../assets/dragon.png')}
        />
        <Text style={styles.text}>How long is your Delay?</Text>
          <CircleSlider
            ref="delayedMinutes"
            value={90}
            onValueChange={ this.changeValue }
          /> 
        <TouchableOpacity style={styles.button} onPress={this.saveAndContinue}>
          <Text>Feed your MVG dragon!</Text>
        </TouchableOpacity>
        <Nav navigation={this.props.navigation} />
      </View>
    );
  }
}

