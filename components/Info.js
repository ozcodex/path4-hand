import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Image from 'react-native-scalable-image';

const border = 50;

export default class Info extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
  }

  render() {
    const navigate = this.props.navigation.navigate;
    var delay = this.props.navigation.getParam('delay', 0)
    delay = Math.ceil(delay*60/360)
    return (
      <View style={styles.container}>
        <Image
          style={styles.image} 
          width={Dimensions.get('window').width - border * 4}
          source={require('../assets/dragon.png')}
        />
        <Text style={styles.bold}>Level 2</Text>
        <Text style={styles.text}>97 min collected </Text>
        <Text style={styles.text}> (23 min. left to reach) </Text>
        <Text style={styles.text}> Place 1.033 in Munich Ranklist </Text>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('TBD')}>
          <Text>Redem your points here</Text>
        </TouchableOpacity>
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
