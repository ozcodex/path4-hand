import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const border = 50;

export default class Line extends Component {

static navigationOptions = { header: null } 

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Text style={styles.bold}>Let's get started:</Text>
        <View style={styles.central}>
          <Text>We are sure that you are angry because of facing a delay with public transportation.</Text>
          <Text>Path4 is helping you leave out the stress and find out who is travelling with you while collecting delay minutes.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Line')}>
          <Text>Start to grow your MVG-dragon!</Text>
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
