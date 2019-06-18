import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Image from 'react-native-scalable-image';

const border = 50;

export default class Welcome extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image} 
          width={Dimensions.get('window').width - border * 2}
          source={require('../assets/banner.png')}
        />
        <Text style={styles.text}>Turn public transportation delays into experiences</Text>
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
  image: {
    
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
});
