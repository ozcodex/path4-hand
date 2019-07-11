import React,{ Component } from 'react';
import { Alert,View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import {border, styles} from '../styles'
import { YellowBox } from 'react-native';
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;

export default class Welcome extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      move: 0,
      status: 0,
      result: 0,
      gamecode: "000",
      enemymove: 0
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    //Ignoring it is not the best approach, but if you're using Firebase Realtime Database.
    //They are looking into solving this issue with their library
    // https://github.com/firebase/firebase-js-sdk/issues/97
    this.connect = this.connect.bind(this);
  }  
  static navigationOptions = { header: null } 
  
  componentDidMount(){
    this.connect()
  }

  componentWillUnmount() {
   var colectionRef = db.collection('games');
    //search for the game
    var queryRef = colectionRef.where('gamecode', '==', this.state.gamecode);
    queryRef.get().then(snap => {
      let gameRef = snap.docs[0].ref
      gameRef.set({
          state: 'close'
        },{merge:true})
    })
    console.log('im closing the game:', this.state.gamecode) 
  }

  connect = () => {
    var codeGen = () => {
      let coder = i => (i).toString(36);
      let ran = (min,max) => Math.floor((Math.random() * max) + min);
      return coder(ran(0,131072))
    }   
    var colectionRef = db.collection('games');  
    //check for open games
    var queryRef = colectionRef.where('state', '==', 'open');
    queryRef.get().then(
    snapshot => {
      let gameRef;
      let next_status = 1;
      if (snapshot.empty){
        //create new game
        gameRef = colectionRef.doc()
        gameRef.set({
          state: 'open',
          gamecode : codeGen()
        })
      }else{
        //join a random game
        //generate a random index
        i = Math.floor((Math.random() * snapshot.size) + 0);
        //join the game
        gameRef = snapshot.docs[i].ref
         gameRef.set({
          state: 'close'
        },{merge:true})
        next_status++;
      }
      gameRef.get().then(game_snap => {
        let game = game_snap.data()
        console.log('game:',game)
        this.setState({
                  gamecode : game.gamecode,
                  status: next_status
                });
      })
    });
  }

  render() {
    const statuses = ['Conecting...','Looking 4 other player','Playing','Waiting','Game End']
    const moves = ['Undefined','Rock','Paper','Scissors']
    const results = ['Undefined','You Lose','You Win','Tie']
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          North Game
        </Text>
        <Text style={styles.text}>Status: {statuses[this.state.status]}</Text>
        <Text style={styles.text}>Game code: {this.state.gamecode}</Text>
        <View>
          <TouchableOpacity style ={styles.button} >
            <Text style={styles.buttonText}>Rock</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.button} >
            <Text style={styles.buttonText}>Paper</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.button} >
            <Text style={styles.buttonText}>Scissors</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Opponent Move: {moves[this.state.enemymove]}</Text>
        <Text style={styles.text}>Result: {results[this.state.result]}</Text>
      </View>
    );
  }
    
}

