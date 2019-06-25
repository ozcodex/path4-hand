import React,{ Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {border, styles} from '../styles'

export default class Line extends Component {

static navigationOptions = { header: null } 

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  
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
        <TouchableOpacity style={styles.button} onPress={() => navigate('Delay',{line:this.state.text})}>
          <Text>Go On!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

