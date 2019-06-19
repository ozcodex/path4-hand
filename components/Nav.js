import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Image from 'react-native-scalable-image';

const border = 50;

export default class Nav extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Main')}>
          <Image
            style={styles.image}
            height={80}
            source={require('../assets/home.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Info')}>
          <Image
            style={styles.image}
            height={80}
            source={require('../assets/mini-dragon.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:0,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 20,
    width: Dimensions.get('window').width - border * 2,
  },
  button:{
    //flex:1,
  },
});
