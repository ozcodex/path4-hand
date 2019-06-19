import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';

const border = 50;

export default class Score extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
  }

  render() {
    const navigate = this.props.navigation.navigate;
    var delay = this.props.navigation.getParam('delay', 0)
    return (
      <View style={styles.container}>
        <Image
          style={styles.image} 
          width={Dimensions.get('window').width - border * 4}
          source={require('../assets/dragon.png')}
        />
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

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: border,
  },
  text: {
    //flex: 1,
    fontSize: 20,
    textAlign: 'center',
  },
  central:{
    //flex: 2
  },
  image: {
    
  },
  button:{
    //flex:1,
    backgroundColor: '#81FFC9',
  },
  bold: {
    //flex: 2,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});
