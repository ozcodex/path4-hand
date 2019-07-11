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
      gamecode: "",
      enemymove: 0,
      role: ''
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
    //Ignoring it is not the best approach, but if you're using Firebase Realtime Database.
    //They are looking into solving this issue with their library
    // https://github.com/firebase/firebase-js-sdk/issues/97
    this.connect = this.connect.bind(this);
    this.move = this.move.bind(this);
    this.watchGame = this.watchGame.bind(this);
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
          state: 'finished'
        },{merge:true})
    })
    console.log('im closing the game:', this.state.gamecode) 
  }
  
  move(value){
    this.setState({
        move:value,
        status : 3,
      })
    var colectionRef = db.collection('games');
    //search for the game
    var queryRef = colectionRef.where('gamecode', '==', this.state.gamecode);
    queryRef.get().then(snap => {
      let gameRef = snap.docs[0].ref
      let gameUpdate = {}
      gameUpdate[this.state.role+'_move']= value
      gameRef.set(gameUpdate,{merge:true})
    })
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
      let role = ''
      let next_status = 1;
      if (snapshot.empty){
        //create new game
        gameRef = colectionRef.doc()
        gameRef.set({
          state: 'open',
          gamecode : codeGen()
        })
        role = 'host'
      }else{
        //join a random game
        //generate a random index
        i = Math.floor((Math.random() * snapshot.size) + 0);
        //join the game
        gameRef = snapshot.docs[i].ref
         gameRef.set({
          state: 'closed'
        },{merge:true})
        next_status++;
        role = 'guest'
      }
      gameRef.get().then(game_snap => {
        let game = game_snap.data()
        console.log('game:',game)
        this.setState({
                  gamecode : game.gamecode,
                  status: next_status,
                  role: role
                });
        this.watchGame(game.gamecode);
      })
    });
  }

  watchGame(gamecode){
    //var me = this;
    var colectionRef = db.collection('games');
    //search for the game
    var queryRef = colectionRef.where('gamecode', '==', gamecode);
    var observer = queryRef.onSnapshot(snap => {
      let data = snap.docs[0].data();
      let gameRef = snap.docs[0].ref
      console.log(data)
      if(this.state.role == 'host'){
        //im host
        this.setState({
            enemymove: data.guest_move
          })
      }else{
        //im guest
        this.setState({
            enemymove: data.host_move
          })
      }
      //check if the game is completed
      if(data.host_move && data.guest_move){
        //tie - reset game
        if(data.host_move == data.guest_move){
          this.setState({
            move: 0,
            state: 2,
            enemymove:0,
            result:3
          })
          let gameUpdate = {
            state : 'closed',
            gamecode : this.state.gamecode 
          }
          gameRef.set(gameUpdate)
        }else{
          //define the winner
          let h = data.host_move 
          let g = data.guest_move
          let host_loses = ( (h == 3 && g == 1 ) || ( h < 3 && g == h + 1)) 
          let result = 0;
          if(this.state.role == 'host'){
            //im host
            result = host_loses?1:2;
            gameRef.set({
              state: 'finished'
            },{merge:true}) 
          }else{
            //im guest
            result = host_loses?2:1;
          }
          this.setState({
            status : 4,
            result : result
          });
        }  
      }
      
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  };

  render() {
    const statuses = ['Conecting...','Looking 4 other player','Playing','Waiting','Game End']
    const moves = ['Undefined','Rock','Paper','Scissors']
    const results = ['Undefined','You Lose','You Win','Tie']
    const navigate = this.props.navigation.navigate;
    let butsty = this.state.move == 0 ? styles.button:styles.buttoff
    let sty1 = this.state.move == 1 ? styles.buttoffText:styles.buttonText
    let sty2 = this.state.move == 2 ? styles.buttoffText:styles.buttonText
    let sty3 = this.state.move == 3 ? styles.buttoffText:styles.buttonText
    let press = (m) => {
      if(this.state.move == 0){
        this.move(m)
      }
    }
    let p = this.state.enemymove != 0 //enemy moved?
    let q = this.state.move != 0  //i moved?
    var opmove = !p || q ? moves[this.state.enemymove] : '???'
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          North Game
        </Text>
        <Text style={styles.text}>Status: {statuses[this.state.status]}</Text>
        <Text style={styles.text}>Game code: {this.state.gamecode}</Text>
        <View>
          <TouchableOpacity style = {butsty} onPress={() => press(1)}>
            <Text style={sty1}>Rock</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={butsty} onPress={() => press(2)}>
            <Text style={sty2}>Paper</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={butsty} onPress={() => press(3)}>
            <Text style={sty3}>Scissors</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Opponent Move: {opmove}</Text>
        <Text style={styles.text}>Result: {results[this.state.result]}</Text>
      </View>
    );
  }
    
}

