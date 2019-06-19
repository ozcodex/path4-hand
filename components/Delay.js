import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const border = 50;

export default class Delay extends Component {

static navigationOptions = { header: null } 

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Which line/bus are you using?</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type in here"
          onChangeText={(text) => this.setState({text})}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigate('Delay')}>
          <Text>Go On!</Text>
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
