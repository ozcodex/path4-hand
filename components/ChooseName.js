import React,{ Component } from 'react';
import { Alert, TextInput, Image, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {border, styles} from '../styles'
import image from '../assets/dragon.png'

export default class ChooseName extends Component {

  static navigationOptions = { header: null }

  state = {
    text: 'Glaurung',
  };

  render() {
    const navigate = this.props.navigation.navigate;
    const { width } = Dimensions.get('window');
    return (
        <View style={styles.container}> 
          <Text style={styles.title}>Great! Your baby dragon is born! Name it!</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Image style={{width: width, height: width}} source={image}></Image>
          <TouchableOpacity style ={styles.button} onPress={() => {
            Alert.alert('Continue feeding him each time you are facing a delay!');
            navigate('Home')}
          }>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity> 
        </View>
    );
  }
}

