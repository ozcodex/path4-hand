import React,{ Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';
import {border, styles} from '../styles'


class Utext extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  
  render(){
    console.log('render')
    return(
      <Text>
        {this.state.text}
      </Text>
    );
  }
}


export default class Delay extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.delayedMinutes = React.createRef();
    this.text = React.createRef();
    this.updateText = this.updateText.bind(this);
  }

  updateText(){
    if(this.text.current && this.delayedMinutes.current){
      let angle = this.delayedMinutes.current.state.angle
      angle = this.changeValue(angle)
      this.text.current.setState({text: angle})
    }
  }

  changeValue(x){
    return Math.ceil(x*60/360)
  }

  saveAndContinue(){
    const navigate = this.props.navigation.navigate;
    let angle = this.delayedMinutes.current.state.angle
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
    console.log('rendering')
    return (
      <View style={styles.container}>
      <View style={{
        width: Dimensions.get('window').width - border * 4,
        heigth: Math.ceil((Dimensions.get('window').width - border * 4) * 1.1628)
        }}>
        <Image
          style={styles.image} 
          width={Dimensions.get('window').width - border * 4}
          source={require('../assets/dragon.png')}
        />
      </View>
        <Text style={styles.text}>How long is your Delay?</Text>
          <CircleSlider
            ref={this.delayedMinutes}
            value={90}
            onChange={this.updateText}
            onValueChange={ this.changeValue }
          /> 
        <Utext ref={this.text}/>
        <TouchableOpacity style={styles.button} onPress={this.saveAndContinue}>
          <Text>Feed your MVG dragon!</Text>
        </TouchableOpacity>
        <Nav navigation={this.props.navigation} />
      </View>
    );
  }
}

