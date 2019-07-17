import React,{ Component } from 'react';
import { KeyboardAvoidingView, TextInput, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {border, styles} from '../styles'
import { YellowBox } from 'react-native';
import Constants from 'expo-constants';
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;

export default class BroadChat extends Component {

  static navigationOptions = { header: null }
  
  constructor(props){
    super(props)
    this.msg_limit = 15
    this.state = {
      text: 'Hello World',
      user: 'Somebody',
      messages: [{from:'System',msg:'Loading...'}]
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    //Ignoring it is not the best approach, but if you're using Firebase Realtime Database.
    //They are looking into solving this issue with their library
    // https://github.com/firebase/firebase-js-sdk/issues/97
    this.connect = this.connect.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
  }
  
  componentDidMount(){
    this.connect();
  }
  
  connect(){
    //identify user
    db.collection('users').doc(Constants.deviceId).get().then(snap => {
      let name = snap.get('name')
      if(name && name.length > 0) this.setState({ user : name })
    })
    //watch the events on the db
    db.collection('chats').orderBy('timestamp','desc').limit(this.msg_limit).onSnapshot((snap) => {
      //New message detected, (also called on first execution)
      //update messages
      let messages = []
      let i = snap.size
      for (;i>0;){
        messages.push(snap.docs[--i].data());
      }
      //console.log(messages)
      this.setState({messages}) 
    });   
  }
  
  disconnect(){
    db.collection('chats').orderBy('timestamp','desc').limit(this.msg_limit).onSnapshot(() => {});
  }

  componentWillUnmount(){
    this.disconnect();
  }

  sendMsg(){
    db.collection('chats').doc().set({
      from: this.state.user,
      msg: this.state.text,
      timestamp: Date.now()
    });
    this.setState({text:''})
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View>
            {this.state.messages.map( (item,key) => (
              <Text key={key}>{item.from}: {item.msg} </Text>
            ))}
          </View>
          <View style={styles.bar}> 
            <TextInput
              style={styles.chatInput}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <TouchableOpacity style ={styles.sendButton} onPress={() => this.sendMsg()}>
              <Text style={styles.buttonText}>Send!</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    );
  }
}

