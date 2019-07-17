import React,{ Component } from 'react';
import { Alert, TextInput, Image, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {border, styles} from '../styles'
import Constants from 'expo-constants';
import image from '../assets/dragon.png'
import { YellowBox } from 'react-native';
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;


export default class ChooseName extends Component {

  static navigationOptions = { header: null }

  constructor(props){
    super(props)
    this.state = {
      text: 'Glaurung',
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    //Ignoring it is not the best approach, but if you're using Firebase Realtime Database.
    //They are looking into solving this issue with their library
    // https://github.com/firebase/firebase-js-sdk/issues/97
  }

  saveName(){
    if(this.state.text.length > 0){
      db.collection('users').doc(Constants.deviceId).set({
        name: this.state.text,
      },{merge:true});
    }
  }

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
            this.saveName()
            Alert.alert('Continue feeding him each time you are facing a delay!');
            navigate('Home')}
          }>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity> 
        </View>
    );
  }
}

