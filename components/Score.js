import React,{ Component } from 'react';
import {Animated, View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
//import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';
import {border, styles} from '../styles'

export default class Score extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    let dim = Dimensions.get('window').width
    let percent = 0.4
    let finalsizeY = Math.floor(dim - border * 3)
    let initialsizeY = Math.floor(finalsizeY * percent)
    this.finalsizeY = finalsizeY
    this.finalsizeX = Math.floor(finalsizeY * 0.86)
    let initialsizeX = Math.floor(initialsizeY * 0.86)
    this.state = {
      fadeAnim: new Animated.ValueXY({x:initialsizeX,y:initialsizeY})  // Initial value for size
    }
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: {x:this.finalsizeX,y:this.finalsizeY},      // Animate to final size
        duration: 5000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let fadeAnim = this.state.fadeAnim
    const navigate = this.props.navigation.navigate;
    var delay = this.props.navigation.getParam('delay', 0)
    return (
      <View style={styles.container}>
        <View style={{
          width: this.finalsizeX,
          height: this.finalsizeY,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Animated.Image
            style={{
              width: fadeAnim.x,
              height: fadeAnim.y
            }} 
            source={require('../assets/dragon.png')}
          />
        </View>
        <Text style={styles.text}>you collected {delay} min to feed your dragon!</Text>
        <Text style={styles.text}>Your total dragon score: </Text>
        <Text style={styles.bold}> { 78 + delay} min </Text>
        <Text style={styles.text}> ({42 - delay} min. left for level up your dragon) </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Board')}>
          <Text>See which dragons are waiting with you</Text>
        </TouchableOpacity>
        <Nav navigation={this.props.navigation} />
      </View>
    );
  }
}

