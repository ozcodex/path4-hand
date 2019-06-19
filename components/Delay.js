import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Image from 'react-native-scalable-image';
import CircleSlider from './CircleSlider';
import Nav from './Nav';

const border = 50;

export default class Delay extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
  }

  changeValue(x){
    return Math.ceil(x*60/360)
  }

  render() {
    const navigate = this.props.navigation.navigate;
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
        <TouchableOpacity style={styles.button} onPress={() => navigate('Score', {delay: this.refs.delayedMinutes.state.angle})}>
          <Text>Feed your MVG dragon!</Text>
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
